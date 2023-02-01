import React, { FC, useState } from "react";

import { capitalize } from "../../../utils/string";
import { Button, Icon, Popover } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { Text, VStack, HStack, Box, Divider } from "native-base";

import { deleteRecipe } from "../../../mw/recipes";

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
        navigation.navigate("AllRecipes");
        setIsOpen(false);
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
          <Text fontSize={20} fontWeight="extrabold">
            {recipe && capitalize(recipe?.title)}
          </Text>
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
        <Box px="4">
          <Text fontSize={14}>{recipe && capitalize(recipe?.description)}</Text>
        </Box>
        <HStack
          px="4"
          pb="4"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            fontWeight="bold"
            onPress={() => navigation.navigate("Book", recipe?.book?._id)}
          >
            {recipe?.book?.title}{" "}
          </Text>
          <Text fontWeight="light" fontStyle="italic" fontSize={12}>
            à la page {recipe?.page}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RecipeCard;
