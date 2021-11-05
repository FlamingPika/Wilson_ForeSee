import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, Divider } from "react-native-elements";

import s from "../styles/styles";
import { Size, Spacing, hp, wp } from "../styles/size";
import I18n from "i18n-js";
import { selectedEye } from "../redux/selectedEyeSlice";

export const FilterButtonListHooks = ({ tagList, selectedTag }) => {
  const [tagFilters, settagFilters] = useState([]);
  //const [tfList, setTfList] = useState(Array(diseases.length).fill(false));

  useEffect(() => {
    console.log("on start tags", selectedTag);
    if (selectedTag == null || selectedTag == undefined) {
      selectedTag = "All";
    }
    handleTopicClick(selectedTag);
  }, []);

  const checkStatus = (item, index) => {
    if (tagFilters.indexOf(item) === -1) {
      return "white";
    }
    return tagList.color[index];
  };

  const handleTopicClick = (title) => {
    let newTagFilters = [];
    console.log("tags handle topic click");
    if (tagFilters.indexOf(title) === -1) {
      // This topic is not in the list, add it.
      if (
        title === tagList.title[0] ||
        tagFilters.indexOf(tagList.title[0]) != -1
      )
        // If the topic is 'All' or there is already 'All' in the list, create a new list with only this topic.
        newTagFilters = [title];
      else newTagFilters = [...tagFilters, title];
    } else {
      // This topic is already in the list, remove it.
      // 'All' is not removable through click, can only be removed by clicking others.
      if (title != tagList.title[0]) {
        // If the current filter list only have one element, remove it will select 'All'
        if (tagFilters.length != 1)
          newTagFilters = tagFilters.filter((filter) => filter != title);
        else newTagFilters = [tagList.title[0]];
      }
    }
    settagFilters(newTagFilters);
  };

  const FilterButton = ({ title, index, handler }) => {
    var showtitle = title;
    switch (title) {
      case "All":
        showtitle = "QNA_all";
        break;
      case "Eye Health":
        showtitle = "QNA_eyeHealth";
        break;
      case "Eye Check":
        showtitle = "QNA_eyecheck";
        break;
      case "Tips":
        showtitle = "QNA_tips";
        break;
      case "New Born":
        showtitle = "QNA_newBorn";
        break;
      case "Screen Time":
        showtitle = "QNA_screenTime";
        break;
    }
    return (
      <TouchableOpacity
        style={{
          backgroundColor: checkStatus(title),
          borderRadius: 20,
          marginHorizontal: Spacing.h.xxsmall,
          marginVertical: Spacing.h.xxxsmall,
          paddingHorizontal: Spacing.h.xsmall,
          paddingVertical: Spacing.h.xxsmall,
          borderWidth: 1,
          borderColor: checkStatus(title, index),
        }}
        onPress={() => handler(title)}
      >
        <Text
          style={[
            s.text.small,
            s.text.googleSansMedium,
            { color: tagList.color[index] },
          ]}
        >
          {I18n.t(showtitle)}
        </Text>
      </TouchableOpacity>
    );
  };

  const FilterButtonList = () => (
    <FlatList
      data={tagList.title}
      renderItem={({ item, index }) => {
        return (
          <FilterButton title={item} index={index} handler={handleTopicClick} />
        );
      }}
      keyExtractor={(item) => item}
      numColumns={3}
      contentContainerStyle={{
        alignItems: "flex-start",
      }}
    />
  );
  return { FilterButtonList, tagFilters };
};

export const TagHorizontalList = ({ tagList, tags }) => (
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={tags}
    keyExtractor={(item) => item.toString()}
    renderItem={({ item, index }) => {
      tagIndex = tagList.title.indexOf(item);
      color = tagIndex === -1 ? tagList.color[0] : tagList.color[tagIndex];
      return (
        <View
          key={index}
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: color,
            marginHorizontal: Spacing.h.xxsmall,
            paddingHorizontal: Spacing.h.xsmall,
          }}
        >
          <Text style={[s.text.small, s.color.main, s.text.googleSansMedium]}>
            {item}
          </Text>
        </View>
      );
    }}
  />
);
