/* 

This screen is not used!!

*/

import React from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { TouchGraph } from "../../components/Graph";
import { LRButtonGroup } from "../../components/gidget";
import Styles from "../../constant/styles";
import { setSelectedEye } from "../../redux/selectedEyeSlice";
import { useSelector, useDispatch } from "react-redux";
import Color from "../../styles/color";
import { useApolloClient, useQuery } from "@apollo/client";
import * as Queries from "../../utils/queries";

export default function GraphScreen({ navigation }) {
  const buttons = ["Left", "Right"];

  const selectedEye = useSelector((state) => state.selectedEye);
  const dispatch = useDispatch();

  const { currentMember } = useSelector((state) => state.user);
  // fetch eye check data
  const { loading, error, data } = useQuery(Queries.GET_EYE_CHECK_DATA, {
    variables: {
      member_id: currentMember?.id,
    },
    client: useApolloClient(),
  });
  const eyeCheckData = data?.eye_check_data;

  const data1 = {
    datasets: [
      {
        data: eyeCheckData?.map((e) => e.od_sph) ?? [],
        color: () => Color.chartBlue,
      },
    ],
    title: "Hyperopia",
  };

  const data2 = {
    datasets: [
      {
        data: eyeCheckData?.map((e) => e.od_sph) ?? [],
        color: () => Color.chartPink,
      },
    ],
    title: "Myopia",
  };
  const data3 = {
    datasets: [
      {
        data: eyeCheckData?.map((e) => e.od_cyl) ?? [],
        color: () => Color.chartYellow,
      },
    ],
    title: "Astigmatism",
  };

  return (
    <SafeAreaView style={Styles.view.darkGreenContainer}>
      <View style={Styles.view.content}>
        <Text style={[Styles.text.title]}>Trends</Text>
        <ScrollView contentContainerStyle={localStyles.graphsContainer}>
          <LRButtonGroup
            setSelection={
              (value) => dispatch(setSelectedEye(value == 0 ? "L" : "R")) // convert 0/1 to L/R state
            }
            selection={selectedEye == "L" ? 0 : 1} // convert L/R state to 0/1
            buttons={buttons}
          />
          <TouchGraph data={data1} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  graphsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: heightPercentageToDP(14.5),
  },
});
