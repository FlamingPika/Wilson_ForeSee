import I18n from "i18n-js";
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";
import { BarcodeMask } from "@nartc/react-native-barcode-mask";
import { QuestionButton, RoundRectangleButton } from "../../components/Buttons";
import { Color } from "../../constant/color";
import STYLES from "../../constant/styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { withOpacity } from "../../utils/utils";
import { optimizeHeavyScreen } from "react-navigation-heavy-screen";
// import { Profiles } from "../../sampledata/DummyData";
import { useState } from "react";
import Popup from "../../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { isQrScanned, storeScannedUID } from "../../redux/userSlice";
export default optimizeHeavyScreen(ScanCode, Loading, {
  transition: null,
});

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.main,
      }}
    >
      <ActivityIndicator size="large" color={Color.accent} />
    </View>
  );
}
// TODO restrict qr read area
// Tried using react-native-barcode-mask to bound read area within bounding box but failed

/**
 * Screen that allows the professional user to establish connection with a family user by scanning qr code
 */
export function ScanCode({ navigation }) {
  const dispatch = useDispatch();
  const [isBarcodeRead, setIsBarcodeRead] = useState(false); //set a if statement to stop it keep reading the qr code
  const [ScanSuccessVisible, setScanSuccessVisible] = useState(false);
  const toggleScannedPopup = () => setScanSuccessVisible(!ScanSuccessVisible);
  const [userUID, setuserUID] = useState("");
  // TODO data validation
  function onBarcodeRead(barcode) {
    setIsBarcodeRead(true);
    setTimeout(() => {
      toggleScannedPopup();
      //set a delay to aviod it pop up muitiple time
    }, 300);
    setuserUID(barcode.data);
    dispatch(isQrScanned(true));
    dispatch(storeScannedUID(barcode.data));
    console.log(userUID);
  }

  function confirmedPopup() {
    setScanSuccessVisible(!ScanSuccessVisible);
    navigation.navigate("SelectMember", {
      UID: userUID,
    });
  }

  // function onQuestion() {}

  // function onEnterManually() {}

  return (
    <View style={STYLES.view.container}>
      <Popup
        visible={ScanSuccessVisible}
        title="Scanned"
        popupContent={
          <RoundRectangleButton
            title="Accept"
            align="center"
            onPress={() => confirmedPopup()}
          />
        }
        onDismiss={() =>
          navigation.navigate("SelectMember", {
            UID: userUID,
          })
        }
      />
      <RNCamera
        onBarCodeRead={onBarcodeRead}
        captureAudio={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        barCodeTypes={isBarcodeRead ? [] : [RNCamera.Constants.BarCodeType.qr]}
      >
        <BarcodeMask
          width={wp(60)}
          height={wp(60)}
          backgroundColor="black"
          maskOpacity={0.5}
          showAnimatedLine={false}
          edgeWidth="25%"
          edgeHeight="25%"
          edgeBorderWidth={8}
          edgeRadius={20}
          edgeColor="white"
        />
      </RNCamera>

      {/* <QuestionButton
        onPress={onQuestion}
        color={Color.accent}
        containerStyle={{ alignSelf: "flex-end" }}
      /> */}
      <View style={{ flex: 1 }} />

      {/* <RoundedButton
        title={I18n.t("enterDataManually")}
        style={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={() =>
          navigation.replace("selectMember", { profile: Profiles[0] })
        }
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: withOpacity(Color.white, 0.8),
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  buttonTitle: {
    color: Color.main,
    fontSize: 25,
  },
});
