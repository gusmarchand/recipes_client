import { View, Alert, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { FC } from "react";
import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  Image,
  useColorMode,
  NativeBaseProvider,
  VStack,
  Button,
  Stack,
  Icon,
} from "native-base";

import Search from "../components/Search/Search";
import { stylingProps } from "native-base/lib/typescript/theme/tools";

interface HomeProps {
  navigation?: any;
}

const Home: FC<HomeProps> = ({ navigation }) => {
  const salad = require("../assets/salad.png");
  const book = require("../assets/book.png");
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
        <KeyboardAvoidingView
          // style={{ flex: 1 }}
          behavior={"padding"}
          keyboardVerticalOffset={20}
        >
          <VStack space={20} paddingTop="30" px={2} alignItems="center">
            <VStack space={5} alignItems="center">
              <Heading size="2xl">
                Les Recettes{" "}
                <Image
                  source={require("../assets/salad.png")}
                  alt="salad.png"
                  size="xs"
                />
              </Heading>
              <HStack space={5}>
                <Button
                  h={20}
                  width="48%"
                  primary
                  onPress={() => navigation.navigate("AllRecipes")}
                >
                  <Text fontSize={14} fontWeight="bold">
                    Les recettes
                  </Text>
                </Button>
                <Button
                  h={20}
                  width="48%"
                  primary
                  onPress={() => navigation.navigate("NewRecipe")}
                >
                  <Text fontSize={14} fontWeight="bold">
                    Ajouter une recette
                  </Text>
                </Button>
              </HStack>
            </VStack>

<<<<<<< Updated upstream
        <VStack space={20} paddingTop="30" px={2} alignItems="center">
          <VStack space={5} alignItems="center">
            <Heading size="lg">
              Les Recettes <Image source={salad} alt="salad.png" size="xs" />
            </Heading>
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
          </VStack>

          <VStack space={5} alignItems="center">
            <Heading size="lg">
              Les Livres <Image source={book} alt="book.png" size="xs" />
            </Heading>
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
        </VStack>
=======
            <VStack space={5} alignItems="center">
              <Heading size="2xl">
                Les Livres{" "}
                <Image
                  source={require("../assets/book.png")}
                  alt="book.png"
                  size="xs"
                />
              </Heading>
              <HStack space={5}>
                <Button
                  h={20}
                  width="48%"
                  primary
                  onPress={() => navigation.navigate("AllBooks")}
                >
                  <Text fontSize={14} fontWeight="bold">
                    Les livres
                  </Text>
                </Button>
                <Button
                  h={20}
                  width="48%"
                  primary
                  onPress={() => navigation.navigate("NewBook")}
                >
                  <Text fontSize={14} fontWeight="bold">
                    Ajouter un livre
                  </Text>
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </KeyboardAvoidingView>
>>>>>>> Stashed changes
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
