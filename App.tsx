import React from "react";
import { SSRProvider } from "@react-aria/ssr";
import { extendTheme } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/Home";
import NewRecipeScreen from "./screens/NewRecipe";
import AllRecipesScreen from "./screens/AllRecipes";
import RecipeScreen from "./screens/Recipe";
import BookScreen from "./screens/Book";
import NewBookScreen from "./screens/NewBook";
import AllBooksScreen from "./screens/AllBooks";

import { REACT_APP_API_URL } from '@env';
const API_URL = REACT_APP_API_URL;
console.log("API FROM HOME", API_URL);
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
    <SSRProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NewRecipe" component={NewRecipeScreen} />
          <Stack.Screen name="AllRecipes" component={AllRecipesScreen} />
          <Stack.Screen name="Recipe" component={RecipeScreen} />
          <Stack.Screen name="NewBook" component={NewBookScreen} />
          <Stack.Screen name="AllBooks" component={AllBooksScreen} />
          <Stack.Screen name="Book" component={BookScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SSRProvider>
  );
}

// Color Switch Component
