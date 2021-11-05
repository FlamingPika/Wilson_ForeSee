import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "./utils";
import s from "../styles/styles";

import FamilyHomeScreen from "../screen/Home/FamilyHomeScreen";

import {
  AddDataStackScreens,
  eyeExerciseStackScreens,
  profileStackScreens,
  QnAStackStackScreens,
  ArticleStackScreens,
} from "./FamilyFunctionsRoute";

const FamilyStack = createStackNavigator();
export default FamilyStackScreens = () => {
  return (
    <FamilyStack.Navigator screenOptions={{ headerShown: false }}>
      <FamilyStack.Screen
        name="FamilyHome"
        component={FamilyHomeScreen}
        options={({ navigation }) =>
          screenOptions(s.rowColor.accent, navigation, false)
        }
      />

      <FamilyStack.Screen name="AddDataStack" component={AddDataStackScreens} />

      <FamilyStack.Screen
        name="ExerciseStack"
        component={eyeExerciseStackScreens}
      />
      <FamilyStack.Screen name="ProfileStack" component={profileStackScreens} />

      <FamilyStack.Screen name="QnAStack" component={QnAStackStackScreens} />
      <FamilyStack.Screen name="ArticleStack" component={ArticleStackScreens} />
    </FamilyStack.Navigator>
  );
};
