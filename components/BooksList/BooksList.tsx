import { View, Text } from "react-native";
import React, { FC, useEffect, useState } from "react";

import { FormControl, Stack, Center } from "native-base";
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
    <Center>
      <FormControl>
        <Stack space={5}>
          {books.map((book: { _id: number; title: string; author: string }) => {
            return (
              <View key={book._id}>
                <Text
                  onPress={() => {
                    navigation.navigate("Book", book._id);
                  }}
                >
                  {book.title}
                </Text>
              </View>
            );
          })}
        </Stack>
      </FormControl>
    </Center>
  );
};

export default BooksList;
