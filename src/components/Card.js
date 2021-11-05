import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../styles/color";
import { Size, Spacing } from "../styles/size";
import s from "../styles/styles";

/**
 * Card with a label and a number
 */
export function NumberCard({ label, number, style }) {
  return (
    <View style={{ ...defaultStyles.container, ...style }}>
      <Text style={defaultStyles.label}>{label}</Text>
      <Text style={defaultStyles.number}>{number.toString()}</Text>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.secondary,
    borderRadius: Size.h.small,
    alignItems: "center",
    paddingHorizontal: Spacing.h.medium,
    paddingVertical: Spacing.h.small,
  },
  label: {
    ...s.text.small,
    ...s.color.light,
    textAlign: "center",
  },
  number: {
    ...s.text.xxxlarge,
    ...s.color.accent,
    ...s.text.OswaldBold,
    textAlign: "center",
  },
});
