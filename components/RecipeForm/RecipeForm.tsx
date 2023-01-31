import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { FC, useEffect, useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { FormControl, Input, Stack, Button, Modal, Select } from "native-base";
import BookForm from "../BookForm";

const RecipeForm = () => {
  const [showModal, setShowModal] = useState(false);

  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("entree");
  const [page, setPage] = useState<string>("");
  const [books, setBooks] = useState<any>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");

  const handleSubmit = async () => {
    const data = {
      title: recipeName,
      description,
      category,
      page,
      book: selectedBook,
    };
    const res = await fetch("http://192.168.86.247:3001/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
  };

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
  }, [showModal]);

  const BookModal = () => {
    return (
      <>
        <Button shadow={2} onPress={() => setShowModal(true)}>
          Ajouter un livre
        </Button>
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
          <Stack>
            <FormControl.Label>Titre de la recette</FormControl.Label>
            <Input
              variant="underlined"
              p={2}
              placeholder="titre"
              value={recipeName}
              onChange={(e) => setRecipeName(e.nativeEvent.text)}
            />
          </Stack>
          <Stack>
            <FormControl.Label>Catégorie</FormControl.Label>
            <Select
              defaultValue={category}
              onValueChange={(e) => setCategory(e)}
            >
              <Select.Item label="Entrée ou apéro" value="entree" />
              <Select.Item label="Plat" value="plat" />
              <Select.Item label="Dessert" value="dessert" />
            </Select>
          </Stack>
          <Stack space={3}>
            <Stack>
              <FormControl.Label>Livre</FormControl.Label>
              <Select
                placeholder="Choisir un livre"
                onValueChange={(e) => setSelectedBook(e)}
              >
                {books.map((book: { _id: string; title: string }) => {
                  return (
                    <Select.Item
                      key={book._id}
                      label={book.title}
                      value={book._id}
                    />
                  );
                })}
              </Select>
            </Stack>
            <Stack alignItems="flex-end" h={8}>
              <BookModal />
            </Stack>
          </Stack>
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

          <Stack>
            <FormControl.Label>Page</FormControl.Label>
            <Input
              value={page}
              onChange={(e) => setPage(e.nativeEvent.text)}
              variant="underlined"
              p={2}
              placeholder="Numéro de page"
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
