import { View, Text, TextInput } from "react-native";
import React, { FC, useEffect, useState } from "react";

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

interface RecipesListProps {
  navigation?: any;
}

const RecipesList: FC<RecipesListProps> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<any>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch("http://192.168.86.247:3001/recipe", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setRecipes(resData);
    };
    fetchRecipes();
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
                      console.log("recipe._id", recipe._id);
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
