import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color } from "../../constant/color";
import STYLES from "../../constant/styles";
import { QuestionButton, RoundedButton } from "../../components/Buttons";
import { FlatList } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import I18n from "i18n-js";
import { withOpacity } from "../../utils/utils";
import { fetchMemberList } from "../../action/firebaseActions";
import { useDispatch, useSelector } from "react-redux";
import {
  storeScannedMemberName,
  setMemberList,
  setCurrentMember,
} from "../../redux/userSlice";

import DataListPopup from "../../screen/Graph/DataListPopup";
import Popup from "../../components/Popup";

export default function SelectMember({ navigation, route }) {
  const dispatch = useDispatch();
  const { UID } = route.params;
  const { memberList } = useSelector((state) => state.user);
  const [userData, setUserData] = useState();
  const [memberEyeData, setMemberEyeData] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      const userdata = await fetchMemberList(UID);
      dispatch(setMemberList(userdata));
      let tempUserArrayData = [];
      Object.keys(userdata).forEach((key) =>
        tempUserArrayData.push(userdata[key])
      );
      console.log("select member array", tempUserArrayData);
      setUserData(tempUserArrayData);
    };
    load();
  }, []);

  function onAddMember() {
    console.debug("onAddMember");
  }

  function RenderMember({ item }) {
    return (
      <RoundedButton
        title={item.name}
        style={styles.nonSelectedButton}
        titleStyle={styles.nonSelectedButtonTitle}
        onPress={() => {
          RenderMemberEyeArray({ item });
        }}
      />
    );
  }
  function RenderMemberEyeArray({ item }) {
    let eyeArray = [];
    Object.keys(item.eyeDataHistory).forEach((key) =>
      eyeArray.push(item.eyeDataHistory[key])
    );
    console.log(eyeArray);
    setVisible(!visible);
    setMemberEyeData(eyeArray);
    dispatch(storeScannedMemberName(item.name));
    dispatch(setCurrentMember(memberList[item.name]));
  }

  return (
    <View style={{ ...STYLES.view.container, backgroundColor: Color.main }}>
      <Popup
        visible={visible}
        popupContent={
          <DataListPopup
            dataHistoryArray={memberEyeData}
            onEditData={() => {
              setVisible(false);
              navigation.navigate("AddDataStack", {
                screen: "EditData",
                params: { isCreate: false, UID: UID },
              });
            }}
            onAddData={() => {
              setVisible(false);
              navigation.navigate("AddDataStack", {
                screen: "AddEyeData",
                params: { UID: UID },
              });
            }}
          />
        }
        onDismiss={() => {
          setVisible(false);
        }}
      />
      {/* <QuestionButton
        onPress={onQuestion}
        color={Color.accent}
        containerStyle={{ alignSelf: "flex-end" }}
      />
      <Text style={styles.title}>{profile?.name}</Text> */}

      <View style={{ flex: 1, justifyContent: "center", width: wp(60) }}>
        <FlatList
          data={userData}
          style={{
            flexGrow: 0,
            maxHeight: hp(30),
          }}
          renderItem={RenderMember}
          keyExtractor={(item, index) => index.toString()}
        />
        <RoundedButton
          title={`+ ${I18n.t("addMember")}`}
          style={{ ...styles.button, ...styles.addMemberButton }}
          titleStyle={styles.addMemberTitle}
          onPress={onAddMember}
        />
      </View>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  button: {
    borderRadius: 40,
    width: "100%",
    padding: 12,
    marginVertical: 8,
  },
  buttonTitle: {
    fontSize: 20,
  },
});

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    color: "white",
  },
  nonSelectedButton: {
    ...baseStyles.button,
    backgroundColor: Color.background,
  },
  nonSelectedButtonTitle: {
    ...baseStyles.buttonTitle,
    color: Color.secondary,
  },
  selectedButton: {
    ...baseStyles.button,
    backgroundColor: Color.main,
  },
  selectedButtonTitle: {
    ...baseStyles.buttontitle,
    color: Color.accent,
  },
  addMemberButton: {
    ...baseStyles.button,
    backgroundColor: withOpacity(Color.background, 0.5),
  },
  addMemberTitle: {
    ...baseStyles.buttontitle,
    color: Color.white,
  },
});
