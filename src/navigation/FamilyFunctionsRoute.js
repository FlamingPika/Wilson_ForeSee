import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "./utils";
import s from "../styles/styles";

// Graph detail & add data
import GraphDetailScreen from "../screen/Graph/GraphDetailScreen";
import AddEyeData from "../screen/AddData/AddEyeData";
import AddGlassesData from "../screen/AddData/AddGlassesData";
import EditData from "../screen/AddData/EditData";
import EditSingleValue from "../screen/AddData/EditSingleValue";

// Eye exercise
import EyeExerciseDetailScreen from "../screen/EyeExercise/EyeExerciseDetailScreen";
import EyeExerciseHomeScreen from "../screen/EyeExercise/EyeExerciseHomeScreen";

// Profile
import ProfileScreen from "../screen/Profile/ProfileScreen";
import SavedArtileScreen from "../screen/Profile/SavedArticlesScreen";

// QnA
import TopicSelectScreen from "../screen/QnA/TopicSelectScreen";
import QnASearchScreen from "../screen/QnA/QnASearchScreen";
import QnADetailScreen from "../screen/QnA/QnADetailScreen";
import AskQuestionScreen from "../screen/QnA/AskQuestionScreen";

// Articles
import ArticleScreen from "../screen/Articles/ArticleScreen";
import ArticleDetailScreen from "../screen/Articles/ArticleDetailScreen";

const AddDataStack = createStackNavigator();

/**
 * This contains the screens for the functions in Family app.
 */
export const AddDataStackScreens = () => (
  <AddDataStack.Navigator
    screenOptions={({ navigation }) =>
      screenOptions(s.rowColor.accent, navigation)
    }
  >
    <AddDataStack.Screen name="GraphDetail" component={GraphDetailScreen} />
    <AddDataStack.Screen name="AddEyeData" component={AddEyeData} />
    <AddDataStack.Screen name="AddGlassesData" component={AddGlassesData} />
    <AddDataStack.Screen name="EditData" component={EditData} />
    <AddDataStack.Screen name="EditSingleValue" component={EditSingleValue} />
  </AddDataStack.Navigator>
);

const EyeExerciseStack = createStackNavigator();
export const eyeExerciseStackScreens = () => (
  <EyeExerciseStack.Navigator
    screenOptions={({ navigation }) =>
      screenOptions(s.rowColor.secondary, navigation)
    }
  >
    <EyeExerciseStack.Screen
      name="EyeExerciseHome"
      component={EyeExerciseHomeScreen}
    />
    <EyeExerciseStack.Screen
      name="EyeExerciseDetail"
      component={EyeExerciseDetailScreen}
    />
  </EyeExerciseStack.Navigator>
);

const ProfileStack = createStackNavigator();
export const profileStackScreens = () => (
  <ProfileStack.Navigator
    screenOptions={({ navigation }) =>
      screenOptions(s.rowColor.secondary, navigation)
    }
  >
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="SavedArticles" component={SavedArtileScreen} />
  </ProfileStack.Navigator>
);

const QnAStack = createStackNavigator();
export const QnAStackStackScreens = () => (
  <QnAStack.Navigator
    screenOptions={({ navigation }) =>
      screenOptions(s.rowColor.secondary, navigation)
    }
  >
    {/* <QnAStack.Screen name="TopicSelect" component={TopicSelectScreen} /> */}
    <QnAStack.Screen name="QnASearch" component={QnASearchScreen} />
    <QnAStack.Screen name="QnADetail" component={QnADetailScreen} />
    <QnAStack.Screen name="AskQuestion" component={AskQuestionScreen} />
  </QnAStack.Navigator>
);

const ArticleStack = createStackNavigator();
export const ArticleStackScreens = () => (
  <ArticleStack.Navigator
    screenOptions={({ navigation }) =>
      screenOptions(s.rowColor.secondary, navigation)
    }
  >
    <ArticleStack.Screen name="Article" component={ArticleScreen} />
    <ArticleStack.Screen
      name="ArticlesDetail"
      component={ArticleDetailScreen}
      options={{
        animationEnabled: false,
      }}
    />
  </ArticleStack.Navigator>
);
