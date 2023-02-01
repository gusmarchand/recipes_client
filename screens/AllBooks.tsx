import { View } from "react-native";
import React, { FC } from "react";
import { Center, NativeBaseProvider } from "native-base";

import BooksList from "../components/BooksList/BooksList";

interface AllBooksProps {
  navigation?: any;
  route?: any;
}

const AllBooks: FC<AllBooksProps> = ({ navigation }) => {
  // ! TODO - fetch here and pass array of data to RecipesList
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <BooksList navigation={navigation} />
      </Center>
    </NativeBaseProvider>
  );
};

export default AllBooks;
