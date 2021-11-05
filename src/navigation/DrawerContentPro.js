import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from "@react-navigation/native";
import I18n from "i18n-js";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "../components/BottomSheet";
import { RoundedButton, RoundRectangleButton } from "../components/Buttons";
import { Color } from "../constant/color";
import Popup from "../components/Popup";
import { setCurrentMember, reset } from "../redux/userSlice";
import { hp, Size, Spacing, wp } from "../styles/size";
import s from "../styles/styles";
import QRCode from "react-native-qrcode-svg";
import auth from "@react-native-firebase/auth";

/**
 * Drawer content displayed in the main drawer
 */
export default function DrawerContent(props) {
  const items = DrawerItems(props);
  const dispatch = useDispatch();

  async function onLogout() {
    try {
      await auth().signOut();
      // clean up user states in store
      dispatch(reset());
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  // prepare drawer items
  const LogOutItem = <LogOut key="logOut" onPress={onLogout} />;

  // insert the drawer items into the list

  items.splice(1, 0, LogOutItem);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => props.navigation.closeDrawer()}
      />
      <View
        style={{
          width: "50%",
          alignSelf: "flex-end",
          backgroundColor: Color.secondary,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: 20,
            paddingRight: 20,
          }}
        >
          <Icon
            size={25}
            name="x"
            type="octicon"
            iconStyle={{ color: Color.accent }}
            Component={TouchableOpacity}
            onPress={() => props.navigation.closeDrawer()}
          />
        </View>

        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.drawer}
        >
          <View style={{ flex: 1 }}>{items}</View>
          <Text style={[s.text.small, s.color.accent, { alignSelf: "center" }]}>
            Foresee 2020 2.0
          </Text>
        </DrawerContentScrollView>
      </View>
    </SafeAreaView>
  );
}

/**  ugly fix for rendering drawer items

    - we need to hide the drawer item of route "MainStack".
    Currently in react-navigation 5.x. DrawerItemList doesn't support
    hiding a particular item in the drawer. So need to iterate through all
    the items, remove the items to be hidden, and draw the remaining one-by-one.

    - also need to insert (not append) additional drawerItems to the drawer
    so can't use DrawerItemList
*/
function DrawerItems(props) {
  const state = props.state;
  const descriptors = props.descriptors;
  const buildLink = useLinkBuilder();
  const navigation = props.navigation;
  const filters = props.filters;

  // iterate through all route items
  return state.routes.map((route, i) => {
    if (filters.includes(route.name)) return;
    const focused = i === state.index;
    const { title, drawerLabel, drawerIcon } = descriptors[route.key].options;

    return (
      <DrawerItem
        key={route.key}
        label={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : route.name
        }
        focused={focused}
        activeTintColor="transparent"
        inactiveTintColor="transparent"
        labelStyle={styles.label}
        to={buildLink(route.name, route.params)}
        onPress={() => {
          navigation.dispatch({
            ...(focused
              ? DrawerActions.closeDrawer()
              : CommonActions.navigate(route.name)),
            target: state.key,
          });
        }}
      />
    );
  });
}

// drawer items
function QrCode({ onPress }) {
  return (
    <DrawerItem
      label={I18n.t("qrCode")}
      activeTintColor="transparent"
      inactiveTintColor="transparent"
      labelStyle={styles.label}
      onPress={onPress}
    />
  );
}

function SwitchAccount({ onPress }) {
  return (
    <DrawerItem
      label={I18n.t("switchAccount")}
      activeTintColor="transparent"
      inactiveTintColor="transparent"
      labelStyle={styles.label}
      onPress={onPress}
    />
  );
}

function LogOut({ onPress }) {
  return (
    <DrawerItem
      label={I18n.t("logOut")}
      activeTintColor="transparent"
      inactiveTintColor="transparent"
      labelStyle={styles.label}
      onPress={onPress}
    />
  );
}

/**
 * Content of Switch account dialog that is shown when switch account is selected
 */
function SwitchAccountSheetContent({ navigation, dismiss }) {
  const { currentUser, currentMember, memberList } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  return (
    <ScrollView
      style={{
        maxHeight: hp(50),
        width: "100%",
      }}
      contentContainerStyle={{
        paddingHorizontal: "15%",
      }}
    >
      {Object.keys(memberList)?.map((k, index) => (
        <RoundRectangleButton
          key={memberList[k].name}
          title={memberList[k].name}
          containerStyle={{
            width: "100%",
          }}
          buttonStyle={{
            paddingVertical: Spacing.v.small,
            backgroundColor:
              currentMember.name === memberList[k].name
                ? Color.main
                : Color.background,
          }}
          titleStyle={{
            color:
              currentMember.name === memberList[k].name
                ? Color.accent
                : Color.secondary,
          }}
          onPress={async () => {
            dispatch(setCurrentMember(memberList[k]));
          }}
        />
      ))}

      {/* TODO add new member button */}
      <RoundRectangleButton
        title="+ New Member"
        containerStyle={{ width: "100%", marginVertical: 0 }}
        onPress={() => {
          dismiss();
          navigation.closeDrawer();
          navigation.navigate("CreateProfile");
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  drawer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: hp(4),
  },
  fontsColor: {
    color: Color.accent,
  },
  appInfoLabel: {
    fontWeight: "bold",
    fontSize: wp(4.5),
    textAlign: "center",
  },
  label: {
    ...s.text.small,
    textAlign: "center",
    color: Color.accent,
    marginRight: -32, // The parent of labels has marginRight:32 by default. this is to compensate the offset
  },
  accountButton: {
    width: "100%",
    padding: 12,
    borderRadius: 40,
  },
});

/*

<RoundedButton
        title={"+ new member"}
        style={{
          borderRadius: Size.h.medium,
        }}
        titleStyle={{}}
        onPress={() => console.log("press")}
      />
*/
