import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import Color from "../styles/color";
import { hp, wp } from "../styles/size";
import { withOpacity } from "../utils/utils";

/**
 * An Overlay with a circular progress indicator at the center.
 * Used to indicate the loading state and blocks user interactions
 * @property color - color of the activity indicator
 */
export default function LoadingIndicator({ color = Color.accent }) {
  return (
    <Modal transparent>
      <View
        style={{
          position: "absolute",
          width: wp(100),
          height: hp(100),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: withOpacity(Color.dark, 0.5),
        }}
      >
        <ActivityIndicator size="large" color={color} />
      </View>
    </Modal>
  );
}
