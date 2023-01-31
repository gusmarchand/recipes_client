import React, { FC, useEffect, useState } from "react";
import { Text, Center, NativeBaseProvider } from "native-base";

import { RecipeCard } from "../components/Cards";
import { BookProps } from "./Book";

interface AllRecipesProps {
  navigation?: any;
  route?: any;
}

interface Recipe {
  title?: string;
  description?: string;
  category?: string;
  page?: string;
  book?: string;
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
        <RecipeCard recipe={recipe} navigation={navigation}></RecipeCard>
      </Center>
    </NativeBaseProvider>
  );
};

export default Recipe;
