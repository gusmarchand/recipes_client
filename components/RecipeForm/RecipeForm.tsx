import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

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

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<string>("");

  const handleSubmit = async () => {
    const data = {
      title: recipeName,
      description,
      category,
      page,
    };
    const res = await fetch("http://192.168.86.247:3001/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    console.log(resData);
  };

  return (
    <Center>
      <FormControl>
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
            <Select defaultValue="entree" onValueChange={(e) => setCategory(e)}>
              <Select.Item label="Entrée ou apéro" value="entree" />
              <Select.Item label="Plat" value="plat" />
              <Select.Item label="Dessert" value="dessert" />
            </Select>
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
    </Center>
  );
};

export default RecipeForm;
