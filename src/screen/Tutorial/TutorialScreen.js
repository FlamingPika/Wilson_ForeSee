import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Color } from "../../constant/color";
import I18n from "i18n-js";

export default function TutorialScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>{I18n.t("tutorial")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.background,
  },
});
