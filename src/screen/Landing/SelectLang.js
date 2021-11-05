import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import I18n from "i18n-js";
import AppIcon from "../../assets/icon.svg";

import s from "../../styles/styles";
import { Spacing, hp, wp } from "../../styles/size";

import { useDispatch } from "react-redux";
import { switchLanguage } from "../../redux/settingsSlice";
import { RoundedButton } from "../../components/Buttons";

/**
 * Screen for language selection
 */
export default function SelectLang({ navigation }) {
  const dispatch = useDispatch();
  const langList = ["TC", "SC", "EN"];
  const langTags = ["中文 - 繁體", "中文 - 简体", "English"];
  const lang = I18n.locale;

  const [selected, setSelected] = useState(
    langList.findIndex((e) => e === lang)
  );

  function onPress(idx) {
    setSelected(idx);
    dispatch(switchLanguage(langList[idx]));
    navigation.navigate("Landing");
  }

  function LangButtonGroup() {
    return (
      <View style={{ paddingVertical: Spacing.v.medium }}>
        {langTags.map((lang, index) => (
          <RoundedButton
            key={index}
            title={lang}
            type="solid"
            style={
              index === selected
                ? localStyles.selectedButton
                : localStyles.nonSelectedButton
            }
            titleStyle={
              index === selected
                ? localStyles.selectedButtonTitle
                : localStyles.nonSelectedButtonTitle
            }
            onPress={() => onPress(index)}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={[s.screen.normal, s.backgroundColor.secondary]}>
      <AppIcon height={hp(22)} />
      <View
        style={{
          paddingVertical: Spacing.v.large,
          alignItems: "center",
        }}
      >
        <Text style={[s.text.xxxlarge, s.color.light, s.text.googleSansBold]}>
          {I18n.t("appName")}
        </Text>
        <Text style={[s.text.medium, s.color.light, s.text.googleSansBold]}>
          {I18n.t("appSubheading")}
        </Text>
      </View>
      <Text style={[s.text.medium, s.color.light, s.text.googleSansBold]}>
        {I18n.t("selectLang_chooseLang")}
      </Text>
      <LangButtonGroup />
    </View>
  );
}

const baseStyles = StyleSheet.create({
  button: {
    borderRadius: 30,
    padding: Spacing.h.small,
    width: wp(60),
    marginVertical: Spacing.v.xsmall,
  },
  buttonTitle: s.text.small,
});

const localStyles = StyleSheet.create({
  selectedButton: {
    ...baseStyles.button,
    backgroundColor: s.rowColor.main,
  },
  selectedButtonTitle: {
    ...baseStyles.buttonTitle,
    color: s.rowColor.accent,
  },
  nonSelectedButton: {
    ...baseStyles.button,
    backgroundColor: s.rowColor.background,
  },
  nonSelectedButtonTitle: {
    ...baseStyles.buttonTitle,
    color: s.rowColor.secondary,
  },
});
