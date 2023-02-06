import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import {
  Text,
  Center,
  NativeBaseProvider,
  HStack,
  VStack,
  Stack,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getBook } from "../mw/books";

interface AllBooksProps {
  navigation?: any;
  route?: any;
}

export interface BookProps {
  title: string;
  author: string;
  imgUrl?: string;
  description?: string;
  recipes?: any;
}

const Book: FC<AllBooksProps> = ({ navigation, route }) => {
  const [book, setBook] = useState<BookProps>();
  const [recipes, setRecipes] = useState<any>([]);

  const [seeMore, setSeeMore] = useState<boolean>(false);

  useEffect(() => {
    const bookId = route.params;
    (async () => {
      try {
        const _book = await getBook(bookId);
        if (_book?.book) {
          setBook(_book?.book);
        }
        if (_book?.recipes) {
          setRecipes(_book?.recipes);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [route.params]);

  // ! TODO - Add recipeCard component
  return (
    <NativeBaseProvider>
      {/* <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        // marginBottom={50}
        px={4}
        flex={1}
      > */}
      <VStack style={styles.container}>
        <Text style={styles.title} fontSize="3xl">
          {book?.title}
        </Text>
        <Text fontStyle="italic">{book?.author}</Text>
        {book?.imgUrl && book?.imgUrl?.length > 0 && (
          <Image
            source={{ uri: book?.imgUrl }}
            style={{ width: 150, height: 300, resizeMode: "contain" }}
          />
        )}
        {recipes?.length > 0 && (
          <VStack style={styles.recipes}>
            <Text style={styles.title} fontSize="xl">
              {recipes?.length > 1 ? "Recettes" : "Recette"}
            </Text>
            <View style={styles.block}>
              {recipes.map((recipe: any, index: number) => {
                return (
                  <Pressable
                    style={styles.recipe}
                    key={recipe._id}
                    onPress={() => {
                      navigation.navigate("Recipe", recipe._id);
                    }}
                  >
                    <HStack>
                      <Text color="blue.400">{recipe?.title}</Text>
                      {recipe?.isVeggie && (
                        <Icon
                          as={Ionicons}
                          ml="2"
                          name="leaf-outline"
                          size="sm"
                          color={"green.500"}
                        />
                      )}
                    </HStack>
                  </Pressable>
                );
              })}
            </View>
          </VStack>
        )}
      </VStack>
      {/* </Center> */}

      {/* <Text
        p={5}
        mb={30}
        style={styles.description}
        numberOfLines={seeMore ? 100 : 2}
        onPress={() => setSeeMore(!seeMore)}
      >
        {book?.description}
      </Text> */}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  description: {
    textAlign: "justify",
    zIndex: 20,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
  },
  block: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  recipes: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  recipe: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
});

export default Book;
