import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import I18n from "i18n-js";
import { Icon, Divider } from "react-native-elements";
import Color from "../../styles/color";
import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing, hp, wp } from "../../styles/size";
import { withOpacity } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";

import { fetchUserBio, getAge } from "../../action/firebaseActions";
import { initFamilyUserRedux } from "../../redux/userSlice";

/**
 * Settings Screen with account-related items
 */
export default function Account({ navigation, route }) {
  // use live data instead from redux.
  const [userBio, setUserBio] = useState({});
  const { currentMember } = useSelector((state) => state.user);
  const load = async () => {
    const userBioFB = await fetchUserBio();
    console.log("bio", userBioFB);
    console.log(userBioFB);
    setUserBio(userBioFB);
  };
  const currentTime = new Date()
  useEffect(() => {
    load();
    console.log();
  }, []);

  const list = [
    {
      title: I18n.t("SETTINGS_email"),
      content: userBio.userEmail ?? "empty",
    },
    // {
    //   title: I18n.t("SETTINGS_phone"),
    //   content: "empty",
    // },
    {
      title: I18n.t("SETTINGS_accountType"),
      content: userBio.isPro ? "Pro" : "Family",
    },
    {
      title: I18n.t("SETTINGS_age"),
      content: currentMember.birthYear==null ? "empty" : currentTime.getFullYear()-currentMember.birthYear,
    },
  ];

  const d = {
    title: [
      I18n.t("SETTINGS_icon"),
      I18n.t("SETTINGS_username"),
      I18n.t("SETTINGS_email"),
      I18n.t("SETTINGS_age"),
      I18n.t("SETTINGS_height"),
      I18n.t("SETTINGS_sex"),
      I18n.t("SETTINGS_phone"),
    ],
    content: ["", "Abc", "abc@abc.com", "20", "170", "M/F", "12345678"],
    onPress: [navigation.navigate("Account")],
  };

  return (
    <View style={s.screen.normal}>
      <Text style={[s.color.main, s.text.large, { alignSelf: "flex-start" }]}>
        {I18n.t("SETTINGS_account")}
      </Text>

      <View style={{ height: Spacing.h.small }} />

      <View style={{ height: Spacing.h.small }} />

      <Icon
        type="font-awesome-5"
        name="users"
        size={Size.v.large}
        color={s.rowColor.main}
      />

      <FlatList
        data={list}
        style={{ width: "90%" }}
        keyExtractor={(item) => item.title.toString()}
        renderItem={({ item }) => (
          <>
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
              <Text
                style={[
                  s.color.main,
                  s.text.medium,
                  { alignSelf: "flex-start" },
                ]}
              >
                {item.content}
              </Text>
              {/* <Icon
                name="triangle"
                type="ionicon"
                color={Color.secondary}
                size={Size.h.small}
                style={{
                  alignSelf: "flex-end",
                  rotation: 90,
                }}
              /> */}
            </View>
            <Divider />
          </>
        )}
      />
    </View>
  );
}
