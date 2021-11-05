import React, { useState } from "react";
import { View, Image, Text } from "react-native";

/**
 * Circular Avatar with an image or a title
 * @property source - image uri
 * @property size - size of the avatar
 * @property color - background color
 * @property textColor - color of the title
 * @property title - title string
 */
export default function Avatar({ source, size, color, textColor, title }) {
  const [valid, setValid] = useState(true);

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = {
    fontSize: size / 2,
    color: textColor,
  };

  return valid ? (
    <Image
      source={source}
      style={containerStyle}
      onError={() => {
        setValid(false);
      }}
    />
  ) : (
    <View style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
}
