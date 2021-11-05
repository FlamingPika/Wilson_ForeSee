import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  TextInput,
} from "react-native";

import { Text } from "react-native-elements";

// Database
import { addQuestion } from "../../action/firebaseActions";

// Constants
import { tagList } from "../../constant/QnATrack";

// Custom Components
import Popup from "../../components/Popup";
import { RoundRectangleButton } from "../../components/Buttons";
import {
  FilterButtonListHooks,
  TagHorizontalList,
} from "../../components/useFilterButtons";

import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing } from "../../styles/size";
import I18n from "i18n-js";

/**
 * Screen that allow the family user to create a question
 */
export default function AskQuestionScreen({ navigation, route }) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const { FilterButtonList, tagFilters } = FilterButtonListHooks(
    {tagList},
  );
  const {setList} = route.params;
  /*
  useEffect(()=>{
    console.log({tagList});
    console.log(tagList.title[0])
  });
  */
  const [visible, setVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(incompleteContent);

  const incompleteContent = (
    <Text style={[s.text.small, s.color.secondary, s.text.googleSansMedium]}>
      {I18n.t("ASKQUESTION_incompleteContent")}
    </Text>
  );

  const confirmContent = (
    <>
      <Text style={[s.text.small, s.color.main, s.text.googleSansMedium]}>
        {I18n.t("ASKQUESTION_title")}
      </Text>
      <Text
        style={[
          s.text.small,
          s.color.secondary,
          s.text.googleSansRegular,
          { marginVertical: Spacing.h.xsmall },
        ]}
      >
        {questionTitle}
      </Text>
      <Text style={[s.text.small, s.color.main, s.text.googleSansMedium]}>
        {I18n.t("ASKQUESTION_content")}
      </Text>
      <Text
        style={[
          s.text.small,
          s.color.secondary,
          s.text.googleSansRegular,
          { marginVertical: Spacing.h.xsmall },
        ]}
      >
        {questionContent}
      </Text>
      <Text style={[s.text.small, s.color.main, s.text.googleSansMedium]}>
        {I18n.t("ASKQUESTION_tags")}
      </Text>
      <View style={{ marginVertical: Spacing.h.xsmall }}>
        <TagHorizontalList tagList={tagList} tags={tagFilters} />
      </View>

      <RoundRectangleButton
        title={I18n.t("ASKQUESTION_submit")}
        align="center"
        onPress={() => {
          addQuestion({
            questionTitle,
            questionContent,
            tags: tagFilters,
            answerTitle: null,
            answerContent: null,
            createAnswerTime: null,
          })
            ? setPopupContent(successContent)
            : setPopupContent(failedContent);
        }}
      />
    </>
  );

  const successContent = (
    <>
      <Text style={[s.text.small, s.color.secondary, s.text.googleSansMedium]}>
        {I18n.t("ASKQUESTION_success")}
      </Text>
      <RoundRectangleButton
        title={I18n.t("ASKQUESTION_goBack")}
        align="center"
        onPress={() => {
          navigation.goBack();
          setList();
        }}
      />
    </>
  );

  const failedContent = (
    <Text style={[s.text.small, s.color.secondary, s.text.googleSansMedium]}>
      {I18n.t("ASKQUEStION_fail")}
    </Text>
  );

  const submitCheck = () => {
    if (questionTitle === "" || questionContent === "" || tagFilters === []) {
      setPopupContent(incompleteContent);
      toggleVisible();
    } else {
      setPopupContent(confirmContent);
      toggleVisible();
    }
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={[s.screen.normal, s.backgroundColor.light]}>
      <Popup
        visible={visible}
        title={I18n.t("ASKQUESTION_notification")}
        popupContent={<View style={{ width: "100%" }}>{popupContent}</View>}
        onDismiss={toggleVisible}
      />

      <ScrollView style={{ width: scale(295) }}>
        <Text
          style={[
            s.text.large,
            s.color.main,
            s.text.googleSansBold,
            { marginVertical: Spacing.h.small },
          ]}
        >
          {I18n.t("ASKQUESTION_giveTitle")}
        </Text>
        <View style={localStyles.textBoxStyle}>
          <TextInput
            multiline
            maxLength={200}
            style={s.text.small}
            placeholder={I18n.t("ASKQUESTION_placeholderQuestion")}
            onChangeText={(text) => setQuestionTitle(text)}
            value={questionTitle}
          />
        </View>
        <Text
          style={[
            s.text.large,
            s.color.main,
            s.text.googleSansBold,
            { marginVertical: Spacing.h.small },
          ]}
        >
          {I18n.t("ASKQUESTION_want")}
        </Text>
        <View style={[localStyles.textBoxStyle, { height: scale(150) }]}>
          <TextInput
            multiline
            maxLength={1000}
            style={s.text.small}
            placeholder={I18n.t("ASKQUESTION_placeholderAnswer")}
            onChangeText={(text) => setQuestionContent(text)}
            value={questionContent}
          />
        </View>
      </ScrollView>
      <View style={{ alignSelf: "flex-start" }}>
        <Text
          style={[
            s.text.large,
            s.color.main,
            s.text.googleSansBold,
            { marginVertical: Spacing.h.small },
          ]}
        >
          {I18n.t("ASKQUESTION_addTags")}
        </Text>
      </View>

      <FilterButtonList />

      <RoundRectangleButton title={I18n.t("ASKQUESTION_submit")} onPress={submitCheck} />
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  textBoxStyle: {
    marginVertical: Spacing.h.xsmall,
    paddingVertical: Spacing.h.small,
    paddingHorizontal: Spacing.h.medium,
    borderRadius: 20,
    backgroundColor: s.rowColor.background,
  },
});
