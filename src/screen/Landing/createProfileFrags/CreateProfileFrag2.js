import React, { useState, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ButtonGroup } from "react-native-elements";
import CheckBox from "@react-native-community/checkbox";
import I18n from "i18n-js";

import s from "../../../styles/styles";
import { Size, Spacing, hp, wp } from "../../../styles/size";

import bp from "../../../styles/buttonProps";
import { RoundedButton } from "../../../components/Buttons";
import Input from "../../../components/Input";
import { withOpacity } from "../../../utils/utils";

import Popup from "../../../components/Popup";

import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import DatePicker from 'react-native-date-picker'
import { pushData } from "../../../redux/tempDataSlice";

const background = require("../../../assets/background/create_profile_bg_2.jpg");

const diseases = [
  "cataract",
  "diabetic_retinopathy",
  "glaucoma",
  "amblyopia",
  "strabismus",
];

/**
 * page 2 of CreateProfile
 * Data expected:
 * - daily_outdoor_hours
 * - disease_history
 */
export default function CreateProfileFrag2({ onPrev, onSubmit }) {
  const [date, setDate] = useState(new Date())
  const [height, setHeight] = useState("");
  const [genderIndex, setGenderIndex] = useState(0);
  const [outdoorHour, setOutdoorHour] = useState("");
  const [diseaseHistory, setDiseaseHistory] = useState([]);

  const genders = ["Male", "Female"];
  const DisplayGenders = ()=>{
    if (I18n.locale == "SC") {
      return (
        ["男","女"]
        );
    } else if (I18n.locale == "TC") {
      return (
        ["男","女"]
        );
    } else {
      return (
        ["Male","Female"]
        );
    }
  };
  const showgenders = DisplayGenders();
  const [visible, setVisible] = useState(false);
  const [popupContent, setPopupContent] = useState();

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const updatePopupContent = (content) => {
    setPopupContent(
      <Text style={[s.text.small, s.color.secondary, s.text.googleSansMedium]}>
        {content === "invalid"
          ? I18n.t("LANDING_CREATE_PROFILE_invalidInput")
          : I18n.t("LANDING_CREATE_PROFILE_incomplete")}
      </Text>
    );
  };

  const checkValid = () => {
    Keyboard.dismiss();
    console.log(height, genders[genderIndex], outdoorHour, diseaseHistory);
    if (height != "" && outdoorHour != "") {
      const h = parseInt(height);
      const o = parseInt(outdoorHour);
      if (h > 49 && h < 230 && o < 19) {
        console.log("data ok");
        onSubmit({
          height,
          gender: genders[genderIndex],
          outdoorHour,
          diseaseHistory,
        });
      } else {
        toggleVisible();
        updatePopupContent("invalid");
      }
    } else {
      toggleVisible();
      updatePopupContent("incomplete");
    }
  };

  // states for the list of disease checkboxes
  const [checkBoxesValues, setCheckBoxesValues] = useReducer(
    (state, action) => {
      const newState = [...state];
      // Change the index in the state to true/false
      newState[action.idx] = action.value;
      // map the true/false list to disease list and return
      setDiseaseHistory(diseases.filter((_, idx) => newState[idx]));
      return newState;
    },
    // Initialize a empty list of diseases length, fill in with false
    Array(diseases.length).fill(false)
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        source={background}
        style={[
          s.screen.normal,
          s.backgroundColor.secondary,
          { alignItems: "flex-start" },
        ]}
      >
        <Popup
          visible={visible}
          title="Notification"
          popupContent={<View style={{ width: "100%" }}>{popupContent}</View>}
          onDismiss={toggleVisible}
        />
        <Input
          intOnly
          label={I18n.t("LANDING_CREATE_PROFILE_enterHeight")}
          labelStyle={{ ...styles.text, marginBottom: Spacing.v.medium }}
          maxLength={3}
          inputColor={s.rowColor.light}
          inputContainerStyle={styles.inputContainer}
          value={height}
          onChangeValue={setHeight}
        />

        <Text
          style={{
            ...styles.text,
            marginTop: Spacing.v.medium,
            marginBottom: Spacing.v.xsmall,
          }}
        >
          {I18n.t("LANDING_CREATE_PROFILE_enterGender")}
        </Text>

        <ButtonGroup
          onPress={setGenderIndex}
          selectedIndex={genderIndex}
          buttons={showgenders}
          containerStyle={styles.buttonGroupContainer}
          innerBorderStyle={{ width: 0 }}
          selectedButtonStyle={[s.backgroundColor.purple, { borderRadius: 18 }]}
          selectedTextStyle={[s.color.light]}
          textStyle={[s.text.medium, s.color.light, s.text.googleSansMedium]}
        />



   {/* <DatePicker date={date} onDateChange={setDate} /> */}
        <Input
          intOnly
          label={I18n.t("LANDING_CREATE_PROFILE_dailyOutdoorHours")}
          labelStyle={{ ...styles.text, marginVertical: Spacing.v.medium }}
          maxLength={2}
          inputColor={s.rowColor.light}
          inputContainerStyle={styles.inputContainer}
          value={outdoorHour}
          onChangeValue={setOutdoorHour}
        />

        <Text style={{ ...styles.text, marginVertical: Spacing.v.medium }}>
          {I18n.t("LANDING_CREATE_PROFILE_diseaseHistory")}
        </Text>

        {diseases.map((d, idx) => (
          <DiseaseCheckBox
            value={checkBoxesValues[idx]}
            onValueChange={(newValue) =>
              setCheckBoxesValues({
                idx: idx,
                value: newValue,
              })
            }
            label={I18n.t(d)}
            key={d}
          />
        ))}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginVertical: Spacing.v.large,
            alignItems: "flex-end",
          }}
        >
          <RoundedButton
            title={I18n.t("LANDING_CREATE_PROFILE_back")}
            style={{
              ...bp.accent.style,
              flex: 1,
            }}
            titleStyle={bp.accent.titleStyle}
            onPress={onPrev}
          />
          <View style={{ width: Spacing.h.medium }} />
          <RoundedButton
            title={I18n.t("LANDING_CREATE_PROFILE_done")}
            style={{
              ...bp.accent.style,
              flex: 1,
            }}
            titleStyle={bp.accent.titleStyle}
            onPress={checkValid}
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const DiseaseCheckBox = ({ value, onValueChange, label }) => (
  <TouchableOpacity
    onPress={() => onValueChange(!value)}
    style={{ flexDirection: "row", alignItems: "center" }}
  >
    <CheckBox
      disabled
      value={value}
      {...Platform.select({
        android: {
          tintColors: {
            true: s.rowColor.accent,
            false: s.rowColor.background,
          },
        },
        ios: {
          tintColor: s.rowColor.background,
          onCheckColor: s.rowColor.transparent,
          onFillColor: s.rowColor.accent,
          onTintColor: s.rowColor.accent,
        },
      })}
    />
    <View style={{ width: Spacing.h.small }} />
    <Text style={[s.color.light, s.text.small]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    ...s.text.small,
    ...s.color.light,
  },
  inputContainer: {
    backgroundColor: withOpacity(s.rowColor.background, 0.8),
  },
  buttonGroupContainer: {
    alignSelf: "center",
    borderWidth: 0,
    borderRadius: 20,
    width: wp(60),
    padding: Spacing.h.xxxsmall,
    backgroundColor: s.rowColor.lightPurple,
  },
});

/*

<View
  style={{
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  }}
>
  <RoundedButton
    title={I18n.t("LANDING_CREATE_PROFILE_createLater")}
    {...bp.accentOutlined}
    onPress={onSkip}
  />
  <View style={{ width: Spacing.h.large }} />
  <RoundedButton
    title={I18n.t("LANDING_CREATE_PROFILE_done")}
    style={{
      ...bp.accent.style,
      flex: 1,
    }}
    titleStyle={bp.accent.titleStyle}
    onPress={onNext}
  />
</View>

*/
