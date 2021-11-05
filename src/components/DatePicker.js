import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Color } from "../constant/color";
import { Icon } from "react-native-elements";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";
import RNDatePicker from "@react-native-community/datetimepicker";

const LENGTH = 9;
const SELECTED_POS = Math.floor(LENGTH / 2);

/**
 * A custom Date Picker component which provides 2 date picker methods.
 * - A custom horizontal "spinner" date picker
 * - Native DateTimePicker
 * @property initialDate - optional starting date
 * @property onChange - on date change callback
 * @property selectedTextColor - color of selected date
 * @property textColor - color of non-selected date
 * @property calendarColor - color of calendar icon
 * @property arrowColor - color of left/right arrow icon
 */
export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    const initialDate = props.initialDate ?? moment().startOf("day");
    this.state = {
      month: initialDate.format("MMMM"),
      year: initialDate.format("YYYY"),
      iconSize: 0,
      visibleDays: this.getVisibleDays(initialDate),
      selectedDate: initialDate,
      onChangeCallback: props.onChange,
      showRNDatePicker: false,
    };
  }

  /**
   * get a list of objects of days which are visible in the date picker
   * includes days in the range [date - 4, date + 4]
   */
  getVisibleDays(date) {
    const range = Array.from(
      { length: LENGTH },
      (x, i) => i - Math.floor(LENGTH / 2)
    );
    const days = range.map((i) => moment(date).add(i, "days"));
    return days;
  }

  /**
   * want to set icon to 75% of the parent, but the size prop doesn't accpet "75%"
   * need to find the actual size of parent first, and apply it to icon
   */
  onLayout(event) {
    const { height } = event.nativeEvent.layout;
    this.setState({
      iconSize: height * 0.5,
    });
  }

  toPrev() {
    let visibleDays = this.state.visibleDays;
    const prevDay = moment(visibleDays[0]).subtract(1, "days");
    visibleDays.unshift(prevDay);
    visibleDays.pop();

    this.setState({
      visibleDays: visibleDays,
    });
    this.onChange(visibleDays[SELECTED_POS]);
  }

  toNext() {
    let visibleDays = this.state.visibleDays;
    const nextDay = moment(visibleDays[visibleDays.length - 1]).add(1, "days");
    visibleDays.shift();
    visibleDays.push(nextDay);

    this.setState({
      visibleDays: visibleDays,
    });
    this.onChange(visibleDays[SELECTED_POS]);
  }

  // onChange for custom date picker
  onChange(date) {
    this.setState({
      month: date.format("MMMM"),
      year: date.format("YYYY"),
      selectedDate: date,
    });
    this.state.onChangeCallback?.(date);
  }

  // onChange for RNDatetimePicker
  onRNPickerChange(_, selectedDate) {
    if (selectedDate == null) return;

    const date = moment(selectedDate); // convert Date into moment object
    this.setState({
      month: date.format("MMMM"),
      year: date.format("YYYY"),
      selectedDate: date,
      showRNDatePicker: false,
      visibleDays: this.getVisibleDays(date),
    });
    this.state.onChangeCallback?.(date);
  }

  renderDay(day, index) {
    const dayNum = day.date();
    const dayOfWeek = moment(day).format("dd")[0];
    const textColor =
      index === SELECTED_POS
        ? this.props.selectedTextColor || this.props.textColor
        : this.props.textColor;

    return (
      <View
        key={index}
        style={{
          paddingVertical: 4,
          borderRadius: 10,
          flex: 1,
          height: "100%",
          justifyContent: "space-around",
          backgroundColor: index == SELECTED_POS ? Color.accent : "transparent",
          opacity: 1 - Math.abs(SELECTED_POS - index) / SELECTED_POS,
        }}
      >
        <Text style={{ ...styles.day, color: textColor }}>{dayOfWeek}</Text>
        <Text
          style={{ ...styles.day, color: textColor }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {dayNum}
        </Text>
      </View>
    );
  }

  renderCalendar() {
    return (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        {this.state.visibleDays.map((d, index) => {
          return this.renderDay(d, index);
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ ...styles.monthAndYear, color: this.props.textColor }}
          >{`${this.state.month} ${this.state.year}`}</Text>
          <View width={12} />
          <Icon
            name="calendar"
            type="font-awesome"
            color={this.props.calendarColor}
            Component={TouchableOpacity}
            onPress={() => this.setState({ showRNDatePicker: true })}
          />
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onLayout={this.onLayout.bind(this)}
        >
          <View style={{ position: "absolute", width: "100%", height: "100%" }}>
            {this.renderCalendar()}
          </View>

          <Icon
            name="triangle-left"
            type="entypo"
            color={this.props.arrowColor}
            size={this.state.iconSize}
            Component={TouchableOpacity}
            onPress={this.toPrev.bind(this)}
          />
          <Icon
            name="triangle-right"
            type="entypo"
            color={this.props.arrowColor}
            size={this.state.iconSize}
            Component={TouchableOpacity}
            onPress={this.toNext.bind(this)}
          />
        </View>

        {this.state.showRNDatePicker && (
          <RNDatePicker
            value={this.state.selectedDate.toDate()} // convert to Date object
            mode="date"
            onTouchCancel={() => console.log("hi")}
            onChange={this.onRNPickerChange.bind(this)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  monthAndYear: {
    fontSize: 20,
  },
  day: {
    fontSize: 17,
    textAlign: "center",
  },
});
