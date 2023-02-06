import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { FC, useEffect, useState } from "react";

import { FormControl, Stack, Center, Icon, HStack } from "native-base";
import { getRecipes } from "../../mw/recipes";

import { Ionicons } from "@expo/vector-icons";

interface RecipesListProps {
  navigation?: any;
}

const RecipesList: FC<RecipesListProps> = ({ navigation }) => {
  const [recipes, setRecipes] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const recipes = await getRecipes();
        if (recipes) {
          setRecipes(recipes);
        }
      } catch (error) {
        console.log("recipesList ", error);
      }
    })();
  }, []);

  // ! TODO - Add recipeCard component
  return (
    <Center w="100%">
      <Stack w="100%">
        {recipes.map(
          (
            recipe: {
              isVeggie: boolean;
              _id: number;
              title: string;
              category: string;
              description: string;
              page: string;
            },
            index: number
          ) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("Recipe", recipe._id);
                }}
                key={recipe._id}
              >
                <HStack
                  style={styles.item}
                  borderTopWidth={index === 0 ? 1 : 0}
                >
                  <Text>{recipe?.title}</Text>
                  {recipe?.isVeggie && (
                    <Icon
                      as={Ionicons}
                      ml="2"
                      name="leaf-outline"
                      size="sm"
                      color={"green.500"}
                    />
                  )}
                </HStack>
              </Pressable>
            );
          }
        )}
      </Stack>
    </Center>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
});

export default RecipesList;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

// const ListItem = ({ item, onDelete }) => {
//   const [slideAnim] = useState(new Animated.Value(0));

//   const slide = () => {
//     Animated.timing(slideAnim, {
//       toValue: 1,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => onDelete(item.id));
//   };

//   return (
//     <Animated.View
//       style={[
//         styles.itemContainer,
//         {
//           transform: [
//             {
//               translateX: slideAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0, -80],
//               }),
//             },
//           ],
//         },
//       ]}
//     >
//       <Text style={styles.itemText}>{item.title}</Text>
//       <TouchableOpacity onPress={slide} style={styles.deleteButton}>
//         <Text style={styles.deleteText}>Delete</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// const ItemList = ({ items, onDelete }) => (
//   <View style={styles.listContainer}>
//     {items.map((item) => (
//       <ListItem key={item.id} item={item} onDelete={onDelete} />
//     ))}
//   </View>
// );

// const styles = StyleSheet.create({
//   listContainer: {
//     backgroundColor: '#fff',
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     padding: 16,
//     backgroundColor: '#fff',
//     borderBottomColor: '#ccc',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//   },
//   itemText: {
//     fontSize: 18,
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//     padding: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     right: 0,
//   },
//   deleteText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default ItemList;
