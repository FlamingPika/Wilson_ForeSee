import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import I18n from "i18n-js";
import { Icon, Divider } from "react-native-elements";
import { Size, Spacing } from "../../styles/size";
import Color from "../../styles/color";
import s from "../../styles/styles";
import { withOpacity } from "../../utils/utils";
import { useSelector } from "react-redux";

/**
 * Settings Screen with general items
 */
export default function SettingsScreen({ navigation, route }) {
  const user = useSelector((state) => state.user);
  const [warning, setWarning] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);

  const list = [
    {
      title: I18n.t("SETTINGS_account"),
      onPress: () => navigation.navigate("Account"),
    },
    {
      title: I18n.t("SETTINGS_termsOfUse"),
      onPress: () => navigation.navigate("TermsOfUse"),
    },
    {
      title: I18n.t("SETTINGS_help"),
      // onPress: () => navigation.navigate("DocDetail", { content: "help" }),
      onPress: () => {
        setWarning(true);
      },
    },
    {
      title: I18n.t("SETTINGS_credits"),
      onPress: () => navigation.navigate("Credits"),
    },
    {
      title: I18n.t("SETTINGS_aboutUs"),
      onPress: () => navigation.navigate("AboutUs"),
    },
  ];

  return (
    <View style={s.screen.normal}>
      <Text style={[s.color.main, s.text.large, { alignSelf: "flex-start" }]}>
        {I18n.t("SETTINGS_settings")}
      </Text>

      <View style={{ height: Spacing.h.small }} />
      <HiddenFunction on={warning} setOn={setWarning} />
      <FlatList
        data={list}
        style={{ width: "90%" }}
        keyExtractor={(item) => item.title.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress}>
            <View
              style={{
                marginVertical: Spacing.v.small,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  s.color.main,
                  s.text.medium,
                  { alignSelf: "flex-start" },
                ]}
              >
                {item.title}
              </Text>
              <Icon
                name="triangle"
                type="ionicon"
                color={Color.secondary}
                size={Size.h.small}
                style={{
                  alignSelf: "flex-end",
                  rotation: 90,
                }}
              />
            </View>
            <Divider />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
