import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TrackPlayer, {
  useTrackPlayerProgress,
  useProgress,
} from "react-native-track-player";

import { LinearProgress } from "react-native-elements";

import Color from "../../styles/color";

// import styles from "../../styles/styles";

/**
 * Component that shows the current progress of a audio track
 */
/*
        <LinearProgress
          value={this.getProgress()}
          variant="determinate"
          color={Color.main}
          trackColor={Color.background}
        />
*/
/*
function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);
    const elapsed = minutesAndSeconds(this.state.position);
    const audioDuration = minutesAndSeconds(this.state.duration);
            <Text>{elapsed[0] + ":" + elapsed[1]}</Text>
            <Text>{audioDuration[0] + ":" + audioDuration[1]}</Text>
*/

//supporting functions for displaying the time in xx:xx way
function pad(n, width, z = 0) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
const minutesAndSeconds = (position) => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
];
const minutesAndSecondsForElapsed = (position) => [
  pad(Math.floor(position / 60), 2),
  pad(Math.floor(position % 60), 2),
];
function DurationDisplay({ params }) {
  var audioDuration = [0, 0];

  audioDuration = minutesAndSeconds(params);
  return (
    <Text style={{ width: 32, fontSize: 10, marginLeft: 5, marginTop: 5 }}>
      {" "}
      {audioDuration[0] + ":" + audioDuration[1]}
    </Text>
  );
}

function ElapsedDisplay({ params }) {
  var elapsed = [0, 0];
  elapsed = minutesAndSecondsForElapsed(params);
  return (
    <Text style={{ width: 32, fontSize: 10, marginRight: 5, marginTop: 5 }}>
      {" "}
      {elapsed[0] + ":" + elapsed[1]}
    </Text>
  );
}

let musicProgressBarPosition = 0;
let musicProgressBarDuration = 0;

export default class MusicProgressBar extends TrackPlayer.ProgressComponent {
  render() {
    musicProgressBarPosition = this.state.position;
    musicProgressBarDuration = this.state.duration;
    return (
      // Note: formatTime and ProgressBar are just examples:
      <View style={styles.viewBar}>
        <ElapsedDisplay params={this.state.position} />
        <LinearProgress
          value={this.getProgress()}
          variant="determinate"
          color={Color.main}
          trackColor={Color.background}
        />
        <DurationDisplay params={this.state.duration} />
      </View>
    );
  }
}

export { musicProgressBarPosition };
export { musicProgressBarDuration };

const styles = StyleSheet.create({
  viewBar: {
    paddingRight: 75,
    flexDirection: "row",
  },
});
