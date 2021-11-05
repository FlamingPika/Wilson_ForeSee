import React from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-elements";

import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing, wp } from "../../styles/size";
import Color from "../../styles/color";
import I18n from "i18n-js";
/**
 * Shows the title and the body content of the selected question
 */
export default function QnADetailScreen({ navigation, route }) {
  const { QnA } = route.params;

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

            {/* <Icon name="heart" type="font-awesome-5" size={25} color="white" /> */}

          </View>
        ) : (
          <Text
            style={[
              s.text.medium,
              s.text.googleSansBold,
              { color: config.titleColor, padding: wp(1) },
            ]}
          >
            Q: {title}
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

  return (
    <SafeAreaView style={[s.screen.normal, s.backgroundColor.light]}>
      <ScrollView style={{ width: scale(295) }}>
        <Text style={[s.text.large, s.color.main, s.text.googleSansBold]}>
          {I18n.t("QNA_answered")}
        </Text>
        <TextBox
          type="question"
          title={QnA.QnA.questionTitle}
          content={QnA.QnA.questionContent}
        />
        <TextBox
          type="answer"
          title={QnA.QnA.answerTitle}
          content={QnA.QnA.answerContent || I18n.t("QNA_waitingAnswer")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  textBoxStyle: {
    marginVertical: Spacing.h.xsmall,
    paddingVertical: Spacing.h.small,
    paddingHorizontal: Spacing.h.medium,
    borderRadius: 20,
    backgroundColor: Color.background,
  },
});
