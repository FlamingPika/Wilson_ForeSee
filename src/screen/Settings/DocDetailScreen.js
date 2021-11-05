import React from "react";
import { View, Text } from "react-native";

import s from "../../styles/styles";

export default function DocDetailSceeen({ navigation, route }) {
  const { content } = route.params;
  return (
    <View style={s.screen.normal}>
      <Text>{content}</Text>
    </View>
  );
}
