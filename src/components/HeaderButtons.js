import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { View, Text } from "react-native";
import I18n from "i18n-js";

/**
 *   functional component of a header menu button
 *   @property color - the color of the button
 *   @property navigation - the drawer navigator
 */
export function HeaderMenuButton({ color, navigation }) {
  return (
    <Icon
      type="entypo"
      name="menu"
      containerStyle={{ marginRight: 20, paddingBottom:10}}
      size={35}
      color={color}
      onPress={() => {
        try {
          navigation.openDrawer();
        } catch (e) {
          console.debug(e);
        }
      }}
      Component={TouchableOpacity}
    />
  );
}

/**
 *   functional component of a header back button
 *   combines an icon and a label
 *   @property color - the color of the button
 *   @property navigation - the drawer navigator
 */
export function HeaderBackButton({ color, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation?.goBack()}
      style={{ paddingLeft: 10, paddingBottom:10}}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name="keyboard-arrow-left"
          type="materialicons"
          color={color}
          size={35}
        />
        <Text style={{ fontWeight: "bold", color: color, fontSize: 18 }}>
          {I18n.t("back")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/**
 * Generic back button with an arrow icon and a "back" string
 * @property color - color of the button
 * @property onPress - onPress callback
 * @property style - style of the "back" string
 */
export function GenericBackButton({ color, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name="keyboard-arrow-left"
          type="materialicons"
          color={color}
          size={35}
        />
        <Text style={{ fontWeight: "bold", color: color, fontSize: 18 }}>
          {I18n.t("back")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
