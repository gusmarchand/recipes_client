import { StyleSheet } from "react-native";
import React, { FC, useEffect, useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  FormControl,
  Input,
  Stack,
  Button,
  Modal,
  Select,
  HStack,
} from "native-base";
import { BookForm } from "../BookForm";
import { createRecipe } from "../../mw/recipes";
import { getBooks } from "../../mw/books";

const RecipeForm = () => {
  const [showModal, setShowModal] = useState(false);

  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const [books, setBooks] = useState<any>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");

  const [errorsMsg, setErrorsMsg] = useState<any>({});

  const validate = () => {
    if (recipeName === undefined || recipeName === "") {
      setErrorsMsg({ ...errorsMsg, recipeName: "Il faut un titre" });

      return false;
    }
    if (category === undefined || category === "") {
      setErrorsMsg({ ...errorsMsg, category: "Il faut choisir une catégorie" });
      return false;
    }
    if (selectedBook === undefined || selectedBook === "") {
      setErrorsMsg({
        ...errorsMsg,
        selectedBook: "Il faut choisir un livre ou en ajouter un",
      });
      return false;
    }
    if (page === undefined || page === "") {
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
      page,
      book: selectedBook,
    };
    try {
      const newRecipe = await createRecipe(data);
      if (newRecipe) {
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
    if (selectedBook !== undefined || selectedBook !== "")
      setErrorsMsg({ ...errorsMsg, selectedBook: null });
  }, [selectedBook]);

  useEffect(() => {
    if (page !== undefined || page !== "")
      setErrorsMsg({ ...errorsMsg, page: null });
  }, [page]);

  const BookModal = () => {
    return (
      <>
        <Button onPress={() => setShowModal(true)}>Ajouter</Button>
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
        <Stack space={5}>
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
          <Stack space={3}>
            <FormControl isRequired isInvalid={errorsMsg?.selectedBook}>
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
                >
                  {books?.map((book: { _id: string; title: string }) => {
                    return (
                      <Select.Item
                        key={book._id}
                        label={book.title}
                        value={book._id}
                      />
                    );
                  })}
                </Select>
                {errorsMsg?.selectedBook && (
                  <FormControl.ErrorMessage>
                    {" "}
                    {errorsMsg?.selectedBook}
                  </FormControl.ErrorMessage>
                )}
                <Stack flex={1}>
                  <BookModal />
                </Stack>
              </HStack>
            </FormControl>
          </Stack>

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
          <Stack>
            <FormControl.Label>Description</FormControl.Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.nativeEvent.text)}
              variant="underlined"
              p={2}
              placeholder="Petite description"
            />
          </Stack>
          <Button onPress={handleSubmit}>Soumettre</Button>
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

export default RecipeForm;
