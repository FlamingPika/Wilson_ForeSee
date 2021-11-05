import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "./utils";
import { Color } from "../constant/color";

import ProHome from "../screen/Home/ProHome";
import PatientDetails from "../screen/AddData/PatientDetails";
import ScanCode from "../screen/AddData/ScanCode";
import SelectMember from "../screen/AddData/SelectMember";
import ProQnASeachScreen from "../screen/QnA/ProQnASearchScreen";
import ProQnADetailScreen from "../screen/QnA/ProQnADetailScreen";
const ProStack = createStackNavigator();

/**
 * Stack navigator containing screens in the ProfessionalHome route
 */

export default function ProStackScreens() {
  return (
    <ProStack.Navigator
      screenOptions={({ navigation }) =>
        screenOptions(Color.secondary, navigation)
      }
    >
      <ProStack.Screen name="Home" component={ProHome} />
      <ProStack.Screen name="PatientDetails" component={PatientDetails} />
      <ProStack.Screen name="ScanCode" component={ScanCode} />
      <ProStack.Screen name="SelectMember" component={SelectMember} />
      <ProStack.Screen name="ProQNA" component={ProQnASeachScreen} />
      <ProStack.Screen name="ProQNADetails" component={ProQnADetailScreen} />
    </ProStack.Navigator>
  );
}
