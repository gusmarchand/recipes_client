import { Image, StyleSheet, Pressable } from "react-native";
import React, { FC, useEffect, useState } from "react";

import { FormControl, Input, Stack, Button, HStack, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createBook } from "../../mw/books";
import { getBookCoverUrl } from "../../utils/url";
import { getBookInfo, uploadImgToCloudinary } from "../../mw/externals";

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

  const [errorsMsg, setErrorsMsg] = useState<any>({});

  const validate = () => {
    if (title === undefined || title === "") {
      setErrorsMsg({ ...errorsMsg, title: "Il faut un titre" });

      return false;
    }
    if (author === undefined || author === "") {
      setErrorsMsg({ ...errorsMsg, author: "Il faut un auteur" });
      return false;
    }
    return true;
  };

  const pickImage = async () => {
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
    if (!validate()) return;

    const imageToFetch = {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    };

    let imgFromCloudinary = "";

    if (image) {
      try {
        const img = await uploadImgToCloudinary(imageToFetch);
        if (img) {
          imgFromCloudinary = img.secure_url;
        }
      } catch (error) {
        console.log("error fetch couldinary");
        console.log(error);
      }
    }

    const data = {
      title,
      author,
      imgUrl: imgFromCloudinary || imgUrl,
    };

    try {
      const resData = await createBook(data);
      if (resData._id) {
        setAuthor("");
        setTitle("");
        setImage("");
        !isFromRecipeForm && navigation.navigate("Home");
        setModalOpen && setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitIsbn = async () => {
    try {
      const bookInfos = await getBookInfo(isbn);
      console.log(bookInfos);
      const _isbn =
        isbn || bookInfos.items[0].volumeInfo.industryIdentifiers[1].identifier;
      const bookImgUrl = getBookCoverUrl(_isbn, "M");

      if (bookInfos.items[0].volumeInfo.title) {
        setTitle(bookInfos.items[0].volumeInfo.title);
      }
      if (bookInfos.items[0].volumeInfo.authors) {
        setAuthor(bookInfos.items[0].volumeInfo.authors[0]);
      }
      if (bookImgUrl) {
        setImage(bookImgUrl);
        setImgUrl(bookImgUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (title !== undefined || title !== "") {
      setErrorsMsg({ ...errorsMsg, title: null });
    }
  }, [title]);

  useEffect(() => {
    if (author !== undefined || author !== "") {
      setErrorsMsg({ ...errorsMsg, author: null });
    }
  }, [author]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FormControl style={styles.content}>
        <Stack space={5}>
          <Stack>
            <FormControl isRequired isInvalid={errorsMsg?.title}>
              <FormControl.Label>Titre du livre </FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="titre"
                value={title}
                onChange={(e) => setTitle(e.nativeEvent.text)}
              />
              {errorsMsg?.title && (
                <FormControl.ErrorMessage>
                  {errorsMsg.title}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          </Stack>

          <Stack>
            <FormControl isRequired isInvalid={errorsMsg?.author}>
              <FormControl.Label>Auteur </FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="auteur"
                value={author}
                onChange={(e) => setAuthor(e.nativeEvent.text)}
              />
              {errorsMsg?.author && (
                <FormControl.ErrorMessage>
                  {errorsMsg.author}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
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
  error: {
    color: "red",
    fontSize: 10,
  },
  inputError: {
    borderColor: "red",
  },
});

export default BookForm;
