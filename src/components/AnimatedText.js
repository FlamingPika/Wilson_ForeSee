import * as React from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

/**
 * Text component that uses animatedProps from reanimated 2
 * @property text - a SharedValue object from reanimated 2
 */
const AnimatedText = ({ text }) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      style={{ color: "black", padding: 0 }}
      value={text.value}
      animatedProps={animatedProps}
    />
  );
};

export default AnimatedText;
