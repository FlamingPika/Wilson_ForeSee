import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Color from "../styles/color";
import LinearGradient from "react-native-linear-gradient";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import AnimatedText from "../components/AnimatedText";
import Popup from "../components/Popup";
import Input from "../components/Input";
import I18n from "i18n-js";
import { RoundedButton } from "../components/Buttons";
import s from "../styles/styles";
import { Size, Spacing } from "../styles/size";
import { withOpacity } from "../utils/utils";

function clamp(value, lower, upper) {
  "worklet";
  return Math.min(Math.max(value, lower), upper);
}

function round(value, step) {
  "worklet";
  return Math.round(value / step) * step;
}

/**
 * Custom vertical slider for data input.
 * {min, max, step} and {dataValues} are mutually exclusive, only one is used
 *
 * @property initialValue - initial slider value
 * @property min - minimum value of the slider
 * @property max - maximum value of the slider
 * @property step - step of the input value
 * @property dataValues - array of possible input values
 * @property minLabel - display string of min
 * @property maxLabel - display string of max
 * @property heading - title string of the slider
 * @property onSlidingComplete - callback when the sliding thumb is release
 * @property type - type of the eye data
 * @property outOfRangeThreshold - number of pixels beyond max/min of slider before it is considered out of range
 */
export const DataInputSlider = ({
  initialValue,
  min = 0,
  max = 1,
  step = 0.1,
  dataValues,
  minLabel,
  maxLabel,
  heading,
  onSlidingComplete,
  type,
  outOfRangeThreshold: outOfBoundThreshold = 20,
}) => {
  const height = useSharedValue(0);
  const onTrackLayout = (e) => {
    height.value = e.nativeEvent.layout.height;
  };

  const [thumbEnable, setThumbEnable] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false); // state of out of bound popup

  const translateY = useDerivedValue(() => {
    return interpolate(
      initialValue ?? (max + min) / 2,
      [max, min],
      [0, height.value - thumbSize]
    );
  }, [height, initialValue]);

  const value = useDerivedValue(() => {
    if (dataValues) {
      // if an array of values is given
      const outputs = dataValues;

      const inputs = Array.from(
        { length: outputs.length },
        (_, i) => (i * (height.value - thumbSize)) / outputs.length
      );

      // find the idx of the largest element in inputs, which is less than translateY.value
      const match = inputs.reduce((prevIdx, currVal, currIdx) =>
        translateY.value > currVal ? currIdx : prevIdx
      );

      return outputs[match];
    } else {
      // if {max, min, step} is given
      return round(
        interpolate(
          translateY.value,
          [0, height.value - thumbSize],
          [max, min]
        ),
        step
      );
    }
  }, [translateY]);

  const valueText = useDerivedValue(() => {
    if (type === "va") return `6/${6 / value.value}`;
    return String(value.value.toFixed(2));
  }, [value]);

  const [OutBoundMaxorMin, setOutBoundMaxorMin] = useState("");

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startY = event.y + translateY.value;
    },
    onActive: (event, context) => {
      const trueY = context.startY + event.translationY;
      translateY.value = clamp(
        trueY - thumbSize / 2,
        0,
        height.value - thumbSize
      );

      const outOfBound =
        trueY - thumbSize / 2 < -outOfBoundThreshold ||
        trueY - thumbSize / 2 > height.value - thumbSize + outOfBoundThreshold;

      // handle out of bound
      if (outOfBound && !popupVisible && type != "va") {
        if (trueY - thumbSize / 2 < -outOfBoundThreshold) {
          runOnJS(setOutBoundMaxorMin)("Min");
        }
        if (
          trueY - thumbSize / 2 >
          height.value - thumbSize + outOfBoundThreshold
        ) {
          runOnJS(setOutBoundMaxorMin)("Max");
        }
        runOnJS(setPopupVisible)(true);
        runOnJS(setThumbEnable)(true);
      }
    },
    onEnd: () => {
      if (onSlidingComplete) runOnJS(onSlidingComplete)(value.value);
    },
    onCancel: () => {
      runOnJS(setThumbEnable)(true);
    },
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: translateY.value }] };
  }, [translateY]);

  const thumb = (
    <PanGestureHandler onGestureEvent={onGestureEvent} enabled={thumbEnable}>
      <Animated.View style={[thumbAnimatedStyle, styles.thumbContainer]}>
        <View style={styles.thumbInner} />
        <View style={styles.thumbOuter} />
      </Animated.View>
    </PanGestureHandler>
  );

  const track = (
    <View style={styles.track}>
      <LinearGradient
        colors={["#0008", "#0000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.75, y: 0 }}
        style={{
          flex: 1,
          borderRadius: 10,
        }}
      />
    </View>
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue == undefined || inputValue == null) {
      return;
    }
    const input = parseFloat(inputValue);
    // return if input is NaN
    if (!input) return;

    // update display value and run callback
    value.value = input;

    onSlidingComplete(input);
    //setPopupVisible(false);
  }, [inputValue]);

  const checkIfValueIsValid = (input) => {
    console.log("OutBoundMaxorMin", OutBoundMaxorMin);
    switch (OutBoundMaxorMin) {
      case "Max":
        if (input >= min) {
          console.log("larger than max", input, max);
          return "T";
        } else {
          let text = I18n.t("ADD_DATA_errorMsgLargerText") + min;
          let title = I18n.t("ADD_DATA_errorMsgTitle");
          Alert.alert(title, text, [
            { text: I18n.t("ADD_DATA_errorMsgConfirm") },
          ]);
          return "F";
        }
        break;
      case "Min":
        if (input <= max) {
          console.log("larger than min", input, min);
          return "T";
        } else {
          let text = I18n.t("ADD_DATA_errorMsgSmallerText") + max;
          let title = I18n.t("ADD_DATA_errorMsgTitle");
          Alert.alert(title, text, [
            { text: I18n.t("ADD_DATA_errorMsgConfirm") },
          ]);
          return "F";
        }
        break;
      default:
        console.log(
          "error in detecting outbound max or min with OutBoundMaxorMin",
          OutBoundMaxorMin
        );
        return "F";
    }
  };

  return (
    <View style={styles.container}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      <Text style={styles.label}>{maxLabel}</Text>
      <View style={styles.trackContainer} onLayout={onTrackLayout}>
        {/* <Track/> */}
        {track}
        {thumb}
      </View>
      <Text style={styles.label}>{minLabel}</Text>
      <AnimatedText text={valueText} />

      <Popup
        title={I18n.t("DATA_INPUT_SLIDER.outOfBound")}
        visible={popupVisible}
        popupContent={
          <View>
            <Text
              style={[s.color.secondary, s.text.xsmall, s.text.alignCenter]}
            >
              {I18n.t("DATA_INPUT_SLIDER.outOfBoundDescription")}
            </Text>
            <Input
              onComplete={(inputStr) => {
                const input = parseFloat(inputStr);
                console.log("slide input", inputStr, input);
                // return if input is NaN
                if (!input) return;

                // update display value and run callback
                value.value = input;

                onSlidingComplete(input);
                setPopupVisible(false);
              }}
              numberOnly
              maxLength={10}
              placeHolder={I18n.t("DATA_INPUT_SLIDER.enterDataHere")}
              placeHolderColor={withOpacity(Color.secondary, 0.6)}
              inputContainerStyle={{
                ...s.backgroundColor.background,
                marginVertical: Spacing.h.medium,
                paddingVertical: Spacing.h.xsmall,
              }}
              inputColor={Color.secondary}
              value={inputValue}
              onChangeValue={setInputValue}
            />
            <RoundedButton
              title={I18n.t("ADD_DATA_errorMsgConfirm")}
              style={{
                ...s.backgroundColor.light,
                borderRadius: Size.h.medium,
              }}
              titleStyle={{ ...s.color.secondary, ...s.text.small }}
              onPress={() => {
                if (checkIfValueIsValid(inputValue) == "T") {
                  setPopupVisible(false);
                  setInputValue("");
                } else {
                  setPopupVisible(true);
                }
              }}
            />
          </View>
        }
        onDismiss={() => {
          if (checkIfValueIsValid(inputValue) == "T") {
            setPopupVisible(false);
            setInputValue("");
          } else {
            setPopupVisible(true);
          }
        }}
      />
    </View>
  );
};

// const alertPopup = (compare, value) => {
//   const [compareText, setCompareText] = useState("");
//   const [alertVisible, setalertVisible] = useState(true);

//   if (compare == "larger") {
//     setCompareText(" i18n larger than ");
//   }
//   if (compare == "smaller") {
//     setCompareText(" i18n smaller than ");
//   }
//   let text = "i18n please eneter a value" + compareText + value;
//   return (
//     <View style={styles.container}>
//       <Popup
//         title={"i18n Please enter a valid value"}
//         visible={alertVisible}
//         popupContent={
//           <View>
//             <Text
//               style={[s.color.secondary, s.text.xsmall, s.text.alignCenter]}
//             >
//               {text}
//             </Text>
//             <RoundedButton
//               title="OK"
//               style={{
//                 ...s.backgroundColor.light,
//                 borderRadius: Size.h.medium,
//               }}
//               titleStyle={{ ...s.color.secondary, ...s.text.small }}
//               onPress={() => {
//                 setalertVisible(false);
//               }}
//             />
//           </View>
//         }
//         onDismiss={() => {
//           setalertVisible(false);
//         }}
//       />
//     </View>
//   );
// };
const thumbSize = 28;
const thumbBorderWidth = thumbSize / 7;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  trackContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: 8,
  },
  track: {
    width: 10,
    borderRadius: 5,
    height: "100%",
    backgroundColor: Color.secondary,
  },
  thumbContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: thumbSize / 2,
    elevation: 10,
  },
  thumbOuter: {
    backgroundColor: "transparent",
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    borderWidth: thumbBorderWidth,
    borderColor: "#FFF8E5",
  },
  thumbInner: {
    position: "absolute",
    backgroundColor: Color.accent,
    width: thumbSize - thumbBorderWidth,
    height: thumbSize - thumbBorderWidth,
    borderRadius: thumbSize / 2,
  },
  heading: {
    fontSize: 25,
    color: Color.main,
    textAlign: "center",
  },
  label: {
    fontSize: 20,
    color: Color.main,
    textAlign: "center",
  },
});
