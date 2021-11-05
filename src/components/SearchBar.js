import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";

import s from "../styles/styles";
import { Size, Spacing, hp, wp } from "../styles/size";

/**
 * Custom Search bar
 * @property onSubmit - callback when the submit button is press
 */
export default ({ onSubmit }) => {
  const [query, setQuery] = useState();
  return (
    <Input
      containerStyle={{
        height: Size.h.large,
        marginVertical: Spacing.h.xsmall,
      }}
      inputContainerStyle={[
        s.backgroundColor.background,
        localStyles.searchBarStyle,
      ]}
      placeholder="Search"
      placeholderTextColor={s.rowColor.secondary}
      value={query}
      onChangeText={setQuery}
      autoCapitalize="none"
      rightIcon={
        <Icon
          name="search"
          type="font-awesome-5"
          size={Size.h.small}
          color={s.rowColor.secondary}
          onPress={() => onSubmit(query)}
        />
      }
    />
  );
};

const localStyles = StyleSheet.create({
  searchBarStyle: {
    borderRadius: 20,
    height: "100%",
    borderBottomWidth: 0,
    paddingHorizontal: Spacing.h.small,
  },
});
