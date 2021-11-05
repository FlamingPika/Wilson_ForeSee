import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, Button, Divider } from "react-native-elements";

import { useSelector } from "react-redux";
//import { resetQuestionList } from "../../redux/QnASlice";

import { fetchAnsweredQnA } from "../../action/firebaseActions";

import SearchBar from "../../components/SearchBar";
import { tagList } from "../../constant/QnATrack";
import {
  FilterButtonListHooks,
  TagHorizontalList,
} from "../../components/useFilterButtons";

import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing, hp, wp } from "../../styles/size";
import { useIsFocused } from "@react-navigation/core";
import I18n from "i18n-js";
/**
 * Shows a list of answered question
 */
export default function QnASeachScreen({ navigation, route }) {
  const { selectedTag } = "All";
  const { FilterButtonList, tagFilters } = FilterButtonListHooks({
    tagList,
    selectedTag,
  });
  const reduxQnAList = useSelector((state) => state.QnA);

  // set all list from local storage redux
  const [allQnAList, setAllQnAList] = useState([]);
  const [dynamicQnAList, setDynamicQnAList] = useState([]);
  function onSelect() {
    setDynamicQnAList([]);
    setAllQnAList([]);
    setloading(true);
    console.log(dynamicQnAList, "ok");
  }
  //-------------------fetch and manipulate data for QnA--------------------------
  //Updated on 21-08-2021 by Alpha

  //const the check whether the list is loaded
  const [loading, setloading] = useState(true);
  const [ifEmpty, setIfEmpty] = useState(false);

  //to confirm the list is empty and finish loading
  const setListEmptyNLoading = () => {
    setIfEmpty(true);
    setloading(false);
  };
  const isFocused = useIsFocused();
  //function to load the list from collection
  const loadFirebaseQnA = async () => {
    const tempList = await fetchAnsweredQnA(); //changed to fetchAnsweredQnA()
    console.log("setting list");
    setAllQnAList(tempList);
    setDynamicQnAList(tempList);
    updateSearchResultByFilters(tagFilters);
  };
  //to ensure the data are defined to prevent error of undefined
  useEffect(() => {
    console.log("determine whether loading ends");
    if (loading == true) {
      if (dynamicQnAList == undefined || dynamicQnAList == null) {
        setloading(true);
        return loadFirebaseQnA();
      } else {
        if (dynamicQnAList == "empty") {
          console.log("data of list is empty");
          return setListEmptyNLoading();
        } else {
          if (dynamicQnAList[0] == undefined || dynamicQnAList[0] == null) {
            setloading(true);
            return loadFirebaseQnA();
          } else {
            if (
              dynamicQnAList[0].QnA == undefined ||
              dynamicQnAList[0].QnA == null
            ) {
              setloading(true);
              return loadFirebaseQnA();
            } else {
              setIfEmpty(false);
              return setloading(false);
            }
          }
        }
      }
    }
  }, [dynamicQnAList]);
  //-------------------------------------------------------------------

  useEffect(() => {
    // When the selected filters changed, update the list.
    if (loading == true) {
      return;
    }
    if (dynamicQnAList == undefined || dynamicQnAList == null) {
      //to prevent undefined data loaded
      return;
    } else {
      updateSearchResultByFilters(tagFilters);
    }
  }, [tagFilters]);

  const updateSearchResultByFilters = (newtagFilters) => {
    let newQnAList = [];
    console.log("update tags");
    // If we comparing two one element list, they will not equal, we must downgrade them to two string
    if (
      allQnAList == undefined ||
      allQnAList == null ||
      allQnAList[0] == null
    ) {
      //to prevent undefined data loaded
      return;
    }
    if (newtagFilters[0] === tagList.title[0]) newQnAList = allQnAList;
    else {
      allQnAList.forEach((question) => {
        let add = false;
        if (question.tags == undefined) {
          //if the tag is undefined use another method for the object
          question.QnA.tags.forEach((tag) => {
            if (newtagFilters.indexOf(tag) != -1) add = true;
          });
        } else {
          question.tags.forEach((tag) => {
            if (newtagFilters.indexOf(tag) != -1) add = true;
          });
        }

        if (add) newQnAList.push(question);
      });
    }
    if (newQnAList[0] == null) {
      setDynamicQnAList("empty");
      setIfEmpty(true);
    } else {
      setDynamicQnAList(newQnAList);
      setIfEmpty(false);
    }
  };

  return (
    <SafeAreaView style={[s.screen.normal, s.backgroundColor.light]}>
      <View style={{ height: "100%", width: wp(80) }}>
        <Text style={[s.text.large, s.color.main, s.text.googleSansBold]}>
          {I18n.t("QNA")}
        </Text>

        {/* <SearchBar
          onSubmit={(query) => {
            console.log("on submit pressed", query);
          }}
        /> */}

        <Text style={[s.text.small, s.color.main, s.text.googleSansBold]}>
          {I18n.t("ASKQUESTION_tags")}
        </Text>

        <View>
          <FilterButtonList />
        </View>

        <Divider style={{ marginVertical: Spacing.h.xxsmall }} />

        <View style={{ marginBottom: 200 }}>
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
                        <TagHorizontalList tagList={tagList} tags={item.tags} />
                        <TouchableOpacity
                          style={{ paddingVertical: Spacing.h.xxsmall }}
                          onPress={() => {
                            navigation.navigate("QnADetail", { QnA: item });
                          }}
                        >
                          <Text
                            style={[
                              s.text.medium,
                              s.color.main,
                              s.text.googleSansMedium,
                            ]}
                          >
                            {item.QnA.questionTitle}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={(item) => item.questionTitle}
                  contentContainerStyle={{
                    alignItems: "center",
                  }}
                />
              )}
            </View>
          )}
        </View>

        <Button
          containerStyle={{
            position: "absolute",
            bottom: Size.h.xsmall,
            width: scale(200),
            borderRadius: 10,
            alignSelf: "center",
          }}
          buttonStyle={[s.backgroundColor.accent, { height: Size.h.large }]}
          titleStyle={[
            s.text.small,
            s.color.secondary,
            s.text.googleSansMedium,
          ]}
          title={I18n.t("QNA_askQuestion")}
          onPress={() => {
            navigation.navigate("AskQuestion", { setList: onSelect });
          }}
        />
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
