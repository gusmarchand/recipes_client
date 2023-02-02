import { Image } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Text, Center, NativeBaseProvider } from "native-base";
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
}

const Book: FC<AllBooksProps> = ({ navigation, route }) => {
  const [book, setBook] = useState<BookProps>();

  const [seeMore, setSeeMore] = useState<boolean>(false);

  useEffect(() => {
    const bookId = route.params;
    (async () => {
      try {
        const _book = await getBook(bookId);
        if (_book) {
          setBook(_book);
        }
      } catch (error) {
        console.log(error);
      }
    })();
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
      <Text
        p={5}
        mb={30}
        numberOfLines={seeMore ? 100 : 2}
        onPress={() => setSeeMore(!seeMore)}
      >
        {book?.description}
      </Text>
    </NativeBaseProvider>
  );
};

export default Book;
