import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import { Text, Icon, ButtonGroup } from "react-native-elements";

import { useSelector } from "react-redux";

import I18n from "i18n-js";
import { ZoomGraph } from "../../components/Graph";
import BottomSheet from "../../components/BottomSheet";
import Popup from "../../components/Popup";
import DataListPopup from "./DataListPopup";
import AddDataSheetContent from "./AddDataSheetContent";

import s from "../../styles/styles";
import { Size, Spacing, hp, wp } from "../../styles/size";

import { getArrayOfRange, getDescription } from "../../action/firebaseActions";

export default function GraphDetailScreen({ navigation, route }) {
  const { data, selectedEyeProps } = route.params;
  const ButtonsChange = () => {
    if (I18n.locale == "SC") {
      return (
        ["左","右"]
      );
    } else if (I18n.locale == "TC") {
      return (
        ["左","右"]
      );
    } else {
      return (
        ["Left","Right"]
      );
    }
  };
  let buttons = ButtonsChange();

  const [selectedEye, setSelectedEye] = useState(selectedEyeProps || "L");
  const [seletedData, setSelectedData] = useState(
    data[selectedEye].datasets[0].data[0]
  );

  const { userEmail, currentMember } = useSelector((state) => state.user);

  // For display in the editdata and glasses
  const [eyeDataHistoryArray, setEyeDataHistoryArray] = useState([]);
  const [glassesDataHistoryArray, setGlassesDataHistoryArray] = useState([]);

  const [editDataPopupVisible, setEditDataPopupVisible] = useState(false);
  const [addDataSheetVisible, setAddDataSheetVisible] = useState(false);
  const [glassesPopupVisible, setGlassesPopupVisible] = useState(false);

  const toggleAddDataSheet = () => setAddDataSheetVisible(!addDataSheetVisible);
  const toggleGlassesPopup = () => setGlassesPopupVisible(!glassesPopupVisible);
  const toggleEditDataPopup = () =>
    setEditDataPopupVisible(!editDataPopupVisible);

  //-------------------find the interval of range difining how severe the problem is-------
  //done on 28/7/2021 for graph description by Alpha

  //data and variable for graph details description
  const [description, setDescription] = useState(I18n.t("ASKQUESTION_loading"));
  const userLanguage = useSelector((state) => state.settings.language);

  const getRangIn = (arrayFetched, name) => {
    let rangeIn = 0; // the range is set to 0 to assume not in range first,
    // this number refers to the doc number for firebase at
    // in depth report description > English > which contains the string

    if (name != "myopia") {
      //find range for problem other then myopia (as myopia range is -ve)
      // do a loop of the range interval from array fetched
      for (let index = 0; index < arrayFetched.length; index++) {
        if (seletedData > arrayFetched[index]) {
          console.log("array index", index, arrayFetched[index]);
          rangeIn += 1;
          //change the description number refer to the interval in
        }
      }
      return rangeIn;
    } else {
      // find range for myopia similar to above but from seletedData < arrayFetched[index] not ">"
      for (let index = 0; index < arrayFetched.length; index++) {
        if (seletedData < arrayFetched[index]) {
          console.log("array index", index, arrayFetched[index]);
          rangeIn += 1;
        }
      }
      console.log("after loop rangin", rangeIn);
      return rangeIn;
    }
  };
  // to convert language to correct string of doc on firebase
  const getLang = (userLanguage) => {
    console.log("getting lang", userLanguage);
    if (userLanguage === "EN") {
      return "English";
    } else if (userLanguage === "SC") {
      return "Simplified-Chinese";
    } else if (userLanguage === "TC") {
      return "Traditional-Chinese";
    }
  };

  //------------------------------------------------------------

  //---------------update description of selected data point----------
  //done on 28/7/2021 for graph description by Alpha

  useEffect(async () => {
    if (data[selectedEye].title == "Sample Data") {
      setDescription(I18n.t("GRAPH_sampleDataDescription"));
    }
    //get the array for the interval of problem
    let arrayFetched = await getArrayOfRange(data[selectedEye].title);
    //data[selectedEye].title refer to name of eye problem
    //getArrayOfRange from "../../action/firebaseActions"
    //to find the array of interval of corresponding prblem

    //usestate for changing the description
    setDescription(
      //getDescription from "../../action/firebaseActions"
      //to get the corresponding description of diff lvl of problem
      await getDescription(
        // for finding the collection in firebase
        data[selectedEye].title,

        // getRangIn is used to find the interval the data point is at
        getRangIn(arrayFetched, data[selectedEye].title),
        // get language name
        getLang(userLanguage)
      )
    );
  }, [seletedData, data[selectedEye].title]);
  // this useEffect only take effect when another
  //eye problem is chosen or the data point chosen is differnt

  //-----------------------------------------------------------------\

  //-------------To change eye title name without affecting variable name -----------
  //done on 12/8/2021 for eye title by Alpha

  //constant for the displayed title
  const [eyeProblemTitle, setEyeProblemTitle] = useState();
  //function to change the title to uppercase
  const changeEngTitleName = (inputTitle) => {
    //cases for change
    switch (inputTitle) {
      case "hyperopia":
        let GraphTitleHyperopia = "Hyperopia";
        return GraphTitleHyperopia;
        break;

      case "myopia":
        let GraphTitleMyopia = "Myopia";
        return GraphTitleMyopia;
        break;
      case "Astigmatism":
        let GraphTitleAstigmatism = "Astigmatism";
        return GraphTitleAstigmatism;
        break;
      case "Sample Data":
        return I18n.t("GRAPH_sampleData");
        break;
      default:
        console.log("eye problem title need not to change");
        return inputTitle;
    }
  };

  const changeOtherTitleName = (inputTitle) => {
    switch (inputTitle) {
      case "hyperopia":
        return I18n.t("GRAPH_hyperopia");
        break;

      case "myopia":
        return I18n.t("GRAPH_myopia");
        break;
      case "Astigmatism":
        return I18n.t("GRAPH_astigmatism");
        break;
      case "Sample Data":
        return I18n.t("GRAPH_sampleData");
        break;
      default:
        console.log("eye problem title need not to change");
        return inputTitle;
    }
  };
  //----------------------------------------------------

  //-------------To change eye title name without affecting variable name -----------
  //done on 12/8/2021 for changing the title by Alpha
  useEffect(() => {
    //check whether the language is english
    if (userLanguage == "EN") {
      setEyeProblemTitle(changeEngTitleName(data[selectedEye].title));
    } else {
      setEyeProblemTitle(changeOtherTitleName(data[selectedEye].title));
    }
  }, [data[selectedEye].title]);
  //------------------------------------------------------------------------

  useEffect(() => {
    console.log("userEmail is", userEmail);
    if (currentMember != undefined) {
      console.log("member name", currentMember.name);
      let eyeArray = [];
      let glassesArray = [];
      if (currentMember.eyeDataHistory != {}) {
        console.log(
          "member eyeDataHistory key are",
          Object.keys(currentMember.eyeDataHistory)
        );

        Object.keys(currentMember.eyeDataHistory).forEach((key) =>
          eyeArray.push(currentMember.eyeDataHistory[key])
        );
      } else console.log("member does not have eyeDataHistory");

      if (currentMember.glassesDataHistory != {}) {
        console.log(
          "member glassesDataHistory key are",
          Object.keys(currentMember.glassesDataHistory)
        );

        Object.keys(currentMember.glassesDataHistory).forEach((key) =>
          glassesArray.push(currentMember.glassesDataHistory[key])
        );
      } else console.log("member does not have glassesDataHistory");
      setEyeDataHistoryArray(eyeArray);
      setGlassesDataHistoryArray(glassesArray);
    } else console.log("current member is underfined");
  }, [currentMember]);

  return (
    <SafeAreaView
      style={[
        s.screen.normal,
        s.backgroundColor.main,
        { justifyContent: "space-between" },
      ]}
    >
      <Text
        style={[
          s.text.large,
          s.color.accent,
          s.text.googleSansBold,
          { alignSelf: "flex-start" },
        ]}
      >
        {eyeProblemTitle}
      </Text>

      <ButtonGroup
        onPress={(index) => setSelectedEye(index == 0 ? "L" : "R")}
        selectedIndex={selectedEye == "L" ? 0 : 1}
        buttons={buttons}
        containerStyle={localStyles.buttonGroupContainer}
        innerBorderStyle={{ width: 0 }}
        selectedButtonStyle={[s.backgroundColor.accent, { borderRadius: 18 }]}
        selectedTextStyle={[s.color.secondary]}
        textStyle={[s.text.medium, s.color.accent, s.text.googleSansMedium]}
      />

      <View
        style={{
          height: hp(36),
          width: wp(95),
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ZoomGraph
          data={data}
          showDots
          selectedEye={selectedEye}
          color={s.rowColor.chartBlue}
          setSelectedData={setSelectedData}
        />
      </View>

      <Text style={[s.text.xxxlarge, s.color.accent, s.text.googleSansMedium]}>
        {seletedData}
      </Text>
      <Text style={[s.text.small, s.color.light, s.text.googleSansMedium]}>
        {description}
      </Text>

      <View style={localStyles.horizontalButtonContainer}>
        <TouchableOpacity
          style={localStyles.actionButton}
          onPress={toggleEditDataPopup}
        >
          <Icon
            name="pen"
            type="font-awesome-5"
            iconStyle={{
              color: "white",
              marginVertical: hp(1.5),
            }}
          />
          <Text style={[s.text.small, s.color.light, s.text.googleSansRegular]}>
            {I18n.t("DETAIL_editData")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={localStyles.actionButton}
          onPress={toggleAddDataSheet}
        >
          <Icon
            name="plus"
            type="font-awesome-5"
            iconStyle={{
              color: "white",
              marginVertical: hp(1.5),
            }}
          />
          <Text style={[s.text.small, s.color.light, s.text.googleSansRegular]}>
            {I18n.t("DETAIL_addData")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={localStyles.actionButton}
          onPress={toggleGlassesPopup}
        >
          <Icon
            name="glasses"
            type="font-awesome-5"
            iconStyle={{
              color: "white",
              marginVertical: hp(1.5),
            }}
          />
          <Text style={[s.text.small, s.color.light, s.text.googleSansRegular]}>
            {I18n.t("DETAIL_glasses")}
          </Text>
        </TouchableOpacity>
      </View>

      <Popup
        visible={editDataPopupVisible}
        popupContent={
          <DataListPopup
            dataHistoryArray={eyeDataHistoryArray}
            onEditData={() => {
              toggleEditDataPopup();
              navigation.navigate("EditData", { isCreate: false });
            }}
            onAddData={() => {
              toggleEditDataPopup();
              navigation.navigate("AddEyeData", { isCreate: true });
            }}
          />
        }
        onDismiss={toggleEditDataPopup}
      />

      <BottomSheet
        visible={addDataSheetVisible}
        title={I18n.t("addData")}
        sheetContent={
          <AddDataSheetContent
            onConfirm={() => {
              toggleAddDataSheet();
              navigation.navigate("AddEyeData");
            }}
            onDismiss={toggleAddDataSheet}
          />
        }
        onDismiss={toggleAddDataSheet}
      />

      <Popup
        visible={glassesPopupVisible}
        popupContent={
          <DataListPopup
            dataHistoryArray={glassesDataHistoryArray}
            onEditData={() => {
              toggleGlassesPopup();
              navigation.navigate("EditData", { isCreate: false });
            }}
            onAddData={() => {
              toggleGlassesPopup();
              navigation.navigate("AddGlassesData");
            }}
          />
        }
        onDismiss={toggleGlassesPopup}
      />
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  buttonGroupContainer: {
    borderWidth: 0,
    marginTop: Spacing.h.medium,
    borderRadius: 20,
    width: wp(50),
    padding: Spacing.h.xxxsmall,
    backgroundColor: s.rowColor.secondary,
  },
  horizontalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: hp(5),
  },
  overlayContainer: {
    height: hp(80),
    width: wp(80),
    borderRadius: 20,
  },
  listButtonStyle: {
    height: hp(10),
    borderRadius: 20,
    backgroundColor: s.rowColor.background,
    marginHorizontal: wp(2),
    marginVertical: hp(3),
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {
    width: wp(26),
    alignItems: "center",
  },
});
