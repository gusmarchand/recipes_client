import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { FC, useEffect, useState } from "react";

import {
  FormControl,
  Input,
  Stack,
  Button,
  HStack,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Heading,
  Center,
  Select,
  ScrollView,
  Icon,
} from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

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

  const [image, setImage] = useState<any>("");

  const [isbn, setIsbn] = useState<string>("");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmitForm = async () => {
    const imageToFetch = {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    };

    const dataToCloudinary = new FormData();
    dataToCloudinary.append("file", imageToFetch as any);
    dataToCloudinary.append("upload_preset", "qnktrbpo");

    const postImgToCloudinary = await fetch(
      "https://api.cloudinary.com/v1_1/gusappprecipes/image/upload",
      {
        method: "POST",
        body: dataToCloudinary,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    setImgUrl(postImgToCloudinary.secure_url);

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
      setImage("");
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
      setImage(bookImgUrl);
      setImgUrl(bookImgUrl);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FormControl style={styles.content}>
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
          <HStack pt="4" justifyContent="space-between" alignItems="center">
            <FormControl.Label>Image</FormControl.Label>
            <Pressable onPress={pickImage}>
              <Icon
                as={Ionicons}
                name="image-outline"
                size="xl"
                color="blue.300"
              />
            </Pressable>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 250, height: 400, resizeMode: "contain" }}
              />
            )}
          </HStack>
          <Button onPress={handleSubmitForm}>Soumettre</Button>
        </Stack>
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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    width: "100%",
    flex: 1,
  },
  content: {
    width: "100%",
    flex: 1,

    padding: 20,
  },
});

export default BookForm;
