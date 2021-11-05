import React, { useState } from "react";
import { Input as ElementsInput } from "react-native-elements";
import { Color } from "../constant/color";

/**
 * Generic text input which is used in input forms throughout the app.
 *
 * @property maxLength - maximum length of input
 * @property placeHolder - optional place holder text
 * @property placeHolderColor - color of the place holder text
 * @property onComplete - callback when the input is complete
 * @property inputStyle - style of the input text
 * @property inputColor - color of the input text
 * @property inputContainerStyle - style of the input text container
 * @property initialValue - optional initial input value
 * @property intOnly - whether the input should be restricted to integers
 * @property numberOnly - whether the input should be restricted to numbers
 */
export default function Input({
  maxLength,
  placeHolder,
  placeHolderColor,
  onComplete,
  inputStyle,
  inputColor,
  inputContainerStyle,
  label,
  labelStyle,
  value,
  onChangeValue,
  initialValue,
  intOnly = false,
  numberOnly = false,
}) {
  if (value === null) {
    console.log("no value or change value");
    return null;
  }
  const [_placeHolder, _setPlaceHolder] = useState(placeHolder);

  return (
    <ElementsInput
      value={value}
      placeholder={_placeHolder}
      placeholderTextColor={placeHolderColor}
      inputStyle={[
        {
          color: inputColor,
          fontSize: 20,
          textAlign: "center",
          fontFamily: "GoogleSans-Bold",
          padding: 0,
        },
        inputStyle,
      ]}
      inputContainerStyle={{
        width: "100%",
        backgroundColor: Color.background,
        borderRadius: 30,
        borderBottomWidth: 0,
        ...inputContainerStyle,
      }}
      containerStyle={{
        paddingHorizontal: 0,
      }}
      selectionColor={inputColor}
      onChangeText={onChangeValue}
      onFocus={() => _setPlaceHolder("")}
      onBlur={() => {
        _setPlaceHolder("");
      }}
      maxLength={maxLength}
      keyboardType={intOnly || numberOnly ? "number-pad" : "default"}
      renderErrorMessage={false}
      label={label}
      labelStyle={labelStyle}
    />
  );
}
