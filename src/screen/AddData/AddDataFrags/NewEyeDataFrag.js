import I18n from "i18n-js";
import moment from "moment";
import React from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import DatePicker from "../../../components/DatePicker";
import Input from "../../../components/Input";
import { pushData } from "../../../redux/tempDataSlice";
import Color from "../../../styles/color";
import { hp, Spacing, wp } from "../../../styles/size";
import s from "../../../styles/styles";
import { withOpacity } from "../../../utils/utils";

/**
 * Fragment that is used as the first screen in AddEyeData
 */
export default function NewEyeDataFrag() {
  const dispatch = useDispatch();

  return (
    <View style={[s.screen.fragment, s.backgroundColor.light]}>
      <Text style={[s.text.large, s.color.main, { alignSelf: "flex-start" }]}>
        {I18n.t("ADD_DATA.addEyeData")}
      </Text>

      <View style={{ height: hp(10) }} />

      <Text style={[s.text.medium, s.color.main, { alignSelf: "flex-start" }]}>
        {I18n.t("ADD_DATA.date")}
      </Text>
      <View style={{ height: hp(15), width: "100%" }}>
        <DatePicker
          initialDate={moment().startOf("day")}
          textColor={Color.secondary}
          calendarColor={Color.secondary}
          arrowColor={Color.main}
          onChange={(value) =>
            dispatch(
              pushData({
                checkDate: moment(value).toISOString(),
                checkTime: moment(value).unix(),
                checkSeason:
                  moment(value).year() + moment(value).quarter() / 10,
              })
            )
          }
        />
      </View>

      {/* <View style={{ height: hp(5) }} />

      <Text style={[s.text.small, s.color.main]}>
        {I18n.t("ADD_DATA.enterHeight")}
      </Text>

      <View style={{ height: Spacing.h.medium }} />

      <Input
        intOnly
        placeHolderColor={Color.light}
        inputColor={Color.light}
        maxLength={3}
        inputContainerStyle={{
          backgroundColor: withOpacity(Color.secondary, 0.8),
          width: wp(65),
          alignSelf: "center",
        }}
        inputStyle={[s.text.small, s.color.light]}
        onComplete={(value) => dispatch(pushData({ height: value }))}
      /> */}
    </View>
  );
}
