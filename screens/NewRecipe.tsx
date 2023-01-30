import { View } from "react-native";
import React from "react";
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

import { RecipeForm } from "../components";

const NewRecipe = () => {
  return (
    <NativeBaseProvider>
      <Center>
        <RecipeForm />
      </Center>
    </NativeBaseProvider>
  );
};

export default NewRecipe;
