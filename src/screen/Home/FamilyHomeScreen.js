// React
import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Icon } from "react-native-elements";

import { setSelectedEye } from "../../redux/selectedEyeSlice";
import { useDispatch, useSelector } from "react-redux";

import I18n from "i18n-js";
import PagerView from "react-native-pager-view";

// Custom Components
import { ZoomGraph } from "../../components/Graph";
import { QuestionButton, RoundedButton } from "../../components/Buttons";
import { ProceedButton } from "../../components/gidget";
import Color from "../../styles/color";

// Styles
import { hp, wp, Size, Spacing } from "../../styles/size";
import s from "../../styles/styles";

/**
 * Home screen in the family user mode
 */
export default function FamilyHomeScreen({ navigation }) {
  const { createdTime, currentMember, memberList } = useSelector(
    (state) => state.user
  );

  const [selectedEye, setSelectedEye] = useState("L");
  const [dataForGraph, setDataForGraph] = useState(null);

  const dispatch = useDispatch();

  // pager related
  const pagerRef = useRef();
  const [pagerIdx, setPagerIdx] = useState(0);

  const emptyDataForGraph = () => ({
    title: "",
    labels: [],
    datasets: [{ data: [] }],
  });

  const titleForGraph = [
    ["hyperopia", "os_sph", "od_sph", 1],
    ["myopia", "os_sph", "od_sph", -1],
    ["Astigmatism", "os_cyl", "od_cyl", 1],
  ];

  useEffect(() => {
    if (
      currentMember != null &&
      Object.keys(currentMember?.eyeDataHistory).length != 0
    ) {
      console.log("current member has eye data history");
      let dataForAllGraph = [];
      for (let title of titleForGraph) {
        dataForOneGraph = { L: emptyDataForGraph(), R: emptyDataForGraph() };
        dataForOneGraph.L.title = title[0];
        dataForOneGraph.R.title = title[0];
        console.log(" dataForOneGraph.L.title", dataForOneGraph.L.title);

        Object.keys(currentMember.eyeDataHistory).forEach((key) => {
          let LeftEyeData = currentMember.eyeDataHistory[key][title[1]];
          let RightEyeData = currentMember.eyeDataHistory[key][title[2]];
          dataForOneGraph.L.labels.push(
            currentMember.eyeDataHistory[key].checkSeason
          );
          console.log("LeftEyeDat before", LeftEyeData);
          if (LeftEyeData == undefined || LeftEyeData == null) {
            console.log("left data is undefined");
            LeftEyeData = 0;
          }
          switch (dataForOneGraph.L.title) {
            case "hyperopia":
              if (LeftEyeData <= 0) {
                LeftEyeData = 0;
              }
              break;
            case "myopia":
              if (LeftEyeData >= 0) {
                LeftEyeData = 0;
              } else {
                LeftEyeData = -1 * LeftEyeData;
              }
              break;
            case "Astigmatism":
              break;
            default:
              console.log(
                "familyhomescreen error",
                dataForOneGraph.L.title,
                LeftEyeData
              );
              LeftEyeData = 0;
              break;
          }
          console.log("LeftEyeDat after", LeftEyeData);
          dataForOneGraph.L.datasets[0].data.push(LeftEyeData * title[3]);
          dataForOneGraph.R.labels.push(
            currentMember.eyeDataHistory[key].checkSeason
          );
          if (RightEyeData == undefined || RightEyeData == null) {
            RightEyeData = 0;
            console.log("right data is undefined");
          }
          console.log("RightEyeDat before", RightEyeData);
          switch (dataForOneGraph.R.title) {
            case "hyperopia":
              if (RightEyeData <= 0) {
                RightEyeData = 0;
              }
              break;
            case "myopia":
              if (RightEyeData >= 0) {
                RightEyeData = 0;
              } else {
                RightEyeData = -1 * RightEyeData;
              }
              break;
            case "Astigmatism":
              break;
            default:
              console.log(
                "familyhomescreen error",
                dataForOneGraph.R.title,
                RightEyeData
              );
              RightEyeData = 0;
              break;
          }
          console.log("RightEyeDat after", RightEyeData);
          dataForOneGraph.R.datasets[0].data.push(RightEyeData * title[3]);
        });
        dataForAllGraph.push(dataForOneGraph);
      }

      setDataForGraph(dataForAllGraph);
    } else {
      console.log("current member does not have eye data history");
      setDataForGraph([
        {
          L: {
            title: "Sample Data",
            labels: [2015.1, 2017.1, 2018.1, 2020.4],
            datasets: [{ data: [0.5, 0.55, 0.6, 0.65] }],
          },
          R: {
            title: "Sample Data",
            labels: [2015.1, 2017.1, 2018.1, 2020.4],
            datasets: [{ data: [0.5, 0.55, 0.6, 0.65] }],
          },
        },
        {
          L: {
            title: "Sample Data",
            labels: [2015.1, 2017.1, 2018.1, 2020.4],
            datasets: [{ data: [0.5, 0.55, 0.6, 0.65] }],
          },
          R: {
            title: "Sample Data",
            labels: [2015.1, 2017.1, 2018.1, 2020.4],
            datasets: [{ data: [0.5, 0.55, 0.6, 0.65] }],
          },
        },
        {
          L: {
            title: "Sample Data",
            labels: [2015.1, 2017.1, 2018.1, 2020.4],
            datasets: [{ data: [0.5, 0.55, 0.6, 0.65] }],
          },
          R: {
            title: "Sample Data",
            labels: [2015.1, 2017.1, 2018.1, 2020.4],
            datasets: [{ data: [0.5, 0.55, 0.6, 0.65] }],
          },
        },
      ]);
    }
    console.log("account created on", createdTime);
  }, [currentMember?.eyeDataHistory]);

  function EyeButtons() {
    function iconProps(eye) {
      const isSelected = changeLangSelectedEye(eye) == selectedEye;
      console.log(isSelected, eye, selectedEye);

      function changeLangSelectedEye(eyeBefore) {
        if (I18n.locale == "EN") {
          return eyeBefore;
        } else {
          switch (eyeBefore) {
            case "左":
              return "L";
              break;
            case "右":
              return "R";
              break;
            default:
              console.log(
                "error the variable name of left right eyes are abnormal",
                eyeBefore
              );
              return "L";
          }
        }
      }

      return {
        rounded: true,
        size: Size.h.large,
        title: eye,
        containerStyle: {
          borderWidth: isSelected ? 0 : 2,
          borderColor: Color.background,
          backgroundColor: isSelected ? Color.background : Color.main,
        },
        titleStyle: {
          color: isSelected ? "white" : Color.background,
          ...s.text.medium,
          ...s.text.googleSansMedium,
        },
        onPress: () => setSelectedEye(changeLangSelectedEye(eye)),
      };
    }
    if (I18n.locale == "EN") {
      return (
        <View
          style={{
            flexDirection: "row",
            paddingRight: Spacing.h.xsmall,
            alignItems: "center",
          }}
        >
          <Avatar {...iconProps("R")} />
          <View style={{ width: Spacing.h.small }} />
          <Avatar {...iconProps("L")} />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: "row",
            paddingRight: Spacing.h.xsmall,
            alignItems: "center",
          }}
        >
          <Avatar {...iconProps("右")} />
          <View style={{ width: Spacing.h.small }} />
          <Avatar {...iconProps("左")} />
        </View>
      );
    }
  }

  function ExploreButtons() {
    const itemSep = Spacing.h.large;

    return (
      <View
        style={{
          width: "100%",
          paddingHorizontal: Spacing.h.small,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <RoundedButton
            title={I18n.t("exercise")}
            style={styles.exploreButton}
            titleStyle={styles.exploreButtonTitle}
            onPress={() => navigation.navigate("ExerciseStack")}
          />
          <View style={{ width: itemSep }} />
          <RoundedButton
            title={I18n.t("profile")}
            style={styles.exploreButton}
            titleStyle={styles.exploreButtonTitle}
            onPress={() => navigation.navigate("ProfileStack")}
          />
        </View>

        <View style={{ height: itemSep }} />

        <View style={{ flexDirection: "row" }}>
          <RoundedButton
            title={I18n.t("qna")}
            style={styles.exploreButton}
            titleStyle={styles.exploreButtonTitle}
            onPress={() => navigation.navigate("QnAStack")}
          />
          <View style={{ width: itemSep }} />
          <RoundedButton
            title={I18n.t("article")}
            style={styles.exploreButton}
            titleStyle={styles.exploreButtonTitle}
            onPress={() => navigation.navigate("ArticleStack")}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[s.screen.normal, s.backgroundColor.main]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1.5,
        }}
      >
        <Text
          style={[s.text.large, s.color.light, { flex: 1 }]}
          numberOfLines={1}
        >
          {I18n.t("hello") +
            (currentMember?.name ? `, ${currentMember?.name}` : "") +
            "!"}
        </Text>
        {/* <QuestionButton color={Color.accent} /> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flex: 1.35,
        }}
      >
        <Text style={[s.text.medium, s.color.light, { flex: 1 }]}>
          {I18n.t("latestTrend")}
        </Text>
        <EyeButtons />
      </View>
      <View style={{ height: Spacing.h.small, flex: 1 }} />

      <View
        style={{
          height: hp(36),
          width: wp(95),
          justifyContent: "center",
          alignItems: "center",
          flex: 11,
        }}
      >
        <PagerView
          style={{
            flex: 8,
          }}
          onPageSelected={(e) => setPagerIdx(e.nativeEvent.position)}
          scrollEnabled={false}
          ref={pagerRef}
        >
          <ZoomGraph
            key="1"
            data={dataForGraph?.[0]}
            selectedEye={selectedEye}
            color={s.rowColor.chartBlue}
          />

          <ZoomGraph
            key="2"
            data={dataForGraph?.[1]}
            selectedEye={selectedEye}
            color={s.rowColor.chartPink}
          />
          <ZoomGraph
            key="3"
            data={dataForGraph?.[2]}
            selectedEye={selectedEye}
            color={s.rowColor.chartYellow}
          />
        </PagerView>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            flex: 1.5,
          }}
        >
          <Icon
            name="triangle-left"
            type="entypo"
            size={Size.h.large}
            color={s.rowColor.secondary}
            Component={TouchableOpacity}
            onPress={() => pagerRef?.current?.setPage((pagerIdx + 3 - 1) % 3)} // +3 to make pagerIdx positive for mod to work
          />
          <Icon
            name="triangle-right"
            type="entypo"
            size={Size.h.large}
            color={s.rowColor.secondary}
            Component={TouchableOpacity}
            onPress={() => pagerRef?.current?.setPage((pagerIdx + 1) % 3)}
          />
        </View>
      </View>
      <View style={{ height: Spacing.h.small, flex: 0.5 }} />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: Spacing.h.small,
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text style={[s.text.small, s.color.light, s.text.googleSansMedium]}>
          {I18n.t("viewReport")}
        </Text>
        <ProceedButton
          onPress={() =>
            navigation.navigate("AddDataStack", {
              screen: "GraphDetail",
              params: {
                data: dataForGraph?.[pagerIdx],
                selectedEyeProps: selectedEye,
              },
            })
          }
        />
      </View>

      <View style={{ flex: 0.25 }} />
      <Text style={[s.text.medium, s.color.light, { alignSelf: "flex-start" }]}>
        {I18n.t("explore")}
      </Text>
      <View style={{ height: Spacing.h.large }} />
      <ExploreButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 35,
    color: "white",
    textAlign: "left",
  },
  subheading: {
    fontSize: 25,
    color: "white",
    textAlign: "left",
  },
  text: {
    fontSize: 17,
    color: "white",
  },
  exploreButton: {
    borderRadius: Size.h.small,
    backgroundColor: Color.secondary,
    padding: Spacing.h.small,
    flex: 1,
  },
  exploreButtonTitle: {
    ...s.text.small,
    ...s.color.light,
  },
});
