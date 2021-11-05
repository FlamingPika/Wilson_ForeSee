import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Color } from "../constant/color";
import { withOpacity } from "../utils/utils";
import { Icon } from "react-native-elements";
import { hp, Spacing, wp } from "../styles/size";
import { KeyboardAvoidingView } from "react-native";

/**
 * Customizable popup with a title and a body
 * 
 * @property vislble - visiblility of the popup
 * @property title - title
 * @property popupContent - component that will be displayed as the body content of the popup
 * @property onDismiss - callback when popup is dismiss
 * 
 * Usage:
 * 
 * <Popup
 * 	visible={visible}
 * 	title="Notification"
 * 	popupContent={<View style={{ width: "100%" }}>{popupContent}</View>}
 * 	onDismiss={toggleVisible}
 * />
 */
export default function Popup({ visible, title, popupContent, onDismiss }) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onDismiss}
      animationType="fade"
      transparent
    >
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
          <Pressable style={styles.popup}>
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
            <View style={{ height: Spacing.h.medium }} />
            {popupContent}
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: hp(100),
    width: wp(100),
    backgroundColor: withOpacity("#000000", 0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: Color.white,
    borderRadius: 30,
    padding: Spacing.h.medium,
    width: wp(80),
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: Color.main,
    textAlign: "center",
    flex: 1,
  },
});
