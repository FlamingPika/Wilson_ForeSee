import { s, vs, ms } from "react-native-size-matters";
import { Dimensions } from "react-native";

/**
 * padding & margin
 */
export const Spacing = {
  h: {
    xxxsmall: s(2),
    xxsmall: s(4),
    xsmall: s(8),
    small: s(12),
    medium: s(16),
    large: s(24),
    xlarge: s(30),
  },
  v: {
    xxxsmall: vs(2),
    xxsmall: vs(4),
    xsmall: vs(8),
    small: vs(12),
    medium: vs(16),
    large: vs(24),
    xlarge: vs(30),
  },
};

/**
 * component size etc.
 */
export const Size = {
  h: {
    xsmall: s(12),
    small: s(20),
    medium: s(30),
    large: s(40),
    xlarge: s(55),
    xxlarge: s(70),
  },
  v: {
    xsmall: vs(12),
    small: vs(20),
    medium: vs(30),
    large: vs(40),
    xlarge: vs(55),
    xxlarge: vs(70),
  },
};

/**
 * size for fonts
 */
export const FontSize = {
  small: vs(15),
  medium: vs(20),
  large: vs(25),
  xlarge: vs(29),
  xxlarge: vs(35),
  xxxlarge: vs(40),
};

/**
 * paddings for a generic screen
 */
export const ScreenPadding = {
  top: vs(45),
  left: s(30),
  right: s(30),
  bottom: vs(25),
};

/**
 * util function for getting percentage height of the device's screen
 * @param {number} percent desired height in percent
 */
export const hp = (percent) =>
  (Dimensions.get("screen").height * percent) / 100;

/**
 * util function for getting percentage width of the device's screen
 * @param {number} percent desired width in percent
 * @returns 
 */
export const wp = (percent) => (Dimensions.get("screen").width * percent) / 100;
