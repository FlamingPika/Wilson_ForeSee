import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import STYLES from "../../constant/styles";
import { Color } from "../../constant/color";
import I18n from "i18n-js";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import DatePicker from "../../components/DatePicker";
import { QuestionButton, RoundedButton } from "../../components/Buttons";
import { dataLabels } from "../../constant/dataLabels";
import { optimizeHeavyScreen } from "react-navigation-heavy-screen";
import { Appointments } from "../../sampledata/DummyData";

export default optimizeHeavyScreen(PatientDetails, Loading, {
  transition: null,
});

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.main,
      }}
    >
      <ActivityIndicator size="large" color={Color.accent} />
    </View>
  );
}

/**
 * Shows detail of a selected patient; used in professional mode
 */
function PatientDetails({ route, navigation }) {
  const patient = route?.params?.patient;

  function ProfileCard() {
    return (
      <View style={styles.profile}>
        <Image
          source={{
            uri: patient?.profile_pic,
          }}
          style={styles.profileImage}
        />

        <View style={styles.profileContent}>
          <Text style={styles.profileTitle}>{patient?.name}</Text>

          <Text style={styles.profileText}>{`${I18n.t("lastAppointment")} :\n${
            Appointments.find((i) => i.memberId == patient?.id)?.date
          }`}</Text>
          <Text style={styles.profileText}>{`${I18n.t(
            "seeDetailedInfo"
          )} >`}</Text>
        </View>
      </View>
    );
  }

  function DataTable() {
    function Header() {
      return (
        <View style={styles.tableHeader}>
          <View style={styles.tableText} />
          <Text style={styles.tableText}>O.S.</Text>
          <Text style={styles.tableText}>O.D.</Text>
        </View>
      );
    }

    function Item({ label, value1, value2, style }) {
      return (
        <View style={{ ...styles.tableItem, ...style }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.tableLabel}>{label}</Text>
          </View>
          <View style={{ flex: 2, flexDirection: "row" }}>
            <Text style={styles.tableText}>{value1}</Text>
            {value2 && <Text style={styles.tableText}>{value2}</Text>}
          </View>
        </View>
      );
    }

    const eyecheckData = patient?.eyecheckData;
    const keys = ["sph", "cyl", "axis", "vau", "vaa"];
    const items = keys.map((key) => (
      <Item
        key={key}
        label={dataLabels[key]}
        value1={eyecheckData?.[key]?.os ?? "-"}
        value2={eyecheckData?.[key]?.od ?? "-"}
        style={{ marginBottom: 12 }}
      />
    ));

    return (
      <ScrollView style={styles.table}>
        <Header />
        {items}
        <Item
          label={dataLabels["pd"]}
          value1={eyecheckData?.pd ? eyecheckData.pd + "mm" : "-"}
        />
      </ScrollView>
    );
  }

  return (
    <View style={{ ...STYLES.view.container, backgroundColor: Color.main }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            ...STYLES.text.heading,
            color: "white",
            alignSelf: "flex-start",
          }}
        >
          {I18n.t("details")}
        </Text>
        <QuestionButton color={Color.accent} />
      </View>

      <View style={{ height: 20 }} />
      <ProfileCard />

      <View style={{ height: 20 }} />
      <View style={{ height: hp(15), width: "100%" }}>
        <DatePicker
          textColor="white"
          selectedTextColor={Color.secondary}
          arrowColor={Color.background}
          calendarColor={Color.background}
        />
      </View>

      <View
        style={{
          width: wp(60),
          height: 0.5,
          backgroundColor: Color.background,
          marginVertical: 20,
        }}
      />

      <DataTable />

      <RoundedButton
        title={I18n.t("addData")}
        titleStyle={styles.addDataButtonTitle}
        style={styles.addDataButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    backgroundColor: Color.background,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileContent: {
    marginHorizontal: 30,
  },
  profileTitle: {
    color: Color.main,
    fontSize: 20,
  },
  profileText: {
    color: Color.secondary,
    fontSize: 15,
    marginTop: 8,
  },
  table: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  tableHeader: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 12,
  },
  tableItem: {
    backgroundColor: "#186A34",
    borderRadius: 10,
    padding: 8,
    width: "100%",
    flexDirection: "row",
  },
  tableLabel: {
    fontSize: 20,
    color: "white",
    flex: 1,
    textAlign: "left",
    paddingLeft: 20,
  },
  tableText: {
    fontSize: 20,
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  addDataButtonTitle: {
    color: Color.main,
    fontSize: 20,
  },
  addDataButton: {
    padding: 12,
    borderRadius: 30,
    width: "60%",
    backgroundColor: Color.background,
  },
});
