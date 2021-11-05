import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, Icon } from "react-native-elements";

import s from "../../styles/styles";
import { Size, Spacing, hp, wp } from "../../styles/size";
import I18n from "i18n-js";
/**
 * Home page of QnA; Shows a list of categories of questions
 */
export default function TopicSelectScreen({ navigation, route }) {
  useEffect(() => {}, []);

  const TopicButton = ({ item }) => (
    <TouchableOpacity
      style={[
        localStyles.topicButtonContainer,
        { backgroundColor: item.color },
      ]}
      onPress={() => {
        navigation.navigate("QnASearch", { selectedTag: item.title });
      }}
    >
      <Text h4 style={{ alignSelf: "flex-end", color: "white" }}>
        {item.numberOfArticles}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[s.text.medium, s.color.light, s.text.googleSansBold]}>
          {item.title}
        </Text>

        <Icon
          name="angle-right"
          type="font-awesome-5"
          size={Size.h.small}
          color="white"
          containerStyle={{ alignSelf: "flex-end" }}
        />
      </View>
    </TouchableOpacity>
  );

  const topicButtonList = [
    { title: I18n.t("QNA_all"), numberOfArticles: 100, color: "#F7D379" },
    { title: I18n.t("QNA_eyeHealth"), numberOfArticles: 100, color: "#F7AABD" },
    { title: I18n.t("QNA_eyecheck"), numberOfArticles: 100, color: "#7FCFA4" },
    { title: I18n.t("QNA_tips"), numberOfArticles: 100, color: "#F9C578" },
    { title: I18n.t("QNA_newBorn"), numberOfArticles: 100, color: "#A5B8E9" },
    {
      title: I18n.t("QNA_screenTime"),
      numberOfArticles: 100,
      color: "#DCBDF3",
    },
  ];

  return (
    <SafeAreaView style={[s.screen.normal, s.backgroundColor.light]}>
      <View>
        <Text style={[s.text.large, s.color.main, s.text.googleSansBold]}>
          {I18n.t("popularTopics")}
        </Text>
        <FlatList
          data={topicButtonList}
          renderItem={({ item }) => {
            return <TopicButton item={item} />;
          }}
          keyExtractor={(item) => item.title}
          numColumns={2}
          contentContainerStyle={{
            alignItems: "center",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  topicButtonContainer: {
    borderRadius: 20,
    margin: Spacing.h.medium,
    padding: Spacing.h.medium,
    elevation: 5,
    height: hp(21.5),
    width: wp(34),
    justifyContent: "space-between",
  },
});
