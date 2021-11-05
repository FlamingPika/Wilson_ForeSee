import React from "react";
import { TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { StyleSheet, Text } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import s from "../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing, hp, wp } from "../styles/size";
import Color from "../styles/color";

/**
 * A preview of an article. Consist of the image and title of the article
 * @property item - the article object
 * @property navigation - the navigator object in the current context
 */
export default function ArticleMiniReview({ item, navigation }) {
  return (
    <TouchableOpacity
      style={localStyles.container}
      onPress={() => {
        navigation.navigate("ArticlesDetail", { item: item });
      }}
    >
      <ImageBackground
        style={localStyles.image}
        source={{ uri: item.imageURL }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0.3, 1]}
          colors={["transparent", "rgba(0,0,0,0.3)"]}
          style={localStyles.linearGradient}
        >
          <Text style={[s.text.small, s.color.light, s.text.googleSansMedium]}>
            {item.articleTitle}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.h.xsmall,
    marginVertical: Spacing.h.xsmall,
    height: hp(25),
    width: wp(35),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    backgroundColor: Color.light,
  },
  linearGradient: {
    height: "100%",
    justifyContent: "flex-end",
    // This padding will affect the position of the title
    padding: Spacing.h.xsmall,
  },
});
