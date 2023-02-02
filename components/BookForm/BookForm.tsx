import { Image, StyleSheet, Pressable, View } from "react-native";
import React, { FC, useEffect, useState } from "react";

import {
  FormControl,
  Input,
  Stack,
  Text,
  Button,
  HStack,
  Icon,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";

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
  // const [isbn, setIsbn] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [errorsMsg, setErrorsMsg] = useState<any>({});

  const [isScannerRequested, setIsScannerRequested] = useState<boolean>(false);

  const [hasPermission, setHasPermission] = useState<boolean | null>(true);
  const [scanned, setScanned] = useState<boolean>(false);
  const [isScanOk, SetIsScanOk] = useState<boolean>(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    handleSubmitIsbn(data);
  };

  const getBarCodeScannerPermissions = async () => {
    const { status } = await await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

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
        console.log(error);
      }
    }

    const data = {
      title,
      author,
      imgUrl: imgFromCloudinary || imgUrl,
      description,
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

  const handleSubmitIsbn = async (_isbn: string) => {
    try {
      const bookInfos = await getBookInfo(_isbn);

      const isbnToFetchCover =
        _isbn || bookInfos.volumeInfo.industryIdentifiers[1].identifier;
      const bookImgUrl = getBookCoverUrl(isbnToFetchCover, "M");
      if (bookInfos.volumeInfo.title) {
        setTitle(bookInfos.volumeInfo.title);
      }
      if (bookInfos.volumeInfo.authors) {
        setAuthor(bookInfos.volumeInfo.authors[0]);
      }
      if (bookImgUrl) {
        setImage(bookImgUrl);
        setImgUrl(bookImgUrl);
      }
      if (bookInfos.volumeInfo.description) {
        setDescription(bookInfos.volumeInfo.description);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

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

  useEffect(() => {
    if (scanned && isScanOk) setIsScannerRequested(false);
  }, [scanned, isScanOk]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <View>
        return ( <Text>No access to camera</Text>
        <Button
          title="Allow camera"
          onPress={() => getBarCodeScannerPermissions()}
        />
        return (
      </View>
    );
  }

  return (
    <>
      {isScannerRequested ? (
        <View style={styles.scannerContainer}>
          <View style={styles.barCodeBox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              // style={{ height: 400, width: 400 }}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
          {scanned && (
            <VStack space={10}>
              <Text fontSize={20}>livre trouvé : {title}</Text>
              <HStack justifyContent="space-between">
                <Button
                  title={"Tap to Scan Again"}
                  onPress={() => setScanned(false)}
                  size="lg"
                >
                  Recommencer
                </Button>
                <Button
                  title={"Tap to Scan Again"}
                  onPress={() => SetIsScanOk(true)}
                  size="lg"
                >
                  Valider
                </Button>
              </HStack>
            </VStack>
          )}
        </View>
      ) : (
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
                    placeholder="Auteur"
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
              </HStack>
            </Stack>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 250,
                  height: 400,
                  resizeMode: "contain",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
            <Stack py={5} space={5}>
              <Button onPress={() => setIsScannerRequested(true)}>
                Scanner
              </Button>
              {/* <FormControl.Label>ISBN</FormControl.Label>
              <Input
                variant="underlined"
                p={2}
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.nativeEvent.text)}
              />

              <Button onPress={() => handleSubmitIsbn()}>whith ISBN</Button> */}
            </Stack>
            <Button onPress={handleSubmitForm}>Soumettre</Button>
          </FormControl>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // scanner: {
  //   position: "absolute",
  //   height: "100%",
  //   flex: 1,
  //   flexDirection: "column",
  //   justifyContent: "flex-end",
  //   zIndex: 100 ,
  // },
  scannerContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  barCodeBox: {
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "gray",
  },
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
