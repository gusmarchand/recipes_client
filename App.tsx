import React from "react";
import {
  Text,
  Link,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  Box,
} from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/Home";
import TestScreen from "./screens/Test";
import NewRecipeScreen from "./screens/NewRecipe";
import AllRecipesScreen from "./screens/AllRecipes";
import RecipeScreen from "./screens/Recipe";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

const Stack = createNativeStackNavigator();
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="NewRecipe" component={NewRecipeScreen} />
        <Stack.Screen name="AllRecipes" component={AllRecipesScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Color Switch Component
