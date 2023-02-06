import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React, { FC, useEffect, useState } from "react";

import { Stack, Center, HStack, VStack } from "native-base";
import { getBooks } from "../../mw/books";

interface RecipesListProps {
  navigation?: any;
}

const BooksList: FC<RecipesListProps> = ({ navigation }) => {
  const [books, setBooks] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const _books = await getBooks();
        if (_books) {
          setBooks(_books);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // ! TODO - Add recipeCard component
  return (
    <Center width="100%">
      <Stack width="100%">
        {books.map(
          (
            book: {
              _id: number;
              title: string;
              author: string;
              imgUrl: string;
            },
            index: number
          ) => {
            return (
              <Pressable
                key={book._id}
                onPress={() => {
                  navigation.navigate("Book", book._id);
                }}
              >
                <HStack
                  style={styles.itemsContainer}
                  borderTopWidth={index === 0 ? 1 : 0}
                >
                  <HStack style={styles.item}>
                    <Text style={styles.title}>{book.title}</Text>
                    <Text style={styles.author}>{book.author}</Text>
                  </HStack>
                  <Image
                    source={{ uri: book?.imgUrl }}
                    style={{
                      width: 40,
                      height: 60,
                      resizeMode: "contain",
                      marginRight: 10,
                    }}
                  />
                </HStack>
              </Pressable>
            );
          }
        )}
      </Stack>
    </Center>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "black",
    paddingVertical: 20,
    borderBottomWidth: 1,
  },

  item: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    marginTop: 5,
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default BooksList;
