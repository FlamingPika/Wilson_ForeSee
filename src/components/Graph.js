import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Icon, Text, Button } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";

import Color from "../styles/color";
import moment from "moment";
import I18n from "i18n-js";
import s from "../styles/styles";
import { FontSize, Spacing, hp, wp, Size } from "../styles/size";
import { tempData } from "../redux/tempDataSlice";

/**
 * zoomable graph, showing the graph at different time scale
 * when zoom out, scale of x-axis = one year
 * when zoom in, scale of x-axis = quarter of a year
 *
 * @property data - list of eye data
 * @property showDots - whether to show dots on the graph
 * @property selectedEye - selected eye
 * @property setSelectedData - callback when data point is selected
 */
export const ZoomGraph = ({
  data,
  showDots = false,
  selectedEye,
  setSelectedData,
  color,
}) => {
  const [zoom, setZoom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayData, setdisplayData] = useState(data);

  const emptyData = () => ({
    L: {
      labels: [],
      datasets: [
        {
          data: [],
          color: () => color,
        },
      ],
    },
    R: {
      labels: [],
      datasets: [
        {
          data: [],
          color: () => color,
        },
      ],
    },
  });

  const [dataByYear, setDataByYear] = useState();
  const [dataBySeason, setDataBySeason] = useState();

  //const borderColor = data?.datasets[0]?.color?.() ?? Color.light; // border color is same as the color of datapoint

  useEffect(() => {
    if (data === undefined || data === null) {
      setLoading(true);
      return;
    }

    let tempByYear = emptyData();
    let tempBySeason = emptyData();

    Object.keys(data).forEach((key) => {
      let currentLabel =
        moment().year() - data[key].labels[0] <= 4
          ? moment().year() - 5 + 0.1
          : data[key].labels[0];
      let currentData = data[key].datasets[0].data[0];

      const maxLabel = data[key].labels[data[key].labels.length - 1];
      let index = 1;

      while (currentLabel <= maxLabel) {
        // if the new label has its data, set current data to it.
        if (currentLabel >= data[key].labels[index]) {
          currentData = data[key].datasets[0].data[index];
          index += 1;
        }
        // if current label end with .5 or is max, add a value to byyear and jump to next year

        tempBySeason[key].labels.push(currentLabel);
        tempBySeason[key].datasets[0].data.push(currentData);

        if (currentLabel == maxLabel) {
          tempByYear[key].labels.push(Math.trunc(currentLabel));
          tempByYear[key].datasets[0].data.push(currentData);
          break;
        }

        currentLabel = +(currentLabel + 0.1).toFixed(1);

        if (currentLabel % 1 == 0.5) {
          tempByYear[key].labels.push(Math.trunc(currentLabel));
          tempByYear[key].datasets[0].data.push(currentData);
          currentLabel = +(currentLabel + 0.6).toFixed(1);
        }
      }
    });

    setdisplayData(tempByYear);
    setDataBySeason(tempBySeason);
    setDataByYear(tempByYear);

    setLoading(false);
    /*
    console.log(tempByYear.R.labels);
    console.log(tempByYear.R.datasets[0].data);
    console.log(tempBySeason.labels);
    console.log(tempBySeason.datasets[0].data);
    */
  }, [data]);

  const changeDisplayData = () => {
    if (zoom) {
      setZoom(false);
      setdisplayData(dataByYear);
      console.log("changed false", displayData);
    } else {
      setZoom(true);
      setdisplayData(dataBySeason);
      console.log("changed true", displayData);
    }
  };

  //-------------To change eye title name without affecting variable name -----------
  //done on 12/8/2021 for eye title by Alpha
  // constant to display the title of graph
  const [eyeProblemTitle, setEyeProblemTitle] = useState(); // tochange eye problem data

  useEffect(() => {
    //ensure the data is defined
    if (data === null || data === undefined) {
      setLoading(true);
      return;
    }

    console.log("changing title");
    //switch case to set the title(not changing the varaible as the title are used in code)
    switch (data[selectedEye].title) {
      case "hyperopia":
        let GraphTitleHyperopia = I18n.t("GRAPH_hyperopia");
        return setEyeProblemTitle(GraphTitleHyperopia);
        break;

      case "myopia":
        let GraphTitleMyopia = I18n.t("GRAPH_myopia");
        return setEyeProblemTitle(GraphTitleMyopia);
        break;  
      case "Astigmatism":
        let GraphTitleAstigmatism = I18n.t("GRAPH_astigmatism");
        return setEyeProblemTitle(GraphTitleAstigmatism);
        break;
      case "Sample Data":
        return setEyeProblemTitle(I18n.t("GRAPH_sampleData"));
        break;
      default:
        console.log("eye problem title for graph need not to change");
        return setEyeProblemTitle(data[selectedEye].title);
  }}, [data]);

  //------------------------------------------------------------------
  return loading ? (
    <View></View>
  ) : (
    <View style={localStyles.graphContainer}>
      <Text
        style={[
          s.text.small,
          s.color.light,
          s.text.googleSansMedium,
          { marginVertical: Spacing.h.xxsmall },
        ]}
      >
        {eyeProblemTitle}
      </Text>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: Spacing.h.small,
          right: Spacing.h.large,
          borderRadius: 10,
          padding: Spacing.h.xxsmall,
          backgroundColor: s.rowColor.accent,
        }}
      >
        <Icon
          type="font-awesome-5"
          name={zoom ? "search-minus" : "search-plus"}
          size={20}
          onPress={changeDisplayData}
        />
      </TouchableOpacity>

      <ScrollView
        horizontal
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View style={localStyles.graphComponentContainer}>
          <Graph
            data={displayData[selectedEye]}
            width={
              zoom
                ? wp(displayData[selectedEye].labels.length * 12)
                : wp(displayData[selectedEye].labels.length * 15)
            }
            // These three are for detail graph screen
            setSelectedData={setSelectedData}
            showDots={showDots}
          />
        </View>
      </ScrollView>
    </View>
  );
};

/**
 * base graph component
 * @property data - list of eye data
 * @property height - height
 * @property width - width
 * @property setSelectedData - callback when data point is selected
 */

export const Graph = ({
  data,
  height = hp(25),
  width,
  setSelectedData,
  showDots,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const chartConfig = {
    backgroundGradientFrom: Color.chartBackground,
    backgroundGradientTo: Color.chartBackground,
    color: () => Color.light,
    useShadowColorFromDataset: true,
    fillShadowGradientOpacity: 1,
    propsForBackgroundLines: {
      strokeDasharray: "",
    },
    strokeWidth: 1,
    propsForHorizontalLabels: {
      fontSize: FontSize.xsmall,
    },
    propsForVerticalLabels: { fontSize: FontSize.xsmall },
  };

  //--------format the data for max and min value of y axis ----------------------------
  //done on 14/8/2021 for the graph to display correct y axis and y values by Alpha

  //-----------to get the correct max min value of y axis-----------
  //done on 30/7/2021 for y axis number by Alpha
  function GetevenNumberSmaller(min) {
    if (min % 2 == 0) {
      return min;
    } else {
      if (min < 0) {
        let n = 1;
        do {
          min = min + 2;
          n++;
        } while (min < 0);
        return -(n - 1) * 2;
      } else if (min > 0) {
        let n = 1;
        do {
          min = min - 2;
          n++;
        } while (min > 0);
        return (n - 1) * 2;
      } else if (min == 0) {
        return 0;
      }
    }
  }
  //to find the max of the value in the array we form
  function GetevenNumberbigger(max) {
    if (max % 2 == 0) {
      return max;
    } else {
      if (max < 0) {
        let n = 1;
        do {
          max = max + 2;
          n++;
        } while (max < 0);
        return -(n - 2) * 2;
      } else if (max > 0) {
        let n = 1;
        do {
          max = max - 2;
          n++;
        } while (max > 0);
        return (n - 1) * 2;
      } else if (max == 0) {
        return 0;
      }
    }
  }

  //-----------------------------------
  //to ouput data object for displayed data

  function changeDataPoint() {
    //ensure the the data is defined
    if (data === undefined || data === null) {
      return;
    }
    console.log("forming values for graph");
    console.log("data", data, data.datasets[0].data[0]);

    if (
      data.datasets[0].data[0] === undefined ||
      data.datasets[0].data[0] === null ||
      data.datasets[0].data[0] === NaN
    ) {
      console.log("data undefined");
      data.datasets[0].data[0] = [0, 0, 0, 0, 0];
      console.log("data undefined");
    } else {
      console.log("not included", data.datasets[0].data[0]);
    }
    //get a copy of the data
    const dataPoint = JSON.parse(JSON.stringify(data));
    //find the min value of y axis
    let bNew = GetevenNumberSmaller(
      Math.min.apply(null, data.datasets[0].data)
    );
    //find the max value of y axis
    let aNew = GetevenNumberbigger(Math.max.apply(null, data.datasets[0].data));
    //get array of data points of the copy of data
    let tempDataDatasetsData = dataPoint.datasets[0].data;
    //get the first data point of y values
    let firstData = dataPoint.datasets[0].data[0];
    //form new array for the data with max and min included and to smooth the curve. start with first data
    let newTempDataDatasetsData = [
      { data: [firstData, ...tempDataDatasetsData] },
      { data: [bNew] },
      { data: [aNew] },
    ];
    //get the x axis array of the data
    let tempLabel = dataPoint.labels;
    //form new array for the x axis data, the first data is null as it wont be
    let newTempLabel = [null, ...tempLabel];

    //update the data to be shown with all the array adjusted above included
    let tempData = dataPoint;
    tempData.datasets = newTempDataDatasetsData;
    tempData.labels = newTempLabel;
    //return the array to be set as the display data
    return tempData;
  }
  //-----------------------------------------------------------------

  return (
    <LineChart
      bezier
      fromZero
      segments={4}
      data={changeDataPoint()}
      height={height}
      width={width}
      chartConfig={chartConfig}
      withDots={showDots}
      withVerticalLines={false}
      hidePointsAtIndex={[0]} // to hide the first data point as it only contains the max min value
      onDataPointClick={({ index }) => {
        setSelectedIndex(index);
        setSelectedData(data.datasets[0].data[index - 1]);
      }}
      getDotProps={(_, index) => ({
        fill: index == selectedIndex ? Color.accent : Color.light,
        r: index == selectedIndex ? Size.h.small / 2 : Size.h.xsmall / 2,
      })}
    />
  );
};

const localStyles = StyleSheet.create({
  graphContainer: {
    height: hp(31),
    width: wp(94),
    borderRadius: 20,
    paddingTop: Spacing.h.xsmall,
    paddingHorizontal: Spacing.h.medium,
    alignItems: "center",
    backgroundColor: Color.chartBackground,
  },
  linearBorder: {
    padding: 1,
    borderRadius: 20,
  },
  graphComponentContainer: {
    flex: 1,
  },
});
