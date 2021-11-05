/* Usage:

import s from "../../styles/styles";
import { Size, Spacing, hp, wp } from "../../styles/size";

// not used

import { s as scale } from "react-native-size-matters";
import Color from "../../styles/color";

*/

import { StyleSheet } from "react-native";
import Color from "./color";
import { FontSize, ScreenPadding } from "./size";

/**
 * common styles that are shared across the app
 */
const styles = {
  text: {
    //	font size
    small: { fontSize: FontSize.small },
    medium: { fontSize: FontSize.medium },
    large: { fontSize: FontSize.large },
    xlarge: { fontSize: FontSize.xlarge },
    xxlarge: { fontSize: FontSize.xxlarge },
    xxxlarge: { fontSize: FontSize.xxxlarge },

    // font family
    googleSansBold: { fontFamily: "GoogleSans-Bold" },
    googleSansMedium: { fontFamily: "GoogleSans-Medium" },
    googleSansRegular: { fontFamily: "GoogleSans-Regular" },
    OswaldBold: { fontFamily: "Oswald-Bold" },

    // alignment
    alignCenter: { textAlign: "center" },
  },

  // color
  color: StyleSheet.create({
    main: { color: Color.main },
    secondary: { color: Color.secondary },
    accent: { color: Color.accent },
    background: { color: Color.background },
    light: { color: Color.light },
    purple: { color: Color.purple },
    lightPurple: { color: Color.lightPurple },
  }),

  // background color
  backgroundColor: StyleSheet.create({
    main: { backgroundColor: Color.main },
    secondary: { backgroundColor: Color.secondary },
    accent: { backgroundColor: Color.accent },
    background: { backgroundColor: Color.background },
    light: { backgroundColor: Color.light },
    purple: { backgroundColor: Color.purple },
    lightPurple: { backgroundColor: Color.lightPurple },
  }),

  rowColor: {
    main: "#0B5625",
    secondary: "#42945E",
    accent: "#FFE4A0",
    background: "#C7E2C5",
    graphBackground: "#186A34",
    purple: "#563D8D",
    lightPurple: "#65548A",
    light: "#FFFFFF",
    dark: "#000000",
    transparent: "#00000000",

    chartBackground: "#186A34",
    chartBlue: "#D1DBFF",
    chartPink: "#F8A5B9",
    chartYellow: "#E9AC50",
  },

  // style for the screen container
  screen: StyleSheet.create({
    normal: {
      width: "100%",
      height: "100%",
      paddingTop: ScreenPadding.top,
      paddingLeft: ScreenPadding.left,
      paddingRight: ScreenPadding.right,
      paddingBottom: ScreenPadding.bottom,
      alignItems: "center",
    },
    LRFullSceeen: {
      width: "100%",
      height: "100%",
      paddingTop: ScreenPadding.top,
      paddingBottom: ScreenPadding.bottom,
      alignItems: "center",
    },
    // style for a fragment in pager
    fragment: {
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
  }),
};

export default styles;
