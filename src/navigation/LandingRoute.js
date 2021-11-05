import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//
import SelectUserMode from "../screen/Signin/SelectUserMode";
import SigninScreen from "../screen/Signin/SigninScreen";

// Launch Once
import SelectLang from "../screen/Landing/SelectLang";
import LandingScreen from "../screen/Landing/LandingScreen";

const SigninStack = createStackNavigator();
export const SigninStackScreens = () => (
  <SigninStack.Navigator screenOptions={{ headerShown: false }}>
    <SigninStack.Screen name="Signin" component={SigninScreen} />
    <SigninStack.Screen name="SelectUserMode" component={SelectUserMode} />
  </SigninStack.Navigator>
);

/**
 * Stack navigator containing screens in the Landing route
 */
const LandingStack = createStackNavigator();
export const LandingStackScreens = () => (
  <LandingStack.Navigator screenOptions={{ headerShown: false }}>
    <LandingStack.Screen name="SelectLang" component={SelectLang} />
    <LandingStack.Screen name="Landing" component={LandingScreen} />
  </LandingStack.Navigator>
);
