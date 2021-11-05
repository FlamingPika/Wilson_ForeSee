import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, ButtonGroup, Button } from "react-native-elements";
import { useSelector } from "react-redux";
// Componenets
import ArticleMiniReview from "../../components/ArticleMiniReview";
import I18n from "i18n-js";
// styles
import s from "../../styles/styles";
import { Size, Spacing, hp, wp } from "../../styles/size";
import { fetchArticles } from "../../action/firebaseActions";

/**
 * Shows a preview list of all articles
 */
export default function ArticlesScreen({ navigation, route }) {
  const userLanguage = useSelector((state) => state.settings.language);

  const [selectedIndex, setSelectedindex] = useState(0);
  const [articleList, setArticleList] = useState({});

  const buttons = ["Trivia", "Recipe", "Video"];
  // showButtons are just used for display, the true working function lies on buttons, so don't touch button when doing display
  const showButton1 = I18n.t("ARTICLES_trivia");
  const showButton2 = I18n.t("ARTICLES_recipe") ;
  const showButton3 = I18n.t("ARTICLES_video");
  const showButtons = [showButton1, showButton2, showButton3];
  let showButton = showButtons[selectedIndex];
  useEffect(() => {
    console.log(userLanguage);
    loadFirebaseArticles(buttons[selectedIndex]);
  }, []);

  const loadFirebaseArticles = async (queryType) => {
    // console.log("this is lang", userLanguage);
    if (articleList[queryType] === undefined || articleList[queryType === []]) {
      const tempList = await fetchArticles(queryType, userLanguage);
      setArticleList({ ...articleList, [queryType]: tempList });
    }
  };

  const _updateIndex = async (index) => {
    setSelectedindex(index);
    await loadFirebaseArticles(buttons[index]);
  };


  return (
    <View style={[s.screen.normal, s.backgroundColor.light]}>
      <Text
        style={[
          s.text.large,
          s.color.main,
          s.text.googleSansBold,
          { alignSelf: "flex-start" },
        ]}
      >
        {showButton}
      </Text>

      <ButtonGroup
        onPress={_updateIndex}
        selectedIndex={selectedIndex}
        buttons={showButtons}
        containerStyle={localStyles.buttonGroupContainer}
        innerBorderStyle={{ width: 0 }}
        selectedButtonStyle={[s.backgroundColor.accent, { borderRadius: 18 }]}
        selectedTextStyle={{ color: s.color.secondary }}
        textStyle={[s.text.small, s.color.secondary, s.text.googleSansMedium]}
      />
      <FlatList
        style={{ width: "100%" }}
        data={articleList[buttons[selectedIndex]]}
        renderItem={(item) => {
          return <ArticleMiniReview navigation={navigation} item={item.item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  buttonGroupContainer: {
    borderWidth: 0,
    marginTop: Spacing.h.medium,
    borderRadius: 20,
    width: wp(70),
    padding: Spacing.h.xxxsmall,
    backgroundColor: s.rowColor.background,
  },
});
