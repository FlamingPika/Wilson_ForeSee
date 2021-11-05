import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Color } from "../../constant/color";
import I18n from "i18n-js";
import { NumberCard } from "../../components/Card";
import Badge1 from "../../assets/badges/badge1.svg";
import Badge2 from "../../assets/badges/badge2.svg";
import Badge3 from "../../assets/badges/badge3.svg";
import Badge4 from "../../assets/badges/badge4.svg";
import ScannerIcon from "../../assets/scanner_icon.svg";
import Popup from "../../components/Popup";
import { Profiles } from "../../sampledata/DummyData";
import QRCode from "react-native-qrcode-svg";

import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing } from "../../styles/size";
import { useSelector } from "react-redux";
import { getStreakNumber } from "../../action/firebaseActions";
import HiddenFunction from "../../components/HiddenFunction";
import auth from "@react-native-firebase/auth";
/**
 * Screen showing a brief overview of the current family member
 */
export default ProfileScreen = ({ navigation }) => {
  const { currentUser } = auth();
  const [qrVisible, setQrVisible] = useState(false);
  const toggleQr = () => setQrVisible(!qrVisible);
  const [warning, setWarning] = useState(false);
  const { currentMember } = useSelector((state) => state.user);
  const [SR, setSR] = useState(0); //This is used to set streakNumber
  //async function for treating promise, so to setSR to streakNumber in firebase
  const getSR = async () => {
    let num = await getStreakNumber(currentMember);
    setSR(num);
  };
  useEffect(() => {
    getSR();
  }, []);

  return (
    <View style={[s.screen.normal, s.backgroundColor.light]}>
      <HiddenFunction on={warning} setOn={setWarning} />
      <Text style={[s.text.large, s.color.main, { alignSelf: "flex-start" }]}>
        {I18n.t("profile")}
      </Text>
      <View style={{ height: Spacing.h.medium }} />

      <View style={styles.profileContainer}>
        <View>
          <Image
            source={{
              uri: "https://i.imgur.com/Hicnp5W.png",
            }}
            style={{
              width: scale(100),
              height: scale(100),
              borderRadius: scale(50),
            }}
          />
          <Image
            source={{
              uri: "https://i.imgur.com/LauzTfA.jpg",
            }}
            style={{
              position: "absolute",
              margin: scale(10),
              height: scale(80),
              width: scale(80),
              borderRadius: scale(40),
            }}
          />
        </View>

        <View style={{ width: Spacing.h.medium }} />

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={[s.text.medium, s.color.secondary]}>
            {currentMember.name}
          </Text>
          <View style={{ height: Spacing.h.small }} />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={toggleQr}
          >
            <ScannerIcon width={Size.h.small} height={Size.h.small} />
            <View style={{ width: Spacing.h.xsmall }} />
            <Text style={[s.text.small, s.color.main]}>{I18n.t("qrCode")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: Spacing.h.large }} />

      <View
        style={{ flexDirection: "row", paddingHorizontal: Spacing.h.small }}
      >
        <TouchableOpacity
          onPress={() => {
            setWarning(true);
          }}
          style={{ flex: 1 }}
        >
          <NumberCard
            label={I18n.t("savedArticles")}
            number={0}
            style={{ flex: 1 }}
            labelStyle={[s.text.small, s.color.light, { textAlign: "center" }]}
            numberStyle={styles.numberCardNumber}
          />
        </TouchableOpacity>
        <View style={{ width: Spacing.h.large }} />

        <NumberCard
          label={I18n.t("exerciseStreaks")}
          number={SR}
          style={{ flex: 1 }}
          labelStyle={styles.numberCardLabel}
          numberStyle={styles.numberCardNumber}
        />
      </View>

      <View style={{ height: Spacing.h.large }} />

      <View style={{ ...styles.cardBackground, padding: Spacing.h.medium }}>
        <TouchableOpacity
          onPress={() => {
            setWarning(true);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[s.text.small, s.color.main]}>{I18n.t("badges")}</Text>
            {
              // TODO implement see all onPress
            }

            <Text style={[s.text.small, s.color.secondary]}>{`${I18n.t(
              "seeAll"
            )} >`}</Text>
          </View>

          <View style={{ height: Spacing.h.small }} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Badge1 />
            <Badge2 />
            <Badge3 />
            <Badge4 />
          </View>
        </TouchableOpacity>
      </View>

      <Popup
        visible={qrVisible}
        title={I18n.t("qrCode")}
        popupContent={<QRCode value={currentUser.uid} size={200} />}
        onDismiss={toggleQr}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardBackground: {
    width: "100%",
    backgroundColor: Color.background,
    borderRadius: 20,
  },
  numberCard: {
    backgroundColor: Color.secondary,
    borderRadius: 20,
    flex: 1,
    marginVertical: 24,
    marginHorizontal: 12,
  },
  numberCardLabel: {
    color: "white",
    fontSize: 20,
    fontFamily: "GoogleSans-Bold",
    textAlign: "center",
  },
  numberCardNumber: {
    color: Color.accent,
    fontSize: 50,
    fontFamily: "Oswald-SemiBold",
  },
  text: {
    fontSize: 20,
    color: Color.secondary,
    fontFamily: "GoogleSans-Bold",
  },
  badgesTitle: {
    fontSize: 25,
    fontFamily: "GoogleSans-Bold",
    color: Color.main,
  },
  profileContainer: {
    width: "100%",
    paddingHorizontal: Spacing.h.small,
    flexDirection: "row",
  },
});
