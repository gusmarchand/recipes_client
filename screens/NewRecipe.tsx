import React, { FC } from "react";
import { Center, NativeBaseProvider } from "native-base";

import RecipeForm from "../components/RecipeForm/RecipeForm";

interface NewRecipeProps {
  navigation?: any;
}

const NewRecipe: FC<NewRecipeProps> = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <RecipeForm navigation={navigation} />
      </Center>
    </NativeBaseProvider>
  );
};

export default NewRecipe;
