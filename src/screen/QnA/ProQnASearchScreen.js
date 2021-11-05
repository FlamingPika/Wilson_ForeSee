import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, Button, Divider } from "react-native-elements";

import { fetchAuthQuestion } from "../../action/firebaseActions";
import { useIsFocused } from "@react-navigation/native";

import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing, hp, wp } from "../../styles/size";
import I18n from "i18n-js";
/**
 * Shows a list of answered question
 */
export default function ProQnASeachScreen({ navigation }) {
  // set all list from local storage redux
  const [dynamicQnAList, setDynamicQnAList] = useState([]);
  const isFocused = useIsFocused();
  function onSelect(data) {
    setDynamicQnAList(data);
    console.log(dynamicQnAList, "ok");
  }
  //-------------------fetch and manipulate data for QnA--------------------------
  //Updated on 21-08-2021 by Alpha

  //const the check whether the list is loaded
  const [loading, setloading] = useState(true);
  const [ifEmpty, setIfEmpty] = useState(false);

  //function to load the list from collection
  const loadFirebaseQnA = async () => {
    const tempList = await fetchAuthQuestion(); //changed to fetchAnsweredQnA()
    console.log("set list");
    setDynamicQnAList(tempList);
  };
  //to confirm the list is empty and stop loading
  const setListEmptyNLoading = () => {
    setIfEmpty(true);
    setloading(false);
  };
  //to ensure the data are defined to prevent error of undefined
  useEffect(() => {
    if (dynamicQnAList == null || dynamicQnAList == undefined) {
      console.log("data of list", dynamicQnAList);
      setloading(true);
      return loadFirebaseQnA();
    } else {
      if (dynamicQnAList == "empty") {
        console.log("data of list is empty");
        return setListEmptyNLoading();
      } else {
        if (dynamicQnAList[0] == null || dynamicQnAList[0] == undefined) {
          console.log("data", dynamicQnAList[0]);
          setloading(true);
          return loadFirebaseQnA();
        } else {
          if (
            dynamicQnAList[0].QnA == null ||
            dynamicQnAList[0].QnA == undefined
          ) {
            console.log("data", dynamicQnAList[0].QnA);
            setloading(true);
            return loadFirebaseQnA();
          } else {
            setloading(false);
          }
        }
      }
    }
  }, [dynamicQnAList]);
  //-------------------------------------------------------------------

  return (
    <SafeAreaView style={[s.screen.normal, s.backgroundColor.light]}>
      <View style={{ height: "100%", width: wp(80) }}>
        <Text style={[s.text.large, s.color.main, s.text.googleSansBold]}>
          {I18n.t("ASKQUESTION_questionTBA")}
        </Text>

        <Divider style={{ marginVertical: Spacing.h.xxsmall }} />

        <View>
          {loading ? (
            <Text
              style={[
                s.text.xxlarge,
                s.color.main,
                s.text.googleSansBold,
                { paddingVertical: hp(15), textAlign: "center" },
              ]}
            >
              {I18n.t("ASKQUESTION_loading")}
            </Text>
          ) : (
            <View>
              {ifEmpty ? (
                <Text
                  style={[
                    s.text.xlarge,
                    s.color.main,
                    s.text.googleSansBold,
                    { paddingVertical: hp(15), textAlign: "center" },
                  ]}
                >
                  {I18n.t("ASKQUESTION_empty")}
                </Text>
              ) : (
                <FlatList
                  data={dynamicQnAList}
                  renderItem={({ item }) => {
                    return (
                      <View style={localStyles.questionStyle}>
                        <TouchableOpacity
                          style={{ paddingVertical: Spacing.h.xxsmall }}
                          onPress={() => {
                            console.log(dynamicQnAList);
                            navigation.navigate("ProQNADetails", {
                              QnA: item,
                              setList: onSelect,
                            });
                            console.log(dynamicQnAList);
                            setDynamicQnAList(undefined);
                            console.log(dynamicQnAList);
                          }}
                        >
                          <Text
                            style={[
                              s.text.medium,
                              s.color.main,
                              s.text.googleSansBold,
                              { marginVertical: hp(2) },
                            ]}
                          >
                            {item.QnA.questionTitle}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={(item) => item.QnA.questionTitle}
                  contentContainerStyle={{
                    alignItems: "center",
                  }}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  questionStyle: {
    backgroundColor: s.rowColor.background,
    borderRadius: 20,
    marginVertical: Spacing.h.xxsmall,
    padding: Spacing.h.small,
    width: wp(80),
  },
});
