import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import I18n from "i18n-js";
import LandingIcon1 from "../../assets/landing/icon1.svg";
import LandingIcon2 from "../../assets/landing/icon2.svg";
import LandingIcon3 from "../../assets/landing/icon3.svg";
import LandingIcon4 from "../../assets/landing/icon4.svg";
import LandingIcon5 from "../../assets/landing/icon5.svg";
import PagerView from "react-native-pager-view";
import { RoundedButton } from "../../components/Buttons";
import Color from "../../styles/color";

import { useDispatch } from "react-redux";
import { setIsFirstLaunch } from "../../redux/settingsSlice";

import s from "../../styles/styles";
import { Size, Spacing, hp, wp } from "../../styles/size";

const renderSlides = (content) => {
  return content.map(({ pos, title, subtitle, icon }) => (
    <View key={pos} style={styles.container}>
      <View
        style={{ height: "45%", justifyContent: "center", paddingTop: "6.5%" }}
      >
        {icon}
      </View>
      <View style={{ flex: 1, paddingTop: "10%" }}>
        {pos === 0 ? (
          <>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{subtitle}</Text>
          </>
        ) : (
          <Text style={styles.title}>
            <Text style={[s.color.main]}>{title}</Text>
            {subtitle}
          </Text>
        )}
        <Text style={[styles.text, { marginTop: "3%" }]}>
          {I18n.t("landingHintMsg")}
        </Text>
      </View>
    </View>
  ));
};

const Dots = ({ content, activePos }) => {
  return (
    <View style={styles.dotsContainer}>
      {content.map(({ pos }) => (
        <View
          key={pos}
          style={pos === activePos ? styles.dotActive : styles.dot}
        />
      ))}
    </View>
  );
};

/**
 * Screen consist of multiple sub-pages that shows on first launch to introduce the functions of the app to the user.
 */
export default function LandingScreen({ navigation }) {
  const dispatch = useDispatch();
  const [activePos, setActivePos] = useState(0);
  const content = [
    {
      pos: 0,
      title: I18n.t("landing1Title"),
      subtitle: I18n.t("landing1Subtitle"),
      icon: <LandingIcon1 />,
    },
    {
      pos: 1,
      title: I18n.t("landing2TitleHighlight"),
      subtitle: I18n.t("landing2Title"),
      icon: <LandingIcon2 />,
    },
    {
      pos: 2,
      title: I18n.t("landing3TitleHighlight"),
      subtitle: I18n.t("landing3Title"),
      icon: <LandingIcon3 />,
    },
    {
      pos: 3,
      title: I18n.t("landing4TitleHighlight"),
      subtitle: I18n.t("landing4Title"),
      icon: <LandingIcon4 />,
    },
    {
      pos: 4,
      title: I18n.t("landing5TitleHighlight"),
      subtitle: I18n.t("landing5Title"),
      icon: <LandingIcon5 />,
    },
  ];

  function toSignin() {
    dispatch(setIsFirstLaunch(false));
    navigation.replace("SigninStack");
  }

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setActivePos(e.nativeEvent.position)}
      >
        {renderSlides(content)}
      </PagerView>

      <Dots content={content} activePos={activePos} />

      {activePos === content.length - 1 ? (
        <View
          style={{
            position: "absolute",
            bottom: "5%",
            alignSelf: "center",
          }}
        >
          <RoundedButton
            title={I18n.t("startMyJourney")}
            color={Color.background}
            style={styles.startButton}
            titleStyle={styles.startButtonTitle}
            onPress={toSignin}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={{ position: "absolute", right: 20, top: 20 }}
        onPress={toSignin}
      >
        <Text
          style={[s.text.small, s.color.secondary, s.text.googleSansMedium]}
        >
          {I18n.t("skip")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.light,
  },
  dot: {
    backgroundColor: Color.secondary,
    borderRadius: 13 / 2,
    width: 13,
    height: 13,
    marginHorizontal: 3.5,
  },
  dotActive: {
    backgroundColor: Color.main,
    borderRadius: 13 / 2,
    width: 13,
    height: 13,
    marginHorizontal: 3.5,
  },
  dotsContainer: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    bottom: "20%",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: Color.secondary,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: Color.secondary,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: Color.secondary,
    opacity: 0.8,
  },
  startButton: {
    padding: 12,
    backgroundColor: Color.background,
    borderRadius: 40,
    width: wp(70),
  },
  startButtonTitle: {
    fontSize: 20,
    color: Color.main,
  },
});
