import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RoundedButton } from "../../components/Buttons";
import { Color } from "../../constant/color";
import I18n from "i18n-js";
import s from "../../styles/styles";
import { Spacing } from "../../styles/size";

/**
 * The content of the bottom sheet that will be displayed in graph screen
 */
export default function AddDataSheetContent({ onConfirm, onDismiss }) {
  return (
    <View style={styles.sheetContent}>
      <Text style={styles.sheetContentText}>{I18n.t("addDataMessage")}</Text>
      <View style={{ height: Spacing.h.medium }} />
      <RoundedButton
        title={I18n.t("gotIt")}
        style={styles.confirmButton}
        titleStyle={styles.confirmButtonTitle}
        onPress={onConfirm}
      />
      <View style={{ height: Spacing.h.small }} />
      <RoundedButton
        title={I18n.t("noThanks")}
        style={styles.cancelButton}
        titleStyle={styles.cancelButtonTitle}
        onPress={onDismiss}
      />
    </View>
  );
}

const baseStyles = StyleSheet.create({
  button: {
    borderRadius: 40,
    padding: Spacing.h.small,
    marginHorizontal: Spacing.h.small,
  },
  buttonTitle: {
    ...s.text.small,
  },
});

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: Spacing.h.medium,
  },
  sheetContentText: {
    ...s.text.googleSansMedium,
    ...s.text.small,
    ...s.color.secondary,
    textAlign: "center",
  },
  confirmButton: {
    ...baseStyles.button,
    backgroundColor: Color.main,
  },
  confirmButtonTitle: {
    ...baseStyles.buttonTitle,
    color: Color.accent,
  },
  cancelButton: {
    ...baseStyles.button,
    backgroundColor: Color.background,
  },
  cancelButtonTitle: {
    ...baseStyles.buttonTitle,
    color: Color.secondary,
  },
});
