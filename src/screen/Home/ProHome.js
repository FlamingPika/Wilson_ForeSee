import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Color } from "../../constant/color";
import STYLES from "../../constant/styles";
import { QuestionButton } from "../../components/Buttons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ScannerIcon from "../../assets/scanner_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar, Icon, Avatar } from "react-native-elements";
import { RoundedButton } from "../../components/Buttons";
import Popup from "../../components/Popup";
import DataListPopup from "../../screen/Graph/DataListPopup";
import I18n from "i18n-js";

import { proFetchMemberList } from "../../action/firebaseActions";
import { isQrScanned } from "../../redux/userSlice";
import moment from "moment";
import { useIsFocused } from "@react-navigation/core";
import { Alert } from "react-native";

/**
 * Home screen in the professional user mode
 */
export default function ProHome({ navigation, route }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState();
  const [memberData, setMemberData] = useState();
  const [visible, setVisible] = useState(false);
  const toggleVisible = (data) => {
    setMemberData(data);
    setVisible(!visible);
  };
  useEffect(() => {
    dispatch(isQrScanned(false));
    const load = async () => {
      setTimeout(async () => {
        let tempUserData = await proFetchMemberList();
        console.log("thisis", tempUserData);
        let tempUserArrayData = [];
        Object.keys(tempUserData).forEach((key) =>
          tempUserArrayData.push(tempUserData[key])
        );
        setUserData(tempUserArrayData);
        console.log("thisisis", tempUserArrayData);
      }, 500);
    };

    load();
  }, [isFocused]);

  function MemberList({ data, navigation }) {
    function renderItem({ item }) {
      let eyeArray = [];
      Object.keys(item.eyeDataHistory).forEach((key) =>
        eyeArray.push(item.eyeDataHistory[key])
      );
      console.log("testarray", eyeArray);
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 12,
          }}
          onPress={() => {
            toggleVisible(eyeArray);
          }}
        >
          <Avatar rounded title={item.name} />
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.profileName}>{item.name}</Text>
                <Text style={styles.profileText}>{item.birthYear}</Text>
              </View>
              <View style={{ width: 8 }} />
              <Text style={styles.profileText}>
                {moment(
                  item.eyeDataHistory[
                    Object.keys(item.eyeDataHistory ?? {}).reduce((a, b) =>
                      a > b ? a : b
                    )
                  ].checkDate
                ).format("YYYY/MM/DD")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.profileList}>
        <FlatList
          keyExtractor={(item) => item.name}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                width: "60%",
                backgroundColor: Color.background,
                opacity: 0.8,
                alignSelf: "center",
              }}
            />
          )}
        />
      </View>
    );
  }
  return (
    <View style={{ ...STYLES.view.container, backgroundColor: Color.main }}>
      <Popup
        visible={visible}
        popupContent={
          <DataListPopup
            dataHistoryArray={memberData}
            onEditData={() => {
              setVisible(false);
              navigation.navigate("AddDataStack", {
                screen: "EditData",
                params: { isCreate: false },
              });
            }}
            onAddData={() => {
              setVisible(false);
              navigation.navigate("AddDataStack", { screen: "AddEyeData" });
            }}
          />
        }
        onDismiss={() => {
          toggleVisible();
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...styles.title, flex: 1 }}>{I18n.t("PRO_hello")}</Text>
        <QuestionButton color={Color.accent} />
      </View>

      <TouchableOpacity
        style={styles.scanDataContainer}
        onPress={() => navigation.navigate("ScanCode")}
      >
        <ScannerIcon />
        <View style={{ width: 10 }} />
      <Text style={styles.scanDataText}>{I18n.t("PRO_scan")}</Text>
      </TouchableOpacity>

      <MemberList data={userData} navigation={navigation} />

      <Text style={styles.subtitle}>{I18n.t("PRO_utility")}</Text>

      <View style={{ flexDirection: "row" }}>
        <RoundedButton
          title={I18n.t("qna")}
          style={styles.navButton}
          titleStyle={styles.navButtonTitle}
          onPress={() => navigation.navigate("ProQNA")}
        />
        {/*
        <RoundedButton
          title={I18n.t("qna")}
          style={styles.navButton}
          titleStyle={styles.navButtonTitle}
        />
        
        {/* <RoundedButton
          title="test"
          style={styles.navButton}
          titleStyle={styles.navButtonTitle}
          onPress={() => navigation.navigate("SelectMember")}
        /> */}

        {/* <RoundedButton
          title="newFetchMemberList"
          style={styles.navButton}
          titleStyle={styles.navButtonTitle}
          onPress={() => console.log(aaaa)} //aproFetchMemberList
        /> */}
        {/* <RoundedButton
          title="proStoredMember"
          style={styles.navButton}
          titleStyle={styles.navButtonTitle}
          onPress={() => aproFetchMemberList()}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 35,
    color: "white",
  },
  subtitle: {
    fontSize: 25,
    alignSelf: "flex-start",
    marginVertical: 12,
    color: "white",
  },
  scanDataContainer: {
    backgroundColor: "white",
    height: hp(12),
    width: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    flexDirection: "row",
  },
  scanDataText: {
    color: Color.main,
    fontSize: 25,
  },
  profileList: {
    flex: 1,
    width: "100%",
    paddingLeft: 20,
  },
  profileName: {
    color: Color.accent,
    fontSize: 20,
  },
  profileText: {
    color: Color.background,
    fontSize: 15,
    letterSpacing: -1 / 3,
  },
  navButton: {
    borderRadius: 20,
    padding: 12,
    width: wp(30),
    backgroundColor: Color.secondary,
    marginHorizontal: 12,
  },
  navButtonTitle: {
    fontSize: 25,
    color: Color.white,
  },
});
