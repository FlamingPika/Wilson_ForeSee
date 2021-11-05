import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RoundedButton } from "../../components/Buttons";
import { Color } from "../../constant/color";
import I18n from "i18n-js";
import Accordion from "react-native-collapsible/Accordion";
import { withOpacity } from "../../utils/utils";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import s from "../../styles/styles";
import { Size, Spacing } from "../../styles/size";

/**
 * expandable item for displaying glasses and its details
 */
function GlassesItems({ glassesData }) {
  // just a placeholder if data is not available
  const notAvailableText = "n/a";
  const [activeSections, setActiveSections] = useState([]);

  function onEditData() {
    // TODO do something
  }

  function Header(data) {
    return <Text style={styles.header}>{data.name}</Text>;
  }

  function Content(data) {
    return (
      <View style={styles.content}>
        <Text style={{ ...styles.text, textAlign: "left" }}>
          {`${I18n.t("duration")} : ${data.duration ?? notAvailableText}`}
        </Text>
        <Text style={{ ...styles.text, textAlign: "left" }}>
          {`${I18n.t("data")} : `}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }} />
          <Text style={styles.subtitle}>O.S.</Text>
          <Text style={styles.subtitle}>O.D.</Text>
        </View>

        {["sph", "cyl", "axis"].map((dataKey) => {
          return (
            <View key={dataKey} style={{ flexDirection: "row" }}>
              <Text
                style={{ ...styles.text, textAlign: "left" }}
              >{`${dataKey.toUpperCase()} : `}</Text>

              <Text style={styles.text}>
                {data[dataKey]?.os ?? notAvailableText}
              </Text>

              <Text style={styles.text}>
                {data[dataKey]?.od ?? notAvailableText}
              </Text>
            </View>
          );
        })}

        <RoundedButton
          title={I18n.t("editData")}
          style={styles.editButton}
          titleStyle={styles.editButtonTitle}
          onPress={onEditData}
        />
      </View>
    );
  }

  function updateSections(activeSections) {
    setActiveSections(activeSections);
  }

  return (
    <Accordion
      sections={glassesData}
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

/**
 * The content of the view glasses popup in graph screen
 */
export default function GlassesPopupContent({ glassesData, onAddGlasses }) {
  return (
    <View style={styles.popupContent}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <GlassesItems glassesData={glassesData} />
        <RoundedButton
          title={`+ ${I18n.t("addGlasses")}`}
          style={styles.addGlassesButton}
          titleStyle={styles.addGlassesButtonTitle}
          onPress={onAddGlasses}
        />
      </ScrollView>
    </View>
  );
}

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
  addGlassesButton: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: withOpacity(Color.background, 0.4),
  },
  addGlassesButtonTitle: {
    ...s.color.main,
    ...s.text.medium,
  },
});
