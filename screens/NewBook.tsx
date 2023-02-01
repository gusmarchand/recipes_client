import { View } from "react-native";
import React, { FC } from "react";
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

import BookForm from "../components/BookForm/BookForm";

interface NewBookProps {
  navigation?: any;
}

const NewBook: FC<NewBookProps> = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <BookForm navigation={navigation} />
      </Center>
    </NativeBaseProvider>
  );
};

export default NewBook;
