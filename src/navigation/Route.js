import I18n from "i18n-js";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import SelectUserMode from "../screen/Signin/SelectUserMode";
import TutorialScreen from "../screen/Tutorial/TutorialScreen";
import SettingsRoute from "./SettingsRoute";
import DrawerContent from "./DrawerContent";
import DrawerContentPro from "./DrawerContentPro";
import ProStackScreens from "./ProRoute";

import FamilyStackScreens from "./FamilyRoute";
import CreateProfileScreen from "../screen/Landing/CreateProfileScreen";

import LaunchSplashScreen from "../screen/Splash/LaunchSplashScreen";
import FamilySigninSplashScreen from "../screen/Splash/FamilySigninSplashScreen";
import { SigninStackScreens, LandingStackScreens } from "./LandingRoute";

import auth from "@react-native-firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { reset, setIsPro } from "../redux/userSlice";
import { AddDataStackScreens } from "./FamilyFunctionsRoute";

/**
 *  Drawer navigator containing screens/child navigator in the main drawer
 *  wrapping the stack MainStack so screens within MainStack could access the drawer
 */

const FamilyRouteDrawer = createDrawerNavigator();
const FamilyRouteDrawerScreens = ({ navigation }) => (
  <FamilyRouteDrawer.Navigator
    drawerPosition="right"
    drawerContent={(props) => (
      <DrawerContent {...props} filters={["MainStack"]} />
    )}
    drawerType={"front"}
    backBehavior={"initialRoute"}
    initialRouteName="MainStack"
    drawerStyle={styles.drawerContainer}
    screenOptions={{
      swipeEnabled: false,
    }}
  >
    <FamilyRouteDrawer.Screen name="MainStack" component={FamilyStackScreens} />
    <FamilyRouteDrawer.Screen
      name="Settings"
      component={SettingsRoute}
      options={{ title: I18n.t("settings") }}
    />
    {/* <FamilyRouteDrawer.Screen
      name="Tutorial"
      component={TutorialScreen}
      options={{ title: I18n.t("tutorial") }}
    /> */}
  </FamilyRouteDrawer.Navigator>
);

const ProRouteDrawer = createDrawerNavigator();
const ProRouteDrawerScreens = ({ navigation }) => (
  <ProRouteDrawer.Navigator
    drawerPosition="right"
    drawerContent={(props) => (
      <DrawerContentPro {...props} filters={["ProStack"]} />
    )}
    drawerType={"front"}
    backBehavior={"initialRoute"}
    initialRouteName="ProStack"
    drawerStyle={styles.drawerContainer}
    screenOptions={{
      swipeEnabled: false,
    }}
  >
    <ProRouteDrawer.Screen name="ProStack" component={ProStackScreens} />
    <ProRouteDrawer.Screen
      name="Settings"
      component={SettingsRoute}
      options={{ title: I18n.t("settings") }}
    />
  </ProRouteDrawer.Navigator>
);

/**
 *  The root level navigator of the app
 */
const Stack = createStackNavigator();

export default Route = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { isFamilyUser } = useSelector((state) => state.settings);

  const { isPro } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user != null) {
        user.getIdTokenResult().then((result) => {
          dispatch(
            setIsPro(
              result.claims.pro != undefined && result.claims.pro != false
            )
          );
        });
        setIsSignedIn(true);
      } else {
        dispatch(reset());
        setIsSignedIn(false);
      }
    });

    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
      >
        {isSignedIn ? (
          isPro ? (
            <>
              <Stack.Screen name="SelectUserMode" component={SelectUserMode} />
              <Stack.Screen
                name="ProDrawer"
                component={ProRouteDrawerScreens}
              />
              <Stack.Screen
                name="AddDataStack"
                component={AddDataStackScreens}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="FamilySigninSplash"
                component={FamilySigninSplashScreen}
              />
              <Stack.Screen
                name="FamilyDrawer"
                component={FamilyRouteDrawerScreens}
              />
              <Stack.Screen
                name="CreateProfile"
                component={CreateProfileScreen}
              />
            </>
          )
        ) : (
          <>
            <Stack.Screen name="LaunchSplash" component={LaunchSplashScreen} />
            <Stack.Screen name="LandingStack" component={LandingStackScreens} />
            <Stack.Screen name="SigninStack" component={SigninStackScreens} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    width: "100%",
    backgroundColor: "transparent",
  },
});
