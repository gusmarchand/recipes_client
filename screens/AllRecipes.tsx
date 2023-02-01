import React, { FC } from "react";
import { Center, NativeBaseProvider } from "native-base";

import RecipesList from "../components/RecipesList/RecipesList";

interface AllRecipesProps {
  navigation?: any;
}

const AllRecipes: FC<AllRecipesProps> = ({ navigation }) => {
  // ! TODO - fetch here and pass array of data to RecipesList
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <RecipesList navigation={navigation} />
      </Center>
    </NativeBaseProvider>
  );
};

export default AllRecipes;
