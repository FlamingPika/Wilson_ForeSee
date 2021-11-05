import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Setting stack
import SettingsScreen from "../screen/Settings/SettingsScreen";
import AccountScreen from "../screen/Settings/AccountScreen";
import DocDetailScreen from "../screen/Settings/DocDetailScreen";
import TermsOfUseScreen from "../screen/Settings/TermsOfUseScreen.js";
import CreditsScreen from "../screen/Settings/CreditsScreen.js";
import AboutUsScreen from "../screen/Settings/AboutUsScreen.js"
import s from "../styles/styles";
import { screenOptions } from "./utils";

const Stack = createStackNavigator();

/**
 * Stack navigator containing screens in the Settings route
 */
export default SettingsRoute = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) =>
      screenOptions(s.rowColor.secondary, navigation)
    }
  >
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
    <Stack.Screen name="Credits" component={CreditsScreen} />
    <Stack.Screen name="DocDetail" component={DocDetailScreen} />
    <Stack.Screen name="AboutUs" component={AboutUsScreen} />
  </Stack.Navigator>
);
