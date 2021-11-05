import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function SelectMode() {
  const dispatch = useDispatch();

  return (
    <View>
      <Text>SelectMode</Text>
    </View>
  );
}
