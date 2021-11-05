import React, { useState } from "react";
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
import { addAnswer, addQuestion } from "../../action/firebaseActions";

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
import { Size, Spacing, wp } from "../../styles/size";
import Color from "../../styles/color";
import I18n from "i18n-js";

export default function ProQnADetailScreen({ navigation, route }) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const { FilterButtonList, tagFilters } = FilterButtonListHooks({
    tagList,
  });
  const { QnA , setList} = route.params;
  const [visible, setVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(incompleteContent);

  const TextBox = ({ type, title, content }) => {
    let config = {};
    switch (type) {
      case "question":
        config = {
          backgroundColor: "#68A97E",
          titleColor: Color.light,
          contentColor: Color.main,
          likeEnabled: false,
        };
        break;
      case "answer":
        config = {
          backgroundColor: Color.background,
          titleColor: Color.main,
          contentColor: Color.secondary,
          likeEnabled: true,
        };
        break;
      default:
        break;
    }

    return (
      <View
        style={[
          localStyles.textBoxStyle,
          { backgroundColor: config.backgroundColor },
        ]}
      >
        {config.likeEnabled ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                s.text.medium,
                s.text.googleSansMedium,
                { color: config.titleColor },
              ]}
            >
              A: {title}
            </Text>
            {//<Icon name="heart" type="font-awesome-5" size={25} color="white" />
            }
          </View>
        ) : (
          <Text
            style={[
              s.text.medium,
              s.text.googleSansBold,
              { color: config.titleColor, padding: wp(1) },
            ]}
          >
            {title}
          </Text>
        )}

        <Text
          style={[
            s.text.small,
            s.text.googleSansBold,
            s.color.main,
            { color: config.contentColor },
          ]}
        >
          {content}
        </Text>
      </View>
    );
  };

  const incompleteContent = (
    <Text style={[s.text.small, s.color.secondary, s.text.googleSansMedium]}>
      {I18n.t("ASKQUESTION_incompleteContent")}
    </Text>
  );

  const confirmContent = (
    <>
      <Text style={[s.text.small, s.color.main, s.text.googleSansMedium]}>
        {I18n.t("ASKQUESTION_answerTitle")}
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
      <RoundRectangleButton
        title={I18n.t("ASKQUESTION_submit")}
        align="center"
        onPress={() => {
          addAnswer(questionTitle, questionContent, QnA)
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
          setList(undefined);
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
        title={I18n.t("SETTINGS_notifications")}
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
          {I18n.t("ASKQUESTION_questionAsked")}
        </Text>
        <TextBox
          type="question"
          title={QnA.QnA.questionTitle}
          content={QnA.QnA.questionContent}
        />
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
            placeholder={I18n.t("PRO_placeholdertitle")}
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
          {I18n.t("ASKQUESTION_contentAnswer")}
        </Text>
        <View style={[localStyles.textBoxStyle, { height: scale(150) }]}>
          <TextInput
            multiline
            maxLength={1000}
            style={s.text.small}
            placeholder={I18n.t("PRO_placeholderanswer")}
            onChangeText={(text) => setQuestionContent(text)}
            value={questionContent}
          />
        </View>
      </ScrollView>
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
