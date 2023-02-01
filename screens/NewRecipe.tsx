import React from "react";
import { Center, NativeBaseProvider } from "native-base";

import RecipeForm from "../components/RecipeForm/RecipeForm";

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
