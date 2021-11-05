import I18n from "i18n-js";
import moment from "moment";
import React, {useState, useSelector} from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import DatePicker from "../../../components/DatePicker";
import Input from "../../../components/Input";
import { print, pushData } from "../../../redux/tempDataSlice";
import {set} from "../../../redux/eyeCheckDataSlice";
import Color from "../../../styles/color";
import { hp, Spacing, wp } from "../../../styles/size";
import s from "../../../styles/styles";
import { withOpacity } from "../../../utils/utils";

/**
 * Fragment that is used as the first screen in AddGlassesData
 */
export default function NewGlassesDataFrag() {
  const dispatch = useDispatch();

  return (
    <View style={[s.screen.fragment, s.backgroundColor.light]}>
      <Text style={[s.text.large, s.color.main, { alignSelf: "flex-start" }]}>
        {I18n.t("ADD_DATA.addGlassesData")}
      </Text>

      <View style={{ height: hp(15) }} />

      <Text style={[s.text.medium, s.color.main, { alignSelf: "flex-start" }]}>
        {I18n.t("ADD_DATA.date")}
      </Text>
      <View style={{ height: hp(15), width: "100%" }}>
        <DatePicker
          initialDate={moment().startOf("day")}
          textColor={Color.secondary}
          calendarColor={Color.secondary}
          arrowColor={Color.main}
          onChange={(value) => dispatch(pushData({ start_date: value }))}
        />
      </View>

      <View style={{ height: Spacing.h.large }} />

      <Text style={[s.text.small, s.color.main]}>
        {I18n.t("ADD_DATA.enterGlassesName")}
      </Text>

      <View style={{ height: Spacing.h.medium }} />

      <Input
        placeHolder={I18n.t("ADD_DATA.inputPlaceholder")}
        placeHolderColor={Color.light}
        inputColor={Color.light}
        maxLength={30}
        inputContainerStyle={{
          backgroundColor: withOpacity(Color.secondary, 0.8),
          width: wp(65),
          alignSelf: "center",
        }}
        inputStyle={[s.text.small, s.color.light]}
        onChangeValue={(value) => {dispatch(pushData({ name: value }))}}
      />
    </View>
  );
}
//         onComplete={(value) => {dispatch(pushData({ name: value }))}}