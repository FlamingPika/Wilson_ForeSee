import React from "react";
import { View, Text } from "react-native";
import { RoundedButton } from "../../components/Buttons";
import I18n from "i18n-js";
import s from "../../styles/styles";
import bp from "../../styles/buttonProps";
import { Spacing, wp, hp } from "../../styles/size";

/**
 * Screen to prompt user to add their first eye data.
 * Shown after LandingCreateProfile.
 */
export default function LandingAddDataPrompt({ navigation }) {
  return (
    <View
      style={[
        s.screen.normal,
        s.backgroundColor.secondary,
        { justifyContent: "center" },
      ]}
    >
      <Text style={[s.text.medium, s.color.light, { textAlign: "center" }]}>
        {I18n.t("LANDING_ADD_DATA_PROMPT_message")}
      </Text>

      <View style={{ height: hp(10) }} />

      <RoundedButton
        title={I18n.t("LANDING_ADD_DATA_PROMPT_takeMeThere")}
        style={{
          ...bp.accent.style,
          width: wp(50),
        }}
        titleStyle={bp.accent.titleStyle}
        onPress={() => console.log("unimplemented")}
      />
      <View style={{ height: Spacing.h.medium }} />
      <RoundedButton
        title={I18n.t("LANDING_ADD_DATA_PROMPT_browseFirst")}
        style={{
          ...bp.accentOutlined.style,
          width: wp(50),
        }}
        titleStyle={bp.accentOutlined.titleStyle}
        onPress={() => navigation?.replace("FamilyDrawer", { screen: "Home" })}
      />
    </View>
  );
}
