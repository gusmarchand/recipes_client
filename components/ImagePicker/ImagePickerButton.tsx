import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ImagePickerButton = () => {
  const [image, setImage] = useState(null);
  console.log("App");
  const pickImage = async () => {
    console.log("pickImage");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.assets);
    // const { uri } = result.assets[0];
    // console.log(uri);

    // if (!result.canceled) {
    //   setImage(result.assets);
    // }
  };

  return (
    <View>
      <Button onPress={pickImage} title="Choisir une photo" color={"red"} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 5,
//   },
// });

export default ImagePickerButton;
