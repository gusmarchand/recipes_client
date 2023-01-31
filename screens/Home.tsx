import { View, Alert } from "react-native";
import React, { FC, useEffect, useState } from "react";
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
  Stack,
} from "native-base";
import ImagePicker from "../components/ImagePicker";
import { Search } from "../components";

// import { useNavigation } from "@react-navigation/native";

// const navigation = useNavigation();
interface HomeProps {
  navigation?: any;
}

const Home: FC<HomeProps> = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <Stack position="absolute" top="1" w="100%" zIndex="50">
          <Search navigation={navigation}></Search>
        </Stack>

        <VStack space={5} paddingTop="30" alignItems="center">
          <Heading size="lg">Les Recettes</Heading>
          <HStack space={5}>
            <Button
              h={16}
              width="48%"
              primary
              onPress={() => navigation.navigate("AllRecipes")}
            >
              <Text fontSize={11} fontWeight="bold">
                Voir toutes les recettes
              </Text>
            </Button>
            <Button
              h={16}
              width="48%"
              primary
              onPress={() => navigation.navigate("NewRecipe")}
            >
              <Text fontSize={11} fontWeight="bold">
                Ajouter une recette
              </Text>
            </Button>
          </HStack>
          <Heading size="lg">Les Livres</Heading>
          <HStack space={5}>
            <Button
              h={16}
              width="48%"
              primary
              onPress={() => navigation.navigate("AllBooks")}
            >
              <Text fontSize={11} fontWeight="bold">
                Voir toutes les livres
              </Text>
            </Button>
            <Button
              h={16}
              width="48%"
              primary
              onPress={() => navigation.navigate("NewBook")}
            >
              <Text fontSize={11} fontWeight="bold">
                Ajouter un livre
              </Text>
            </Button>
          </HStack>
        </VStack>
      </Center>
      {/* <ToggleDarkMode /> */}
    </NativeBaseProvider>
  );
};

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

export default Home;
