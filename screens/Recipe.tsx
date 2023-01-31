import { View } from "react-native";
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

interface AllRecipesProps {
  navigation?: any;
  route?: any;
}

interface Recipe {
  title: string;
  description: string;
  category: string;
  page: string;
}

const Recipe: FC<AllRecipesProps> = ({ navigation, route }) => {
  const recipeId = route.params;

  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    if (!recipeId) navigation.navigate("All Recipes");
    const fetchRecipe = async () => {
      const res = await fetch(`http://192.168.86.247:3001/recipe/${recipeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const resData = await res.json();
        setRecipe(resData);
      }
    };
    fetchRecipe();
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
        <Text>{recipe?.title}</Text>
        <Text>{recipe?.page}</Text>
      </Center>
    </NativeBaseProvider>
  );
};

export default Recipe;
