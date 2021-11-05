import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { Icon } from "react-native-elements";
import { Pressable } from "react-native";
import { withOpacity } from "../utils/utils";
import Color from "../styles/color";
import s from "../styles/styles";
import { hp, Spacing, wp } from "../styles/size";

/**
 * Bottom sheet with a title and a customizable body content
 * @property visible - visibility of the bottomsheet
 * @property title - title
 * @property sheetContent - component that will be displayed as body of the bottom sheet
 * @property onDismiss - callback when dismissing the bottomsheet
 */
export default function BottomSheet({
  visible,
  title,
  sheetContent,
  onDismiss,
}) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onDismiss}
      animationType="fade"
      transparent
    >
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable style={styles.bottomSheet}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.title}>{title}</Text>
            <Icon
              size={25}
              name="x"
              type="octicon"
              iconStyle={{
                color: Color.secondary,
              }}
              containerStyle={{
                position: "absolute",
                right: 0,
              }}
              Component={TouchableOpacity}
              onPress={onDismiss}
            />
          </View>
          <View style={{ height: 16 }} />
          {sheetContent}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: hp(100),
    width: wp(100),
    bottom: 0,
    backgroundColor: withOpacity(Color.dark, 0.2),
    paddingHorizontal: Spacing.h.xsmall,
    zIndex: 10,
  },
  bottomSheet: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: Color.light,
    alignItems: "center",
    alignSelf: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  title: {
    ...s.text.medium,
    ...s.color.main,
    textAlign: "center",
    flex: 1,
  },
});
