import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Modal,
  Image,
  Keyboard,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import I18n from "i18n-js";
import { RoundedButton } from "../../../components/Buttons";
import Input from "../../../components/Input";
import { withOpacity } from "../../../utils/utils";
import s from "../../../styles/styles";
import { s as scale } from "react-native-size-matters";
import bp from "../../../styles/buttonProps";
import { Size, Spacing, ScreenPadding } from "../../../styles/size";
import Color from "../../../styles/color";
import Popup from "../../../components/Popup";
import { RoundRectangleButton } from "../../../components/Buttons";
import moment from "moment";
import TermOfUse from "../../../components/TermsOfUse";
const background = require("../../../assets/background/create_profile_bg_1.jpg");

/**
 * page 1 of createProfile
 * Data expected:
 * - age
 * - height
 */
function DataPolicy(props) {
  return (
    <View>
      <Modal visible={props.on} animationType="slide" transparent>
        <View style={styles.centeredView}>
          <Modal visible={props.on} animationType="fade" transparent>
            <View style={styles.centeredViewBackground}></View>
          </Modal>
          <View style={[s.backgroundColor.light, styles.warningModal]}>
            <View>
              <View style={[s.backgroundColor.secondary, styles.warningTitle]}>
                <Text
                  style={[
                    styles.titleText,
                    s.text.googleSansBold,
                    s.text.xlarge,
                    s.color.light,
                  ]}
                >
                  {I18n.t("appName")}
                </Text>
                <Image
                  source={require("../../../assets/ApplicationLogo.png")}
                  style={{
                    width: Size.h.medium,
                    height: Size.h.medium,
                    borderRadius: scale(20),
                  }}
                />
              </View>
            </View>
            <View style={{ maxHeight: "80%" }}>
              <TermOfUse />
            </View>
            <TouchableOpacity
              style={[s.backgroundColor.main, styles.touchable]}
              onPress={() => {
                props.setOn(false);
              }}
            >
              <Text
                style={[
                  s.text.medium,
                  s.text.googleSansBold,
                  s.color.light,
                  { textAlign: "center" },
                ]}
              >
                {I18n.t("confirm")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default function CeateProfileFrag1({ onSkip, onNext, setP1Data }) {
  const [name, setName] = useState("");
  const [birthYear, setbirthYear] = useState("");
  const [visible, setVisible] = useState(false);
  const [popupContent, setPopupContent] = useState();

  const toggleVisible = () => {
    console.log("set visible to", !visible);
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
    console.log(name, birthYear);
    if (name != "" && birthYear != "") {
      const a = parseInt(birthYear);
      if (a > 1900 && a <= moment().year()) {
        console.log("data ok");
        setP1Data({ name, birthYear });
        onNext();
      } else {
        toggleVisible();
        updatePopupContent("invalid");
      }
    } else {
      toggleVisible();
      updatePopupContent("incomplete");
    }
  };

  const skipPopup = () => {
    toggleVisible();
    setPopupContent(
      <>
        <Text
          style={[s.text.small, s.color.secondary, s.text.googleSansMedium]}
        >
          {I18n.t("LANDING_CREATE_PROFILE_later")}
        </Text>
        <RoundRectangleButton
          title="OK"
          align="center"
          onPress={() => {
            setVisible(false);
            onSkip();
          }}
        />
      </>
    );
  };
  const [warning, setWarning] = useState(false);
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
          title={I18n.t("SETTINGS_notifications")}
          popupContent={<View style={{ width: "100%" }}>{popupContent}</View>}
          onDismiss={toggleVisible}
        />
        <Text style={[s.text.large, s.color.light, s.text.googleSansBold]}>
          {I18n.t("LANDING_CREATE_PROFILE_welcome")}
        </Text>
        <View
          style={{
            flex: 1,
            marginRight: -ScreenPadding.right / 2,
            marginVertical: Spacing.v.xsmall,
          }}
        >
          <ScrollView
            persistentScrollbar
            showsVerticalScrollIndicator
            contentContainerStyle={{
              paddingRight: ScreenPadding.right / 2,
            }}
          >
            <Text style={[s.text.small, s.color.light]}>
              {I18n.t("LANDING_CREATE_PROFILE_dataPolicy")}
            </Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            setWarning(true);
          }}
        >
          <DataPolicy on={warning} setOn={setWarning} />
          <Text style={{ ...styles.hintText, marginVertical: Spacing.v.small }}>
            {I18n.t("LANDING_CREATE_PROFILE_dataPolicyReadMore")}
          </Text>
        </TouchableOpacity>

        <Text style={[s.text.medium, s.color.light, s.text.googleSansBold]}>
          {I18n.t("LANDING_CREATE_PROFILE_createFirstMember")}
        </Text>

        <Input
          label={I18n.t("LANDING_CREATE_PROFILE_enterName")}
          labelStyle={{ ...styles.text, marginVertical: Spacing.v.small }}
          maxLength={20}
          inputColor={Color.light}
          inputContainerStyle={styles.inputContainer}
          value={name}
          onChangeValue={setName}
        />

        <Input
          intOnly
          label={I18n.t("LANDING_CREATE_PROFILE_enterAge")}
          labelStyle={{ ...styles.text, marginVertical: Spacing.v.small }}
          maxLength={4}
          inputColor={Color.light}
          inputContainerStyle={styles.inputContainer}
          value={birthYear}
          onChangeValue={setbirthYear}
        />

        <View style={{ height: Spacing.v.large }} />

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          {/* <RoundedButton
            style={{ ...bp.accent.style, flex: 1 }}
            titleStyle={bp.accent.titleStyle}
            title={I18n.t("skip")}
            onPress={skipPopup}
          /> */}
          <View style={{ width: Spacing.h.medium }} />
          <RoundedButton
            style={{ ...bp.accent.style, flex: 1 }}
            titleStyle={bp.accent.titleStyle}
            title={I18n.t("LANDING_CREATE_PROFILE_next")}
            onPress={checkValid}
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
DataPolicy.defaultProps = {
  on: false,
};
const styles = StyleSheet.create({
  warningModal: {
    width: wp(80),
    height: hp(80),
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredViewBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000086",
  },
  titleText: {
    paddingRight: scale(8),
  },
  warningTitle: {
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: scale(12),
    paddingLeft: wp(20),
  },
  warningBody: {
    height: hp(25),
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    ...s.text.small,
    ...s.color.light,
  },
  hintText: {
    ...s.text.small,
    opacity: 0.8,
    color: Color.light,
    textDecorationLine: "underline",
  },
  inputContainer: {
    backgroundColor: withOpacity(Color.background, 0.8),
  },
});

/*

<View
  style={{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  }}
>
  <RoundedButton
    {...bp.accentOutlined}
    title={I18n.t("LANDING_CREATE_PROFILE_createLater")}
    onPress={onSkip}
  />
  <View style={{ width: Spacing.h.large }} />
  <RoundedButton
    style={{ ...bp.accent.style, flex: 1 }}
    titleStyle={bp.accent.titleStyle}
    title={I18n.t("LANDING_CREATE_PROFILE_next")}
    onPress={onNext}
  />
</View>

*/
