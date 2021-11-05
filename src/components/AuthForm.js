import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input } from "react-native-elements";

import { Color } from "../constant/color";
import { ProceedButton } from "../components/gidget";

import s from "../styles/styles";
import { Size, Spacing, hp, wp } from "../styles/size";
import I18n from "i18n-js";

/**
 * Input Form for signin and signup screen
 */
export default AuthForm = ({ headerText, onSubmit, type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [familyName, setFamilyName] = useState("");

  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <Text
        style={[
          s.text.medium,
          s.color.light,
          s.text.googleSansMedium,
          { marginVertical: 10 },
        ]}
      >
        {headerText}
      </Text>
      <Input
        inputContainerStyle={styles.inputBoxStyle}
        placeholder={I18n.t("SIGNIN_placeholder_1")}
        placeholderTextColor={Color.secondary}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        inputContainerStyle={styles.inputBoxStyle}
        secureTextEntry
        placeholder={I18n.t("SIGNIN_placeholder_2")}
        placeholderTextColor={Color.secondary}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {type == "signup" && (
        <Input
          inputContainerStyle={styles.inputBoxStyle}
          placeholder="Family Name"
          placeholderTextColor={Color.secondary}
          value={familyName}
          onChangeText={setFamilyName}
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}
      <ProceedButton
        onPress={() => {
          onSubmit({ email, password, familyName });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBoxStyle: {
    backgroundColor: Color.background,
    borderRadius: 30,
    paddingHorizontal: Spacing.h.medium,
    paddingVertical: Spacing.h.xxsmall,
    marginHorizontal: Spacing.h.xxsmall,
    borderBottomWidth: 0,
  },
});
