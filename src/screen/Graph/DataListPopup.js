import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { RoundedButton, RoundRectangleButton } from "../../components/Buttons";
import { Color } from "../../constant/color";
import I18n from "i18n-js";
import Accordion from "react-native-collapsible/Accordion";
import { withOpacity } from "../../utils/utils";

import {
  eyeDataTypeKeys,
  glassesDataTypeKeys,
} from "../../constant/eyeDataType";

import s from "../../styles/styles";
import { Size, Spacing, hp, wp } from "../../styles/size";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { pushData } from "../../redux/tempDataSlice";

/**
 * expandable item for displaying glasses and its details
 */
function DataList({ dataHistoryArray, onEditData }) {
  const dispatch = useDispatch();
  const checkIsPro = useSelector((state) => state.user.isPro);
  const Scanned = useSelector((state) => state.user.qrScanned);
  const notAvailableText = "n/a";
  const [activeSections, setActiveSections] = useState([]);

  function editData(data) {
    dispatch(pushData(data));
    onEditData();
  }

  const Header = (data) => (
    <Text style={styles.header}>
      {moment(data.checkDate).format("YYYY-MM-DD")}
    </Text>
  );

  function Content(data) {
    const dataTitle =
      data.type === "glasses" ? glassesDataTypeKeys : eyeDataTypeKeys;

    return (
      <View style={styles.content}>
        {/*<Text style={{ ...styles.text, textAlign: "left" }}>
          {`${I18n.t("duration")} : ${data.duration ?? notAvailableText}`}
        </Text>*/}

        <Text style={{ ...styles.text, textAlign: "left" }}>
          {`${I18n.t("data")} : `}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }} />
          <Text style={styles.subtitle}>O.S.</Text>
          <Text style={styles.subtitle}>O.D.</Text>
        </View>

        {dataTitle.map((dataKey) => {
          return (
            <View key={dataKey} style={{ flexDirection: "row" }}>
              <Text
                style={{ ...styles.text, textAlign: "left" }}
              >{`${dataKey.toUpperCase()} : `}</Text>

              <Text style={styles.text}>
                {data["os_" + dataKey] ?? notAvailableText}
              </Text>

              <Text style={styles.text}>
                {data["od_" + dataKey] ?? notAvailableText}
              </Text>
            </View>
          );
        })}

        {!checkIsPro || (checkIsPro && Scanned) ? (
          <RoundedButton
            title={I18n.t("editData")}
            style={styles.editButton}
            titleStyle={styles.editButtonTitle}
            onPress={() => editData(data)}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }

  return (
    <Accordion
      sections={dataHistoryArray}
      renderHeader={Header}
      renderContent={Content}
      activeSections={activeSections}
      onChange={setActiveSections}
      touchableComponent={TouchableOpacity}
      sectionContainerStyle={{
        backgroundColor: Color.background,
        marginBottom: Spacing.h.medium,
        borderRadius: 20,
      }}
    />
  );
}

export default ({ dataHistoryArray, onEditData, onAddData }) => {
  console.log(dataHistoryArray);
  const checkIsPro = useSelector((state) => state.user.isPro);
  const Scanned = useSelector((state) => state.user.qrScanned);

  return (
    <View style={styles.popupContent}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <DataList dataHistoryArray={dataHistoryArray} onEditData={onEditData} />
      </ScrollView>
      {!checkIsPro || (checkIsPro && Scanned) ? (
          <RoundRectangleButton
            onPress={onAddData}
            icon={
              <Icon
                name="plus"
                type="font-awesome-5"
                iconStyle={{
                  color: "white",
                }}
              />
            }
          />
        ) : (
          <></>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  popupContent: {
    maxHeight: hp(60),
    width: "100%",
    paddingBottom: Spacing.h.medium,
  },
  scrollViewContent: {
    paddingHorizontal: Spacing.h.medium,
  },
  header: {
    ...s.color.main,
    ...s.text.medium,
    ...s.backgroundColor.background,
    textAlign: "center",
    padding: Spacing.h.medium,
    borderRadius: Size.h.small,
    width: "100%",
  },
  content: {
    backgroundColor: Color.background,
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: Spacing.h.medium,
  },
  subtitle: {
    ...s.text.small,
    color: Color.secondary,
    flex: 1,
    textAlign: "center",
    marginVertical: 4,
  },
  text: {
    ...s.text.small,
    color: Color.secondary,
    flex: 1,
    textAlign: "center",
    marginVertical: 4,
  },
  editButton: {
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 30,
    backgroundColor: withOpacity(Color.secondary, 0.4),
    alignSelf: "center",
    marginVertical: 12,
  },
  editButtonTitle: {
    ...s.text.small,
    color: Color.white,
    fontFamily: "GoogleSans-Medium",
  },
});
