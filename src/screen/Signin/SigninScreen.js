import I18n from "i18n-js";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Text, Input, ButtonGroup } from "react-native-elements";

import auth from "@react-native-firebase/auth";

import AppIcon from "../../assets/icon.svg";
import { ProceedButton } from "../../components/gidget";
import Popup from "../../components/Popup";
import LoadingIndicator from "../../components/LoadingIndicator";
import { initFamiliyUser, initProUser } from "../../action/firebaseActions";
import { useSelector } from "react-redux";

import s from "../../styles/styles";
import { Size, Spacing, hp, wp } from "../../styles/size";


export default function SigninScreen({ navigation, route }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPW, setIsForgotPW] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [visible, setVisible] = useState(false);
  const [popupContent, setPopupContent] = useState();
  const [loading, setLoading] = useState(false);

  const modes = ["family", "pro"];
  const modesShown = () => {
    if(I18n.locale == "TC"){
      return modesButtons = ["家庭", "專業"];
    }
    else if (I18n.locale == "SC"){
      return modeButtons = ["家庭", "专业"];
    }
    else{
      return modesButtons = ["family", "pro"];
    }
  }
  var modesButtons = modesShown();

  const [mode, setMode] = useState("family");

  useEffect(() => {
    if (mode == "pro") {
      toggleVisible();
      setPopupContent(
        <Text
          style={[s.text.small, s.color.secondary, s.text.googleSansMedium]}
        >
          {I18n.t("SIGNIN_proMode")}
        </Text>
      );
    }
  }, [mode]);

  const updatePopupContent = (content) => {
    setPopupContent(
      <Text style={[s.text.small, s.color.secondary, s.text.googleSansMedium]}>
        {content == "incomplete"
          ? I18n.t("SIGNIN_incomplete")
          : content == "pwNotMatch"
          ? I18n.t("SIGNIN_pwNotMatch")
          : content == "resetPW"
          ? I18n.t("SIGNIN_emailSentPassword")
          : I18n.t("SIGNIN_failed")}
      </Text>
    );
  };

  const signIn = async (email, password) => {
    console.log("this is sign in");
    setLoading(true);
    if (email != "" && password != "") {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("Sign in success");
        })
        .catch((err) => {
          console.log("Sign in failed", err);
          toggleVisible();
          updatePopupContent("failed");
        });
    } else {
      toggleVisible();
      updatePopupContent("incomplete");
    }
    setLoading(false);
  };

  const signUp = async () => {
    console.log("this is sign up");
    setLoading(true);
    if (email != "" && password != "" && password == confirmPassword) {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          await initFamiliyUser();
          if (mode === "pro") await initProUser();
        })
        .catch((err) => {
          console.log("Sign up failed", err.code);
          toggleVisible();
          updatePopupContent("failed");
        });
    } else {
      toggleVisible();
      updatePopupContent("pwNotMatch");
    }
    setLoading(false);
  };

  const forgotPW = async (email) => {
    setLoading(true);
    if (email != "") {
      console.log("this is forgotPW");
      await auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          updatePopupContent("resetPW");
          toggleVisible();
        })
        .catch((err) => {
          updatePopupContent("failed");
          toggleVisible();
        });
    }

    setLoading(false);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  // Switch between sign in and sign up
  const toggleIsSignIn = () => {
    setIsSignIn(!isSignIn);
    setIsForgotPW(false);
  };

  // Switch to Forgot Pw
  const toggleForgotPW = () => {
    setIsForgotPW(!isForgotPW);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView
        style={[
          s.screen.normal,
          s.backgroundColor.secondary,
          { justifyContent: "center" },
        ]}
      >
        <Popup
          visible={visible}
          title={I18n.t("SETTINGS_notifications")}
          popupContent={<View style={{ width: "100%" }}>{popupContent}</View>}
          onDismiss={toggleVisible}
        />
        {loading && <LoadingIndicator />}
        <AppIcon height="120" style={{ alignSelf: "center" }} />

        <Text
          style={[
            s.text.xxxlarge,
            s.color.light,
            s.text.googleSansBold,
            { marginVertical: Spacing.h.small },
          ]}
        >
          {I18n.t("appName")}
        </Text>

        <Text
          style={[
            s.text.medium,
            s.color.light,
            s.text.googleSansMedium,
            { marginBottom: Spacing.h.medium },
          ]}
        >
          {/* {I18n.t("appSubheading")} */}
        </Text>

        <View style={{ alignItems: "center", width: "100%" }}>
          <Text
            style={[
              s.text.medium,
              s.color.light,
              s.text.googleSansMedium,
              { marginVertical: 10, marginTop: -40 },
            ]}
          >
            {isSignIn && isForgotPW == false
              ? I18n.t("SIGNIN_signin")
              : !isSignIn && isForgotPW == false
              ? I18n.t("SIGNIN_signup")
              : I18n.t("SIGNIN_forgotPassword")}
          </Text>
          <Input
            inputContainerStyle={styles.inputBoxStyle}
            placeholder={I18n.t("SIGNIN_placeholder_1")}
            placeholderTextColor={s.rowColor.secondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {isForgotPW == false && (
            <>
              <Input
                inputContainerStyle={styles.inputBoxStyle}
                secureTextEntry
                placeholder={I18n.t("SIGNIN_placeholder_2")}
                placeholderTextColor={s.rowColor.secondary}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </>
          )}

          {!isSignIn && (
            <>
              <Input
                inputContainerStyle={styles.inputBoxStyle}
                secureTextEntry
                placeholder={I18n.t("SIGNIN_placeholder_3")}
                placeholderTextColor={s.rowColor.secondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <ButtonGroup
                onPress={(index) => {setMode(modes[index]);}}
                selectedIndex={mode === modes[0] ? 0 : 1}
                buttons={modesButtons}
                containerStyle={styles.buttonGroupContainer}
                innerBorderStyle={{ width: 0 }}
                selectedButtonStyle={[
                  s.backgroundColor.accent,
                  { borderRadius: 18 },
                ]}
                selectedTextStyle={[s.color.secondary]}
                textStyle={[
                  s.text.medium,
                  s.color.accent,
                  s.text.googleSansMedium,
                ]}
              />
            </>
          )}
          <ProceedButton
            onPress={
              isSignIn && isForgotPW == false
                ? () => signIn(email, password)
                : !isSignIn && isForgotPW == false
                ? () => signUp(email, password)
                : () => forgotPW(email)
            }
          />
        </View>

        <TouchableOpacity
          style={{ marginVertical: Spacing.h.medium }}
          onPress={toggleIsSignIn}
        >
          <Text
            style={[
              s.text.small,
              s.color.main,
              s.text.googleSansRegular,
              {
                textDecorationLine: "underline",
                fontSize: 15,
                fontWeight: "bold",
              },
            ]}
          >
            {isSignIn ? I18n.t("SIGNIN_signup") : I18n.t("SIGNIN_signin")}
          </Text>
        </TouchableOpacity>
        {!isForgotPW && isSignIn && (
          <TouchableOpacity onPress={toggleForgotPW}>
            <Text
              style={[
                s.text.small,
                s.color.main,
                s.text.googleSansRegular,
                {
                  textDecorationLine: "underline",
                  fontSize: 15,
                  fontWeight: "bold",
                },
              ]}
            >
              {I18n.t("SIGNIN_forgotPassword")}
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputBoxStyle: {
    backgroundColor: s.rowColor.background,
    borderRadius: 30,
    paddingHorizontal: Spacing.h.medium,
    paddingVertical: Spacing.h.xxsmall,
    marginHorizontal: Spacing.h.xxsmall,
    borderBottomWidth: 0,
    margin: -5,
  },
  buttonGroupContainer: {
    borderWidth: 0,
    borderRadius: 20,
    width: wp(50),
    marginBottom: Spacing.v.small,
    padding: Spacing.h.xxxsmall,
    backgroundColor: s.rowColor.secondary,
    marginTop: -10,
  },
});
