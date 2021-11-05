import I18n from "i18n-js";
import moment from "moment";
import React, { useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import Animated from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Snackbar from "react-native-snackbar";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "../../components/BottomSheet";
import { RoundRectangleButton } from "../../components/Buttons";

import { GenericBackButton } from "../../components/HeaderButtons";
import LoadingIndicator from "../../components/LoadingIndicator";
import Popup from "../../components/Popup";
import { Color } from "../../constant/color";
import { DataType, EyeDataType } from "../../constant/eyeDataType";
import { print, reset } from "../../redux/tempDataSlice";
import { Spacing } from "../../styles/size";
import s from "../../styles/styles";

import { useBackHandler } from "../../utils/utils";
import { styles } from "./styles";

/**
 * Screen for the user to view and edit eye data
 */
import {
  addData,
  removeData,
  proStoredMember,
} from "../../action/firebaseActions";
import { addDataRedux, removeDataRedux } from "../../redux/userSlice";

export default function EditData({ navigation, route }) {
  const { isCreate } = route.params;
  const checkIsPro = useSelector((state) => state.user.isPro);
  const UID = useSelector((state) => state.user.scannedUID);
  const name = useSelector((state) => state.user.scannedMemberName);
  useLayoutEffect(() => {
    console.log("temptdata", data);
    navigation?.setOptions({
      headerLeft: isCreate
        ? null
        : () => <GenericBackButton color={Color.secondary} onPress={goBack} />,
      headerRight: null,
    });
  }, []);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.tempData);
  const currentMember = useSelector((state) => state.user.currentMember);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible(!visible);

  const [contentHeight, setContentHeight] = useState(1);
  const [scrollViewHeight, setScrollViewHeight] = useState(1);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const scrollOffset = useRef(new Animated.Value(0)).current;
  const indicatorHeight =
    scrollViewHeight * Math.min(scrollViewHeight / contentHeight, 1);

  const scrollTranslateY = scrollOffset.interpolate({
    inputRange: [0, Math.max(contentHeight - scrollViewHeight, 0)],
    outputRange: [0, scrollViewHeight - indicatorHeight],
    extrapolate: "clamp",
  });

  function formatValue(value) {
    if (value === undefined || value === null) return null;
    return `${value >= 0 ? "+" : ""}${value?.toFixed(2)}`;
  }

  // prevent going back
  useBackHandler(() => (isCreate ? true : false));

  async function onDelete() {
    setLoading(true);
    dispatch(reset());
    if (
      !isCreate &&
      (data.type === DataType.eye || data.type === DataType.glasses)
    ) {
      // Delete local record and firebase record
      removeData(data);
      dispatch(removeDataRedux(data));
    } else {
      console.log("new data or invalid data, removed nothing");
    }

    setLoading(false);
    goBack();
  }
  function onConfirmPro(dataObject, UID, name) {
    addData(dataObject, UID);
    proStoredMember(UID, name);
  }

  async function onConfirm() {
    const dataObject = { ...data, modifiedTime: moment().unix() };
    dispatch(print());
    let insertFunction;

    if (data.type === DataType.eye || data.type === DataType.glasses)
      insertFunction = async () => {
        dispatch(addDataRedux(dataObject));
        {
          checkIsPro
            ? onConfirmPro(dataObject, UID, name)
            : await addData(dataObject);
        }
        //,
      };
    else {
      console.log("Data type is not eye or glasses");
      return;
    }

    setLoading(true);

    await insertFunction().then(
      (_) => {
        // on success
        Snackbar.show({
          text: I18n.t("EDIT_DATA.success"),
        });

        // show add glasses prompt
        if (data.type == DataType.eye) {
          setBottomSheetVisible(true);
        }

        // simply go back
        else if (data.type == DataType.glasses) {
          goBack();
        }
      },
      (reason) => {
        // on error
        console.debug(reason);
        Snackbar.show({
          text: I18n.t("EDIT_DATA.error"),
        });
      }
    );

    setLoading(false);
  }

  function goBack() {
    navigation?.goBack();
  }

  function Item({ label, values, dataKey }) {
    if (typeof values == "string") values = [values]; // convert into string array
    // 35% for label, 10% for icon, values flex the remaining
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.tableItemLabel}>{label}</Text>

        {values?.map((value, i) => (
          <Text key={i} style={styles.tableItemText}>
            {value ?? I18n.t("EDIT_DATA.notAvailable")}
          </Text>
        ))}

        {dataKey && (
          <Icon
            containerStyle={{
              width: "10%",
              alignItems: "center",
              paddingRight: 8,
            }}
            name="triangle"
            type="ionicon"
            color={Color.secondary}
            size={wp(5)}
            style={{
              alignSelf: "flex-end",
              rotation: 90,
            }}
            Component={TouchableOpacity}
            onPress={() => {
              // editData(dataKey);
              navigation?.push("EditSingleValue", { dataKey: dataKey });
            }}
          />
        )}
      </View>
    );
  }

  function TableTitle() {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "35%" }} />
        <View style={{ flex: 1 }}>
          {/* Spaces above and below the labels are 2:1 */}
          <View
            style={{ flexDirection: "row", marginTop: 32, marginBottom: 16 }}
          >
            <Text style={styles.tableHeader}>O.D.</Text>
            <Text style={styles.tableHeader}>O.S.</Text>
          </View>
        </View>
        <View style={{ width: wp(5), marginRight: 8 }} />
      </View>
    );
  }

  const BottomSheetContent = () => (
    <View style={{ paddingHorizontal: Spacing.h.medium, alignItems: "center" }}>
      <Text style={localStyles.sheetContentText}>
        {I18n.t("glassesUpdateMessage")}
      </Text>

      <RoundRectangleButton
        title={I18n.t("sure")}
        align="center"
        buttonStyle={{ width: wp(70) }}
        onPress={() => {
          dispatch(reset());
          navigation?.replace("AddGlassesData");
        }}
      />
      <RoundRectangleButton
        title={I18n.t("noThanks")}
        align="center"
        buttonStyle={{ width: wp(70) }}
        onPress={goBack}
      />
    </View>
  );
  const BottomSheetContentPro = () => (
    <View style={{ paddingHorizontal: Spacing.h.medium, alignItems: "center" }}>
      <RoundRectangleButton
        title="Go Back"
        align="center"
        buttonStyle={{ width: wp(70) }}
        onPress={goBack}
      />
    </View>
  );
  return (
    <View style={[s.screen.normal, s.backgroundColor.light]}>
      <Popup
        visible={visible}
        title="Warning"
        popupContent={
          <View style={{ width: "100%" }}>
            <Text
              style={[s.text.medium, s.color.main, s.text.googleSansMedium]}
            >
              {I18n.t("EDITDATA_warning")}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <RoundRectangleButton
                title={I18n.t("no")}
                containerStyle={{ width: "40%" }}
                onPress={toggleVisible}
              />
              <RoundRectangleButton
                title={I18n.t("yes")}
                containerStyle={{ width: "40%" }}
                onPress={onDelete}
              />
            </View>
          </View>
        }
        onDismiss={toggleVisible}
      />
      <Text style={styles.heading}>{I18n.t("editTitle")}</Text>
      <View style={{ height: hp(2.5) }} />

      <View
        style={{
          width: wp(100),
          flex: 1,
          paddingLeft: 32,
          flexDirection: "row",
        }}
      >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollOffset,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          onContentSizeChange={(_, height) => setContentHeight(height)}
          onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
        >
          <Item
            label={I18n.t("name")}
            values={currentMember?.name?.toString()}
          />
          <Item
            label={I18n.t("age")}
            values={(
              moment(data.checkDate).year() - currentMember?.birthYear
            ).toString()}
          />
          <Item
            label={I18n.t("height")}
            values={currentMember?.height?.toString()}
          />
          <Item
            label={I18n.t("date")}
            values={moment(data.checkDate).format("DD/MM/YY")}
          />

          {data.type === DataType.glasses && (
            <Item label={I18n.t("EDIT_DATA.glassesName")} values={data?.name} />
          )}

          <TableTitle />

          {data.type === DataType.eye && (
            <Item
              label="VA-U"
              values={[
                EyeDataType.vau.formatter(data?.od_vau),
                EyeDataType.vau.formatter(data?.os_vau),
              ]}
              dataKey="vau"
            />
          )}

          {data.type === DataType.eye && (
            <Item
              label="VA-A"
              values={[
                EyeDataType.vaa.formatter(data?.od_vaa),
                EyeDataType.vaa.formatter(data?.os_vaa),
              ]}
              dataKey="vaa"
            />
          )}

          <Item
            label="SPH"
            values={[formatValue(data?.od_sph), formatValue(data?.os_sph)]}
            dataKey="sph"
          />
          <Item
            label="CYL"
            values={[formatValue(data?.od_cyl), formatValue(data?.os_cyl)]}
            dataKey="cyl"
          />
          <Item
            label="Axis"
            values={[data?.od_axis, data?.os_axis]}
            dataKey="axis"
          />
          <Item label="PD" values={[data?.od_pd, data?.os_pd]} dataKey="pd" />
          {/* {data.type === DataType.eye && (
            <Item
              label="PD"
              values={
                data?.pd !== undefined
                  ? `${data.pd} ${I18n.t("mm")}`
                  : I18n.t("EDIT_DATA.notAvailable")
              }
              dataKey="pd"
            />
          )} */}
        </Animated.ScrollView>

        <Animated.View
          style={{
            backgroundColor: Color.secondary,
            height: indicatorHeight,
            width: 8,
            marginHorizontal: 12,
            borderRadius: 10,
            transform: [{ translateY: scrollTranslateY }],
          }}
        />
      </View>

      <View style={{ height: 16 }} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RoundRectangleButton
          title={I18n.t("delete")}
          containerStyle={{ width: wp(30) }}
          onPress={toggleVisible}
        />
        <RoundRectangleButton
          title={I18n.t("confirm")}
          containerStyle={{ width: wp(30) }}
          onPress={onConfirm}
        />
      </View>

      <BottomSheet
        visible={bottomSheetVisible}
        title={checkIsPro ? "Confirmed" : I18n.t("glassesUpdate")}
        sheetContent={
          checkIsPro ? <BottomSheetContentPro /> : <BottomSheetContent />
        }
        onDismiss={goBack}
      />

      {loading && <LoadingIndicator />}
    </View>
  );
}

const baseStyles = StyleSheet.create({
  button: {
    borderRadius: 40,
    padding: Spacing.h.small,
    marginHorizontal: Spacing.h.small,
  },
  buttonTitle: {
    ...s.text.small,
  },
});

const localStyles = StyleSheet.create({
  sheetContentText: {
    ...s.text.googleSansMedium,
    ...s.text.small,
    ...s.color.secondary,
    textAlign: "center",
  },
  confirmButton: {
    ...baseStyles.button,
    backgroundColor: Color.main,
  },
  confirmButtonTitle: {
    ...baseStyles.buttonTitle,
    color: Color.accent,
  },
  cancelButton: {
    ...baseStyles.button,
    backgroundColor: Color.background,
  },
  cancelButtonTitle: {
    ...baseStyles.buttonTitle,
    color: Color.secondary,
  },
});
