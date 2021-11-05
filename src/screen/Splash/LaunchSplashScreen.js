import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector, useDispatch } from "react-redux";
import s from "../../styles/styles";
import AppIcon from "../../assets/icon.svg";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Color from "../../styles/color";

import { switchLanguage } from "../../redux/settingsSlice";
import I18n from "i18n-js";

export default function LaunchSplashScreen({ navigation }) {
  const { language } = useSelector((state) => state.settings);
  const { isFirstLaunch } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

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
        duration={500}
        lineCap="round"
        tintColor={Color.accent}
        tintColorSecondary={Color.background}
        onAnimationComplete={() => {
          I18n.locale = language;
          console.log("this lang", I18n.locale);
          // // REMOVE IN FUTURE
          // dispatch(switchLanguage("EN"));
          // //
          if (isFirstLaunch) {
            console.log("This is first launch, go to landing.");
            navigation.replace("LandingStack");
          } else {
            console.log("This is not first launch, go to sign in.");
            navigation.replace("SigninStack");
          }
        }}
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
    marginTop: heightPercentageToDP(4.5),
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
