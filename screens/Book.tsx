import { View, Image } from "react-native";
import React, { FC, useEffect, useState } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Button,
} from "native-base";

interface AllBooksProps {
  navigation?: any;
  route?: any;
}

export interface BookProps {
  title: string;
  author: string;
  imgUrl?: string;
}

const Book: FC<AllBooksProps> = ({ navigation, route }) => {
  const bookId = route.params;

  const [book, setBook] = useState<BookProps>();

  useEffect(() => {
    if (!bookId) navigation.navigate("All Recipes");
    const fetchBook = async () => {
      const res = await fetch(`http://192.168.86.247:3001/book/${bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const resData = await res.json();
        setBook(resData);
      }
    };
    fetchBook();
  }, [route.params]);

  // ! TODO - Add recipeCard component
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <Text fontSize="3xl">{book?.title}</Text>
        <Text>{book?.author}</Text>
        <Image
          source={{ uri: book?.imgUrl }}
          style={{ width: 250, height: 400, resizeMode: "contain" }}
        />
      </Center>
    </NativeBaseProvider>
  );
};

export default Book;
