import I18n from "i18n-js";
import React, { useReducer } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import Popup from "../../../components/Popup";
import { DataInputSlider } from "../../../components/Slider";
import { EyeDataType } from "../../../constant/eyeDataType";
import { pushData } from "../../../redux/tempDataSlice";
import { Spacing } from "../../../styles/size";
import styles from "../../../styles/styles";

/**
 * A Fragment for eye data input; consist of vertical sliders
 */
export default function EyeDataFrag({ dataKey }) {
  const type = EyeDataType[dataKey];
  const [helpVisible, toggleHelp] = useReducer((state) => !state, false);
  const dispatch = useDispatch();

  return (
    <View style={[styles.screen.fragment, styles.backgroundColor.light]}>
      <Text
        style={[styles.text.large, styles.color.main]}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {I18n.t("ADD_DATA.eyeDataTitle", { dataName: type?.displayString })}
      </Text>
      <TouchableOpacity onPress={toggleHelp}>
        <Text
          style={[
            styles.color.secondary,
            styles.text.small,
            styles.text.googleSansMedium,
            {
              textDecorationLine: "underline",
            },
          ]}
        >
          {I18n.t("ADD_DATA.eyeDataHelp")}
        </Text>
      </TouchableOpacity>
      <View style={{ height: Spacing.h.small }} />

      <View style={{ flexDirection: "row", flex: 1 }}>
        <DataInputSlider
          {...type}
          heading="O.D."
          initialValue={type?.initialValue}
          onSlidingComplete={(value) => {
            dispatch(
              pushData({
                [`od_${dataKey}`]: value,
              })
            );
          }}
        />
        <DataInputSlider
          {...type}
          heading="O.S."
          initialValue={type?.initialValue}
          onSlidingComplete={(value) => {
            dispatch(
              pushData({
                [`os_${dataKey}`]: value,
              })
            );
          }}
        />
      </View>

      <Popup
        visible={helpVisible}
        onDismiss={toggleHelp}
        title={type?.displayString}
        popupContent={
          <Text style={[styles.text.small, styles.color.secondary]}>
            {
              I18n.t(`ADD_DATA.${dataKey}Help`) // example: "ADD_DATA.sphHelp"
            }
          </Text>
        }
      />
    </View>
  );
}
