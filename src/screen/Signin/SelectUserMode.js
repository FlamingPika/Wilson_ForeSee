import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import I18n from "i18n-js";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { setIsPro } from "../../redux/userSlice";
import s from "../../styles/styles";
import { Size, Spacing, wp } from "../../styles/size";
import { s as scale } from "react-native-size-matters";
/**
 * Screen for user mode selection
 */
export default function SelectUserMode({ navigation }) {
  const [selected, setSelected] = useState("family");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  function Card({ mode, title }) {
    const _selected = mode === selected;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flex: 1,
          width: wp(75),
          backgroundColor: _selected ? s.rowColor.main : s.rowColor.light,
          borderRadius: Size.h.large,
          padding: Spacing.h.small,
        }}
        onPress={() => {
          setSelected(mode);
          dispatch(setIsPro(mode === "pro"));
          if (mode === "pro") navigation.replace("ProDrawer");
        }}
      >
        <View
          style={{
            flex: 1,
            borderWidth: _selected ? 4 : 0,
            borderColor: _selected ? s.rowColor.background : s.rowColor.light,
            alignItems: "center",
            borderRadius: Size.h.medium,
            justifyContent: "space-around",
            paddingVertical: Spacing.v.medium,
          }}
        >
          <Text
            style={[s.text.small, _selected ? s.color.light : s.color.main]}
          >
            {title}
          </Text>
          <Image
              source= {require("../../assets/ApplicationLogo.png")}
              style={{
                width: Size.h.xxlarge,
                height: Size.h.xxlarge,
                borderRadius: scale(20),
              }}
              />
          <View
            style={{
              position: "absolute",
              top: Spacing.h.small,
              right: Spacing.h.small,
              width: Size.h.small,
              height: Size.h.small,
              backgroundColor: "white",
              borderRadius: Size.h.small,
              borderWidth: 3,
              borderColor: s.rowColor.accent,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {_selected && (
              <Icon
                size={Size.h.xsmall}
                name="check"
                type="font-awesome-5"
                color={s.rowColor.main}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[s.screen.normal, s.backgroundColor.secondary]}>
      {loading ? (
        <View></View>
      ) : (
        <>
          <Text style={[s.text.medium, s.color.light, s.text.alignCenter]}>
            {I18n.t("userModeSelectionTitle")}
          </Text>
          <View style={{ height: Spacing.h.xlarge }} />
          <Card mode={"family"} title={I18n.t("userModeSelectionPublic")} />
          <View style={{ height: Spacing.h.xlarge }} />
          <Card mode={"pro"} title={I18n.t("userModeSelectionProfessional")} />
        </>
      )}
    </View>
  );
}
