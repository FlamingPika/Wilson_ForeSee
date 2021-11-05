import I18n from "i18n-js";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { View } from "react-native";
import Pager from "react-native-pager-view";
import { useDispatch } from "react-redux";
import { RoundRectangleButton } from "../../components/Buttons";
import { print, pushData, remove, reset } from "../../redux/tempDataSlice";
import { Size, Spacing, wp } from "../../styles/size";
import NewEyeDataFrag from "./AddDataFrags/NewEyeDataFrag";
import EyeDataFrag from "./AddDataFrags/EyeDataFrag";
import styles from "../../styles/styles";
import Color from "../../styles/color";
import { useFirstRender } from "../../utils/utils";
import moment from "moment";
import { DataType, populateDefaultValues } from "../../constant/eyeDataType";
import { GenericBackButton } from "../../components/HeaderButtons";
import { useSelector } from "react-redux";

/**
 * Screen for adding new eye data
 */
export default function AddEyeData({ navigation }) {
  const [pagerIdx, setPagerIdx] = useState(0);
  const pagerRef = useRef();
  const dispatch = useDispatch();
  const dataKeys = ["vau", "vaa", "sph", "cyl", "axis", "pd"];
  const isFirstPage = pagerIdx === 0;
  const isLastPage = pagerIdx === dataKeys.length; // total num of pages = dataKeys.length + 1 (+1 first page)
  const isFirstRender = useFirstRender();
  const currentMember = useSelector((state) => state.user.currentMember);

  /**
   * default values for a new eye data input form
   */
  const defaultInputs = {
    type: DataType.eye,
    createTime: moment().unix(),
    checkDate: moment().startOf("day").toISOString(),
    checkTime: moment().startOf("day").unix(),
    checkSeason: moment().year() + moment().quarter() / 10,
    height: currentMember?.height, // TODO change this to current user's height
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

  // used in page view
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
      // if is first render, prepare the store for temporary data
      dispatch(reset());
      dispatch(
        pushData({
          ...defaultInputs,
          ...populateDefaultValues(),
          name: currentMember?.name,
        })
      );
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
        <NewEyeDataFrag />
        {dataKeys.map((k) => (
          <EyeDataFrag dataKey={k} key={k} />
        ))}
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
