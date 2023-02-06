import { StyleSheet, View, Pressable } from "react-native";
import React, { FC, useEffect, useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  FormControl,
  Input,
  Stack,
  Text,
  Button,
  Modal,
  Select,
  HStack,
  Icon,
  Radio,
} from "native-base";
import { BookForm } from "../BookForm";
import { createRecipe } from "../../mw/recipes";
import { getBooks } from "../../mw/books";
import { Ionicons } from "@expo/vector-icons";

interface RecipeFormProps {
  navigation?: any;
}

const RecipeForm: FC<RecipeFormProps> = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isVeggie, setIsVeggie] = useState<string>("Non");
  const [page, setPage] = useState<string>("");
  const [books, setBooks] = useState<any>([]);
  const [tempIngredient, setTempIngredient] = useState<any>("");
  const [ingredients, setIngredients] = useState<any>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const [errorsMsg, setErrorsMsg] = useState<any>({});

  const handleAddIngredient = () => {
    if (tempIngredient === "") return;
    setIngredients([...ingredients, tempIngredient.trim()]);
    setTempIngredient("");
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const validate = () => {
    if (recipeName === undefined || recipeName === "") {
      setErrorsMsg({ ...errorsMsg, recipeName: "Il faut un titre" });

      return false;
    }
    if (category === undefined || category === "") {
      setErrorsMsg({ ...errorsMsg, category: "Il faut choisir une catégorie" });
      return false;
    }

    if (selectedBook && (page === undefined || page === "")) {
      setErrorsMsg({ ...errorsMsg, page: "Il faut une page" });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const data = {
      title: recipeName,
      description,
      category,
      page: page || null,
      book: selectedBook || null,
      link: link || null,
      recipeIngredient: ingredients,
      isVeggie: isVeggie === "Oui" ? true : false,
    };
    try {
      const newRecipe = await createRecipe(data);
      if (newRecipe) {
        navigation.navigate("Home");
        // ! todo alert success and redirect to recipe
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  }, [showModal]);

  useEffect(() => {
    if (recipeName !== undefined || recipeName !== "")
      setErrorsMsg({ ...errorsMsg, recipeName: null });
  }, [recipeName]);

  useEffect(() => {
    if (category !== undefined || category !== "")
      setErrorsMsg({ ...errorsMsg, category: null });
  }, [category]);

  useEffect(() => {
    if (page !== undefined || page !== "")
      setErrorsMsg({ ...errorsMsg, page: null });
  }, [page]);

  const BookModal = () => {
    return (
      <>
        <Button onPress={() => setShowModal(true)}>Nouveau</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Ajouter un livre</Modal.Header>
            <Modal.Body>
              <BookForm setModalOpen={setShowModal} isFromRecipeForm={true} />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </>
    );
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FormControl style={styles.content}>
        <Stack space={5} paddingBottom={10}>
          <FormControl isRequired isInvalid={errorsMsg?.recipeName}>
            <FormControl.Label>Titre de la recette </FormControl.Label>
            <Input
              variant="underlined"
              p={2}
              placeholder="titre"
              value={recipeName}
              onChange={(e) => setRecipeName(e.nativeEvent.text)}
            />
            {errorsMsg?.recipeName && (
              <FormControl.ErrorMessage>
                {" "}
                {errorsMsg?.recipeName}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={errorsMsg?.category}>
            <FormControl.Label>Catégorie </FormControl.Label>
            <Select
              placeholder="Choisir une catégorie"
              onValueChange={(e) => setCategory(e)}
            >
              <Select.Item label="Entrée ou apéro" value="entree" />
              <Select.Item label="Plat" value="plat" />
              <Select.Item label="Dessert" value="dessert" />
            </Select>
            {errorsMsg?.category && (
              <FormControl.ErrorMessage>
                {" "}
                {errorsMsg?.category}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>Végétarien ? </FormControl.Label>
            <Radio.Group
              flexDirection="row"
              paddingX={5}
              justifyContent={"space-between"}
              name="isveggie"
              accessibilityLabel="is veggie?"
              value={isVeggie}
              onChange={(nextValue) => {
                setIsVeggie(nextValue);
              }}
            >
              <Radio value="Non" my={1}>
                Non
              </Radio>
              <Radio value="Oui" my={1}>
                Oui
              </Radio>
            </Radio.Group>
            {errorsMsg?.category && (
              <FormControl.ErrorMessage>
                {" "}
                {errorsMsg?.category}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>Livre </FormControl.Label>
            <HStack
              space={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Select
                flex={2}
                placeholder="Choisir un livre"
                onValueChange={(e) => setSelectedBook(e)}
                selectedValue={
                  selectedBook.length > 0 ? selectedBook.split("-")[1] : ""
                }
              >
                {books?.map(
                  (book: { _id: string; title: string; author: string }) => {
                    return (
                      <Select.Item
                        key={book._id}
                        label={book?.title}
                        value={book._id}
                      />
                    );
                  }
                )}
              </Select>

              <Stack flex={1}>
                {selectedBook ? (
                  <Button onPress={() => setSelectedBook("")}>Annuler</Button>
                ) : (
                  <BookModal />
                )}
              </Stack>
            </HStack>
          </FormControl>
          {selectedBook && (
            <FormControl isRequired isInvalid={errorsMsg?.page}>
              <FormControl.Label>Page </FormControl.Label>
              <Input
                value={page}
                onChange={(e) => setPage(e.nativeEvent.text)}
                variant="underlined"
                p={2}
                placeholder="Numéro de page"
                keyboardType="numeric"
              />
              {errorsMsg?.page && (
                <FormControl.ErrorMessage>
                  {" "}
                  {errorsMsg?.page}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.nativeEvent.text)}
              variant="underlined"
              p={2}
              placeholder="Petite description"
            />
          </FormControl>

          <Stack>
            <FormControl.Label>Lien</FormControl.Label>
            <Input
              value={link}
              onChange={(e) => setLink(e.nativeEvent.text)}
              variant="underlined"
              p={2}
              placeholder="Lien vers la recette"
            />
          </Stack>
          <Stack>
            <FormControl.Label>Ingrédients</FormControl.Label>
            <HStack
              space={2}
              justifyContent="space-between"
              alignItems="center"
              paddingBottom={2}
            >
              <Input
                flex={2}
                variant="underlined"
                p={2}
                placeholder="Ajouter un ingrédient"
                value={tempIngredient}
                onChange={(e) => setTempIngredient(e.nativeEvent.text)}
                onSubmitEditing={(e) => {
                  handleAddIngredient();
                }}
                blurOnSubmit={false}
              />
              <Button flex={1} onPress={handleAddIngredient}>
                Ajouter
              </Button>
            </HStack>
            {ingredients &&
              ingredients.map((ingredient: any, index: number) => {
                return (
                  <HStack
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius={5}
                    key={index}
                    space={2}
                    paddingY={1}
                    paddingLeft={2}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text color="gray.400" fontSize={11}>
                      {ingredient}
                    </Text>
                    <Pressable onPress={() => handleRemoveIngredient(index)}>
                      <Icon
                        as={Ionicons}
                        name="close-circle-outline"
                        size="lg"
                        color="gray.400"
                      />
                    </Pressable>
                  </HStack>
                );
              })}
          </Stack>
        </Stack>
        <Button onPress={handleSubmit} size="lg">
          Enregistrer la recette
        </Button>
      </FormControl>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    width: "100%",
    flex: 1,
  },
  content: {
    width: "100%",
    flex: 1,
    padding: 10,
    paddingBottom: 200,
  },
});

export default RecipeForm;
