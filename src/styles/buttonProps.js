import Color from "./color";
import { Size, Spacing, FontSize } from "./size";
import { s } from "react-native-size-matters";

/**
 * props (button style & title style) for rounded buttons
 */
export default {
  accent: {
    style: {
      borderRadius: Size.h.small,
      paddingVertical: Spacing.h.xsmall,
      paddingHorizontal: Spacing.h.medium,
      backgroundColor: Color.accent,
    },
    titleStyle: {
      fontSize: FontSize.small,
      color: Color.main,
    },
  },

  accentOutlined: {
    style: {
      borderRadius: Size.h.small,
      paddingVertical: Spacing.h.xsmall,
      paddingHorizontal: Spacing.h.medium,
      backgroundColor: Color.transparent,
      borderWidth: s(4),
      borderColor: Color.accent,
    },
    titleStyle: {
      fontSize: FontSize.small,
      color: Color.accent,
    },
  },
};
