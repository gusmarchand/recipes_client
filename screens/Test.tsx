import { View, Text } from "react-native";
import React, { FC } from "react";

interface TestProps {
  navigation?: any;
}

const Test: FC<TestProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

export default Test;
