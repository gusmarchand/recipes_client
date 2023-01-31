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

interface BookFormProps {
  setModalOpen?: any;
  isFromRecipeForm?: boolean;
  navigation?: any;
}

const BookForm: FC<BookFormProps> = ({
  navigation,
  setModalOpen,
  isFromRecipeForm = false,
}) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");

  const [isbn, setIsbn] = useState<string>("");

  const handleSubmitForm = async () => {
    const data = {
      title,
      author,
      imgUrl,
    };
    const res = await fetch("http://192.168.86.247:3001/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (resData._id) {
      setAuthor("");
      setTitle("");
      setImgUrl("");
      !isFromRecipeForm && navigation.navigate("AllBooks");
      setModalOpen && setModalOpen(false);
    }
  };

  const handleSubmitIsbn = async () => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();

    // const bookInfo = await fetch(
    //   `https://www.googleapis.com/books/v1/volumes/${resData.items[0].id}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const _isbn =
      isbn || resData.items[0].volumeInfo.industryIdentifiers[1].identifier;
    const bookImgUrl = `https://covers.openlibrary.org/b/isbn/${_isbn}-M.jpg`;

    if (resData.items[0].volumeInfo.title) {
      setTitle(resData.items[0].volumeInfo.title);
    }
    if (resData.items[0].volumeInfo.authors) {
      setAuthor(resData.items[0].volumeInfo.authors[0]);
    }
    if (bookImgUrl) {
      setImgUrl(`https://covers.openlibrary.org/b/isbn/${_isbn}-M.jpg`);
    }
  };

  return (
    <>
      <FormControl>
        <Stack space={5}>
          <Stack>
            <FormControl.Label>Titre du livre</FormControl.Label>
            <Input
              variant="underlined"
              p={2}
              placeholder="titre"
              value={title}
              onChange={(e) => setTitle(e.nativeEvent.text)}
            />
          </Stack>
          <Stack>
            <FormControl.Label>Auteur</FormControl.Label>
            <Input
              variant="underlined"
              p={2}
              placeholder="auteur"
              value={author}
              onChange={(e) => setAuthor(e.nativeEvent.text)}
            />
          </Stack>
          <Stack>
            <FormControl.Label>Image</FormControl.Label>
            <Input
              value={imgUrl}
              onChange={(e) => setImgUrl(e.nativeEvent.text)}
              variant="underlined"
              p={2}
              placeholder="Petite description"
            />
          </Stack>
          <Button onPress={handleSubmitForm}>Soumettre</Button>
        </Stack>
      </FormControl>
      <FormControl>
        <Stack space={5}>
          <Stack>
            <FormControl.Label>ISBN</FormControl.Label>
            <Input
              variant="underlined"
              p={2}
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.nativeEvent.text)}
            />
          </Stack>
          <Button onPress={handleSubmitIsbn}>whith ISBN</Button>
        </Stack>
      </FormControl>
    </>
  );
};

export default BookForm;
