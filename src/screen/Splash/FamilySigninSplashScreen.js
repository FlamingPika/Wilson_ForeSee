import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { useSelector, useDispatch } from "react-redux";
import {
  initFamilyUserRedux,
  setMemberList,
  setCurrentMember,
} from "../../redux/userSlice";

import s from "../../styles/styles";
import AppIcon from "../../assets/icon.svg";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Color from "../../styles/color";

import {
  fetchUserBio,
  fetchMemberList,
  initFamiliyUser,
} from "../../action/firebaseActions";
import I18n from "i18n-js";

export default function FamilySigninSplashScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const loadFamilyUser = async () => {
    console.log("initial", user);
    // Since sign out will clear all the lcoal states,
    // so sign in will drag all user's data from firebase and write to local

    const userBio = await fetchUserBio();

    // If firebase userBio is null, create userBio again.
    if (userBio === null) {
      console.log("userBio is null");
      await initFamiliyUser();
      userBio = await fetchUserBio();
    }

    const isFirstSignin = userBio?.isFirstSignin;
    console.log(user.createTime);
    dispatch(initFamilyUserRedux(userBio));
    console.log(user.createTime);

    const memberList = await fetchMemberList();
    dispatch(setMemberList(memberList));

    //console.log("-----At SigninSplashScreen-----");
    //console.log("USERBIO", userBio);
    //console.log("MEMBERLIST", memberList);

    // If member list has member, set current member to the first member.
    if (Object.keys(memberList).length != 0) {
      dispatch(setCurrentMember(memberList[Object.keys(memberList)[0]]));
    }

    // If is first time sign in, go to create member
    if (isFirstSignin) {
      console.log("This is first sign in, go to create profile.");
      navigation.replace("CreateProfile");
    } else {
      console.log("This is not first sign in, go to main drawer.");
      navigation.replace("FamilyDrawer");
    }
  };

  useEffect(() => {
    loadFamilyUser();
  }, []);

  return (
    <View
      style={[
        s.screen.normal,
        s.backgroundColor.secondary,
        { justifyContent: "center" },
      ]}
    >
      <AnimatedCircularProgress
        size={200}
        width={10}
        fill={100}
        duration={10000}
        lineCap="round"
        tintColor={Color.accent}
        tintColorSecondary={Color.background}
        backgroundColor={Color.secondary}
      >
        {(fill) => <AppIcon width={200} height={200} />}
      </AnimatedCircularProgress>
      <Text style={styles.title}>{I18n.t("appName")}</Text>
      <Text style={styles.description}>準確追蹤{"\n"}你的眼睛健康走勢</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: hp(4.5),
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    ...s.color.light,
  },
  title: {
    color: Color.light,
    marginVertical: hp(2),
    fontSize: hp(5.5),
  },
});
