import React from "react";
import { View } from "react-native";
import EyeDataFrag from "./AddDataFrags/EyeDataFrag";
import styles from "../../styles/styles";
import { RoundedButton } from "../../components/Buttons";
import I18n from "i18n-js";
import { scale } from "react-native-size-matters";
import { Size, Spacing } from "../../styles/size";

/**
 * Screen that allows the user to edit a single value of a eye check data object
 */
export default function EditSingleValue({ navigation, route }) {
  const { dataKey } = route.params;
  console.debug("editing: ", dataKey);

  return (
    <View style={[styles.screen.normal, styles.backgroundColor.light]}>
      <View style={{ flex: 1 }}>
        <EyeDataFrag dataKey={dataKey} />
      </View>
      <View style={{ height: Spacing.h.small }} />
      <RoundedButton
        title={I18n.t("EDIT_DATA.done")}
        style={{
          borderRadius: Size.h.small,
          paddingVertical: scale(6),
          paddingHorizontal: scale(18),
        }}
        titleStyle={{
          ...styles.text.small,
        }}
        onPress={() => navigation?.pop()}
      />
    </View>
  );
}
