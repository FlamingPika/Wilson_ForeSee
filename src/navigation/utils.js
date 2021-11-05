import React from "react";
import {
  HeaderMenuButton,
  HeaderBackButton,
} from "../components/HeaderButtons";

/**
 *  Util function to get screen options with headers using specified tint.
 *  @param color tint color that the header items will use
 *  @param navigation parent navigation containing the screen
 *  @param haveLeft whether to show a back button at the left.
 *
 *  @return screen options object
 */
export function screenOptions(color, navigation, haveLeft = true) {
  return {
    headerShown: true,
    headerTransparent: true,
    title: "",
    headerRight: () => (
      <HeaderMenuButton navigation={navigation} color={color} />
    ),
    headerLeft: () =>
      navigation.canGoBack() && haveLeft ? (
        <HeaderBackButton navigation={navigation} color={color} />
      ) : null,

  };
}
