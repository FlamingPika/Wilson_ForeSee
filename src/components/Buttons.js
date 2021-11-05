import React, { useState } from "react";
import { TouchableOpacity, Pressable, Text, StyleSheet } from "react-native";
import { Icon, Button } from "react-native-elements";
import { darken } from "../utils/utils";

import s from "../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Spacing, FontSize, Size } from "../styles/size";

/**
 * General purpose rounded button used throughout the app.
 * @property title - title
 * @property titleStyle - style of the title
 * @property style - style of the container
 * @property darkenAmount - the amount of darkening of button when it is pressed down; If negative, it will create a lightening effect on press. default = 20
 * @property onPress - onPress callback
 */
export function RoundedButton({
  title,
  titleStyle,
  style,
  darkenAmount = 20,
  onPress,
}) {
  const [pressed, setPressed] = useState(false);

  const color = style?.backgroundColor || defaultStyles.button.backgroundColor;
  const titleColor = titleStyle?.color || defaultStyles.buttonTitle.color;
  const borderColor = style?.borderColor || defaultStyles.button.borderColor;
  const borderWidth = style?.borderWidth || defaultStyles.button.borderWidth;

  // calculate padding offsets
  let paddingHorizontal =
    style?.paddingHorizontal ?? style?.padding ?? defaultStyles.button.padding;
  let paddingVertical =
    style?.paddingVertical ?? style?.padding ?? defaultStyles.button.padding;

  paddingHorizontal = Math.max(paddingHorizontal - borderWidth, 0);
  paddingVertical = Math.max(paddingVertical - borderWidth, 0);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={[
        defaultStyles.button,
        style,
        {
          backgroundColor: pressed ? darken(color, darkenAmount) : color,
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
          borderWidth: borderWidth,
          borderColor: pressed
            ? darken(borderColor, darkenAmount)
            : borderColor,
        },
      ]}
    >
      <Text
        style={[
          defaultStyles.buttonTitle,
          titleStyle,
          {
            color: pressed ? darken(titleColor, darkenAmount) : titleColor,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

/**
 * icon button with a question mark
 */
export function QuestionButton({ onPress, color, containerStyle }) {
  return (
    <Icon
      name="questioncircleo"
      type="antdesign"
      size={24}
      Component={TouchableOpacity}
      color={color}
      onPress={onPress}
      containerStyle={{ ...containerStyle }}
    />
  );
}

const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: s.rowColor.main,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderColor: "#000000",
    borderWidth: 0,
  },
  buttonTitle: {
    color: s.rowColor.accent,
    fontSize: FontSize.medium,
    textAlign: "center",
  },
});

/*
used in eye exerise main and add question screen

<RoundRectangleButton title='' onPress={} />

*/
export function RoundRectangleButton({
  title,
  icon,
  align,
  onPress,
  containerStyle,
  buttonStyle,
  titleStyle,
}) {
  return (
    <Button
      title={title}
      icon={icon}
      containerStyle={{
        marginTop: Spacing.v.medium,
        alignSelf: align ? align : "flex-end",
        borderRadius: 20,
        width: "100%",
        ...containerStyle,
      }}
      buttonStyle={{
        backgroundColor: s.rowColor.main,
        paddingHorizontal: Spacing.h.large,
        ...buttonStyle,
      }}
      titleStyle={[
        s.text.small,
        s.color.accent,
        s.text.googleSansMedium,
        titleStyle,
      ]}
      onPress={onPress}
    />
  );
}
