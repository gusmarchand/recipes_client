import { View, Text } from "react-native";
import React, { FC, useEffect, useState } from "react";

import { FormControl, Stack, Center } from "native-base";
import { getRecipes } from "../../mw/recipes";

interface RecipesListProps {
  navigation?: any;
}

const RecipesList: FC<RecipesListProps> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const recipes = await getRecipes();
        if (recipes) {
          setRecipes(recipes);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // ! TODO - Add recipeCard component
  return (
    <Center>
      <FormControl>
        <Stack space={5}>
          {recipes.map(
            (recipe: {
              _id: number;
              title: string;
              category: string;
              description: string;
              page: string;
            }) => {
              return (
                <View key={recipe._id}>
                  <Text
                    onPress={() => {
                      navigation.navigate("Recipe", recipe._id);
                    }}
                  >
                    {recipe.title}
                  </Text>
                </View>
              );
            }
          )}
        </Stack>
      </FormControl>
    </Center>
  );
};

export default RecipesList;
