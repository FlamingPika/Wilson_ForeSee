import I18n from "i18n-js";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View } from "react-native";
import Pager from "react-native-pager-view";
import { useSelector, useDispatch } from "react-redux";
import { RoundRectangleButton } from "../../components/Buttons";
import { print, pushData, remove, reset, tempData } from "../../redux/tempDataSlice";
import { Size, Spacing, hp, wp } from "../../styles/size";
import EyeDataFrag from "./AddDataFrags/EyeDataFrag";
import styles from "../../styles/styles";
import { useFirstRender } from "../../utils/utils";
import moment from "moment";
import {
  DataType,
  populateDefaultGlassesValues,
} from "../../constant/eyeDataType";
import NewGlassesDataFrag from "./AddDataFrags/NewGlassesDataFrag";
import { GenericBackButton } from "../../components/HeaderButtons";
import Color from "../../styles/color";

/**
 * Screen for adding new eye data
 */
export default function AddGlassesData({ navigation }) {
  const [pagerIdx, setPagerIdx] = useState(0);
  const pagerRef = useRef();
  const dispatch = useDispatch();
  const dataKeys = ["sph", "cyl", "axis"];
  const isFirstPage = pagerIdx === 0;
  const isLastPage = pagerIdx === pagerRef?.current?.props?.children.length - 1;
  const isFirstRender = useFirstRender();

  const currentMember = useSelector((state) => state.user.currentMember);
  const glassesName = useSelector((state) => state.tempData.name);
  const defaultInputs = {
    type: DataType.glasses,
    createTime: moment().unix(),
    checkDate: moment().startOf("day").toISOString(),
    checkTime: moment().startOf("day").unix(),
    checkSeason: moment().year() + moment().quarter() / 10,
    name: "Glasses",
  };

  const onBackPressed = () => {
    pagerIdx === 0
      ? navigation?.goBack()
      : pagerRef.current.setPage(pagerIdx - 1);
  };

  const toNextPage = () => {
    if (isLastPage) {
      navigation?.replace("EditData", { isCreate: true });
    } else {
      pagerRef.current.setPage(pagerIdx + 1);
    }
  };

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerLeft: () => (
        <GenericBackButton color={Color.secondary} onPress={onBackPressed} />
      ),
      headerRight: null,
    });
  }, [navigation, onBackPressed]);

  useEffect(() => {
    if (isFirstRender) {
      dispatch(reset());
      dispatch(
        pushData({
          ...defaultInputs,
          ...populateDefaultGlassesValues(),
        })
      );
      console.log("dispatch", defaultInputs)
    }
  }, [isFirstRender]);

  useEffect(() => {
    console.log(
      "AddEyeData.js current member:",
      currentMember != undefined
        ? currentMember.name
        : "current member is underfined"
    );
  }, []);

  return (
    <View style={[styles.screen.normal, styles.backgroundColor.light]}>
      <Pager
        style={{
          flex: 1,
          width: "100%",
        }}
        ref={pagerRef}
        onPageSelected={(e) => setPagerIdx(e.nativeEvent.position)}
        scrollEnabled={false}
      >
        <NewGlassesDataFrag />
        <EyeDataFrag dataKey="sph" />
        <EyeDataFrag dataKey="cyl" />
        <EyeDataFrag dataKey="axis" />
      </Pager>

      <View style={{ height: Spacing.h.small }} />

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!isFirstPage ? (
          <RoundRectangleButton
            title={I18n.t("ADD_DATA.skip")}
            containerStyle={{ width: wp(30) }}
            onPress={() => {
              // if skip, remove data on this page
              toNextPage();
              const k = dataKeys[pagerIdx - 1];
              dispatch(
                remove({
                  keys: k == "pd" ? [k] : [`od_${k}`, `os_${k}`],
                })
              );
              dispatch(print());
            }}
          />
        ) : (
          <View />
        )}
        <RoundRectangleButton
          title={I18n.t(isLastPage ? "ADD_DATA.done" : "ADD_DATA.next")}
          containerStyle={{ width: wp(30) }}
          onPress={() => {
            dispatch(print());
            toNextPage();
          }}
        />
      </View>
    </View>
  );
}
