import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  I18nManager,
} from "react-native";
import { Text, Divider, Button, Card, Icon } from "react-native-elements";

import I18n from "i18n-js";

// styles
import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing } from "../../styles/size";

import { RoundRectangleButton } from "../../components/Buttons";
import HiddenFunction from "../../components/HiddenFunction";

/**
 * Screen that shows a list of eye exercise for the user to pick from
 * edit here to modify execises and icons
 */
export default function EyeExerciseHomeScreen({ navigation }) {
  //new update: id is for passing to navigation to choose cooresponding track number to detailscreen
  const [currentExerciseID, setCurrentExerciseID] = useState(0);
  // eye exercise description based on i18n, check out for EYEEXERCISE keyword in translation
  // uri: require("../../assets/ApplicationLogo.png")
  const eyeExerciseList = [
    {
      uri: require("../../assets/ApplicationLogo.png"),
      id: 0,
      title: "20-20-20rule",
      description: I18n.t("EYEEXERCISE_20ruleDescription"),
    },
    {
      uri: require("../../assets/ApplicationLogo.png"),
      id: 1,
      title: "Blink break",
      description: I18n.t("EYEEXERCISE_blinkBreakDescription"),
    },
    {
      uri: require("../../assets/ApplicationLogo.png"),
      id: 2,
      title: "Palms",
      description: I18n.t("EYEEXERCISE_palmsDescription"),
    },
    {
      uri: require("../../assets/ApplicationLogo.png"),
      id: 3,
      title: "Figure 8",
      description: I18n.t("EYEEXERCISE_figure8Description"),
    },
    {
      uri: require("../../assets/ApplicationLogo.png"),
      id: 4,
      title: "Near and Far",
      description: I18n.t("EYEEXERCISE_nearAndFarDescription"),
    },
  ];
  //hardcode paddingright text here
  const PurpleBlockList = ({ uri, id, title, description }) => (
    <TouchableOpacity
    onPress={() => {
      setCurrentExerciseID(id);
    }}
    >
      {
        (id==currentExerciseID)? (
          <View style={[localStyles.exerciseBlockContainer, {borderWidth: 5, borderColor:  "#CBD5DB",backgroundColor: "#CBD5DB9F"}]}>
          <View>
            <Image
              source={uri}
              style={{
                width: Size.h.xxlarge,
                height: Size.h.xxlarge,
                borderRadius: scale(20),
              }}
            />
          </View>
          <View style={{ marginHorizontal: Spacing.h.small }}>
            <Text
              style={[s.text.medium, s.color.purple, s.text.googleSansMedium]}
            >
              {title}
            </Text>
            <Text
              style={[
                s.text.small,
                s.color.lightPurple,
                s.text.googleSansMedium,
                { paddingRight: scale(50) },
              ]}
            >
              {description}
            </Text>
          </View>
        </View>

        ):(
          <View style={localStyles.exerciseBlockContainer}>
          <View>
            <Image
              source={uri}
              style={{
                width: Size.h.xxlarge,
                height: Size.h.xxlarge,
                borderRadius: scale(20),
              }}
            />
          </View>
          <View style={{ marginHorizontal: Spacing.h.small }}>
            <Text
              style={[s.text.medium, s.color.purple, s.text.googleSansMedium]}
            >
              {title}
            </Text>
            <Text
              style={[
                s.text.small,
                s.color.lightPurple,
                s.text.googleSansMedium,
                { paddingRight: scale(50) },
              ]}
            >
              {description}
            </Text>
          </View>
        </View>
        )
      }
      </TouchableOpacity>
  );
  /*
      <View style={{ marginHorizontal: Spacing.h.small }}>
        <Text style={[s.text.medium, s.color.purple, s.text.googleSansMedium]}>
          20-20-20 rule
        </Text>
        <Text
          style={[s.text.small, s.color.lightPurple, s.text.googleSansMedium]}
        >
          Rest your eyes.
        </Text>
      </View>
 */
  // padding problem, currently just added this style on safeareaview to solve problem in the problematic elements
  return (
    <SafeAreaView
      style={
        ([s.screen.normal, s.backgroundColor.light],
        { padding: scale(24), paddingTop: scale(45), paddingBottom: scale(15) })
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginVertical: Spacing.h.small }}>
          <Image
            source={require("../../assets/profileBackground.png")}
            style={{
              width: scale(285),
              height: scale(100),
              borderRadius: scale(20),
            }}
          />
        </View>
        <Text
          style={[
            s.text.large,
            s.color.main,
            s.text.googleSansBold,
            { marginVertical: Spacing.h.xsmall },
          ]}
        >
          {I18n.t("EYEEXERCISE_eyeExercise")}
        </Text>
        <Text
          style={[
            s.text.small,
            s.color.secondary,
            s.text.googleSansMedium,
            { alignSelf: "flex-start" },
          ]}
        >
          {I18n.t("EYEEXERCISE_homeDescription_1")}
        </Text>
        <Text
          style={[
            s.text.small,
            s.color.secondary,
            s.text.googleSansMedium,
            { alignSelf: "flex-start", marginVertical: Spacing.h.small },
          ]}
        >
          {I18n.t("EYEEXERCISE_homeDescription_2")}
        </Text>

        <RoundRectangleButton
          title={I18n.t("EYEEXERCISE_go")}
          align="center"
          onPress={() => {
            navigation.navigate("EyeExerciseDetail", { currentExerciseID });
          }}
        />
        <Divider />
        <Text
          style={[
            s.text.medium,
            s.color.main,
            s.text.googleSansBold,
            { marginVertical: Spacing.h.small },
          ]}
        >
          {I18n.t("EYEEXERCISE_exploreExercises")}
        </Text>
        <View style={{ padding: 0 }}>
          {eyeExerciseList.map((u, i) => (
            <PurpleBlockList
              key={i}
              uri={u.uri}
              id={u.id}
              title={u.title}
              description={u.description}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  exerciseBlockContainer: {
    backgroundColor: "#CBD5FB",
    flexDirection: "row",
    borderRadius: scale(15),
    padding: Spacing.h.medium,
    marginVertical: Spacing.h.small,
  },
});

/*
        <RoundRectangleButton
          title={I18n.t("EYEEXERCISE_go")}
          align="center"
          onPress={() => {
            navigation.navigate("EyeExerciseDetail", {currentExerciseID});
          }}
        />
        <RoundRectangleButton
          title={I18n.t("EYEEXERCISE_go")}
          align="center"
          onPress={() => {
            setWarning(true);
          }}
        />
 */
