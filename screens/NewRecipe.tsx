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
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <RecipeForm />
      </Center>
    </NativeBaseProvider>
  );
};

export default NewRecipe;
