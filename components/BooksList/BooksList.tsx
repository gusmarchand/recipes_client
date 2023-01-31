import { View, Text, TextInput } from "react-native";
import React, { FC, useEffect, useState } from "react";

import {
  FormControl,
  Input,
  Stack,
  Button,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Heading,
  Center,
  Select,
} from "native-base";

interface RecipesListProps {
  navigation?: any;
}

const BooksList: FC<RecipesListProps> = ({ navigation }) => {
  const [books, setBooks] = useState<any>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("http://192.168.86.247:3001/book", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setBooks(resData);
    };
    fetchBooks();
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
