import React, { FC, useEffect, useState } from "react";
import { Text, Center, NativeBaseProvider } from "native-base";

import RecipeCard from "../components/Cards/RecipeCard/RecipeCard";
import { getRecipe } from "../mw/recipes";

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
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const recipeId = route.params;
    (async () => {
      try {
        const _recipe = await getRecipe(recipeId);
        if (_recipe) {
          setRecipe(_recipe);
        }
      } catch (error) {
        console.log(error);
      }
    })();
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
