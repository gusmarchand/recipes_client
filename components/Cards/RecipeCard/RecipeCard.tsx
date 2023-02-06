import React, { FC, useState } from "react";

import { capitalize } from "../../../utils/string";
import {
  Button,
  Icon,
  Link,
  Popover,
  Text,
  VStack,
  HStack,
  Box,
  Divider,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { Linking, Pressable } from "react-native";

import { deleteRecipe } from "../../../mw/recipes";
import { getBringsLink } from "../../../mw/externals";

interface RecipeCardProps {
  recipe: any;
  navigation?: any;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe, navigation }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    const id = recipe?._id;
    try {
      const deletedRecipe = await deleteRecipe(id);
      if (deletedRecipe) {
        navigation.navigate("Home");
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePressIngredients = async (id: string) => {
    try {
      const link = await getBringsLink(id);
      if (link) {
        Linking.openURL(link);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box borderWidth={1} borderRadius="md" w="100%">
      <VStack space="4" divider={<Divider />}>
        <HStack
          px="4"
          pt="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack>
            <Text fontSize={20} fontWeight="extrabold">
              {recipe && capitalize(recipe?.title)}
            </Text>
            {recipe?.isVeggie && (
              <Icon
                as={Ionicons}
                ml="2"
                name="leaf-outline"
                size="lg"
                color={"green.500"}
              />
            )}
          </HStack>
          <Popover
            placement="left"
            isOpen={isOpen}
            trigger={(triggerProps) => {
              return (
                <Button
                  {...triggerProps}
                  backgroundColor="transparent"
                  onPress={() => setIsOpen(true)}
                >
                  <Icon
                    as={Ionicons}
                    name="trash-outline"
                    size="xl"
                    color={"red.500"}
                  />
                </Button>
              );
            }}
            onClose={() => setIsOpen(!isOpen)}
          >
            <Popover.Content accessibilityLabel="Delete Customerd" w="56">
              <Popover.Header>Supprimer la recette</Popover.Header>
              <Popover.Body>
                Veux-tu vrameent supprimer cette recette ?
              </Popover.Body>
              <Popover.Footer justifyContent="flex-end">
                <Button.Group space={2}>
                  <Button
                    colorScheme="coolGray"
                    variant="ghost"
                    onPress={() => setIsOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button colorScheme="danger" onPress={handleDelete}>
                    Supprimer
                  </Button>
                </Button.Group>
              </Popover.Footer>
            </Popover.Content>
          </Popover>
        </HStack>
        <Box px="4" pb="4">
          <Text fontSize={14}>{recipe && capitalize(recipe?.description)}</Text>
        </Box>
        {recipe?.link?.length > 0 && (
          <Box px="4" pb="4">
            <Link href={recipe.link}>
              <Text fontSize={14}>{recipe?.link && recipe?.link}</Text>
            </Link>
          </Box>
        )}
        {recipe?.book && (
          <Pressable
            onPress={() => navigation.navigate("Book", recipe?.book?._id)}
          >
            <HStack
              px="4"
              pb="4"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontWeight="bold">{recipe?.book?.title} </Text>
              <Text fontWeight="light" fontStyle="italic" fontSize={12}>
                à la page {recipe?.page}
              </Text>
            </HStack>
          </Pressable>
        )}

        {recipe?.recipeIngredient?.length > 0 && (
          <Pressable
            onPress={() => {
              handlePressIngredients(recipe?._id);
            }}
          >
            <HStack
              px="4"
              pb="4"
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              {recipe?.recipeIngredient?.map(
                (ingredient: any, index: number) => (
                  <Text key={index} fontSize={14}>
                    {ingredient}
                    {index < recipe?.recipeIngredient?.length - 1 && ", "}
                  </Text>
                )
              )}
            </HStack>
            {/* <Link href="https://api.getbring.com/rest/bringrecipes/deeplink?url={}&source=web&baseQuantity=4&requestedQuantity=4">
              touch here
            </Link> */}
          </Pressable>
        )}
      </VStack>
    </Box>
  );
};

export default RecipeCard;
