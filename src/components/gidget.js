import React from "react";
import { Color } from "../constant/color";
import { Icon, ButtonGroup } from "react-native-elements";
import { TouchableOpacity } from "react-native";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

/**
 * Proceed Button using predefined color and icon
 * and with onTouch effect
 * @property onPress - onPress function when the button is pressed
 */
export const ProceedButton = ({ onPress }) => (
  <Icon
    name="angle-double-right"
    type="font-awesome-5"
    size={20}
    color={Color.main}
    containerStyle={{
      backgroundColor: Color.accent,
      height: 30,
      width: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    }}
    Component={TouchableOpacity}
    onPress={onPress}
  />
);

/**
 * Button group containing multiple buttons
 * @property setSelection - on select callback
 * @property selection - current selected value
 * @property buttons - button components in the group
 */
export const LRButtonGroup = ({ setSelection, selection, buttons }) => (
  <ButtonGroup
    onPress={setSelection}
    selectedIndex={selection}
    buttons={buttons}
    containerStyle={{
      borderRadius: 20,
      borderWidth: 0,
      backgroundColor: Color.secondary,
      width: widthPercentageToDP(50),
    }}
    buttonStyle={{
      borderRadius: 20,
    }}
    selectedButtonStyle={{
      backgroundColor: Color.accent,
      margin: 4,
    }}
    textStyle={{
      color: Color.accent,
      fontSize: heightPercentageToDP(2.8),
      fontWeight: "bold",
    }}
    selectedTextStyle={{
      color: Color.secondary,
      fontWeight: "bold",
    }}
    innerBorderStyle={{ width: 0 }}
  />
);
