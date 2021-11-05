import React, { useState, useRef, useEffect} from "react";
import { TouchableOpacity, StyleSheet, View, Text, Image} from "react-native";
import { Button, LinearProgress, Icon } from "react-native-elements";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import TrackPlayer, {
  TrackPlayerEvents,
  useTrackPlayerProgress,
  useTrackPlayerEvents,
  STATE_PLAYING,
} from "react-native-track-player";

import s from "../../styles/styles";
import { s as scale } from "react-native-size-matters";
import { Size, Spacing } from "../../styles/size";

import Color from "../../styles/color";

import MusicProgressBar, {
  musicProgressBarDuration,
  musicProgressBarPosition,
} from "./MusicProgressBar";

import { useSelector } from "react-redux";
import { incrementStreakNumber } from "../../action/firebaseActions";


import I18n from "i18n-js";

/**
 * Screen that plays the selected eye exercise audio track
 */
export default function EyeExerciseDetailScreen({
  lang,
  changeLang,
  navigation,
  route,
  ...props
}) {
  // edit the track number of eye exercises here(for one single language)
  const trackNumber = 5;

  let trackid = route.params.currentExerciseID;
  // Audio setup
  // 0-4 EN, 5-9 SC, 10-14 TC audio tracks
  // trackNumber*0+trackid=EN, trackNumber*1+trackid=SC, trackNumber*2+trackid=TC
  // !!need further update both chinese version description in I18n translation files
  // duration is hardcoded and obtained from duration display of window media player
  const locale = I18n.locale;
  const tracks = [
    {
      id: 0,
      url: require("../../assets/audios/edited/eye_ex_1_eng.mp3"),
      duration: 57,
      title: "20-20-20EN",
    },
    {
      id: 1,
      url: require("../../assets/audios/edited/eye_ex_2_eng.mp3"),
      duration: 132,
      title: "BlinkBreakEN",
    },
    {
      id: 2,
      url: require("../../assets/audios/edited/eye_ex_3_eng.mp3"),
      duration: 103,
      title: "PalmsEN",
    },
    {
      id: 3,
      url: require("../../assets/audios/edited/eye_ex_4_eng.mp3"),
      duration: 279,
      title: "Figure8EN",
    },
    {
      id: 4,
      url: require("../../assets/audios/edited/eye_ex_5_eng.mp3"),
      duration: 88,
      title: "NearAndFarEN",
    },
    {
      id: 5,
      url: require("../../assets/audios/edited/eye_ex_1_putonghua.mp3"),
      duration: 50,
      title: "20-20-20SC",
    },
    {
      id: 6,
      url: require("../../assets/audios/edited/eye_ex_2_putonghua.mp3"),
      duration: 131,
      title: "BlinkBreakSC",
    },
    {
      id: 7,
      url: require("../../assets/audios/edited/eye_ex_3_putonghua.mp3"),
      duration: 91,
      title: "PalmsSC",
    },
    {
      id: 8,
      url: require("../../assets/audios/edited/eye_ex_4_putonghua.mp3"),
      duration: 274,
      title: "Figure8SC",
    },
    {
      id: 9,
      url: require("../../assets/audios/edited/eye_ex_5_putonghua.mp3"),
      duration: 90,
      title: "NearAndFarSC",
    },
    {
      id: 10,
      url: require("../../assets/audios/edited/eye_ex_1_cantonese.mp3"),
      duration: 53,
      title: "20-20-20TC",
    },
    {
      id: 11,
      url: require("../../assets/audios/edited/eye_ex_2_cantonese.mp3"),
      duration: 117,
      title: "BlinkBreakTC",
    },
    {
      id: 12,
      url: require("../../assets/audios/edited/eye_ex_3_cantonese.mp3"),
      duration: 91,
      title: "PalmsTC",
    },
    {
      id: 13,
      url: require("../../assets/audios/edited/eye_ex_4_cantonese.mp3"),
      duration: 270,
      title: "Figure8TC",
    },
    {
      id: 14,
      url: require("../../assets/audios/edited/eye_ex_5_cantonese.mp3"),
      duration: 94,
      title: "NearAndFarTC",
    },
  ];

  TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_STOP,
    ],
    /*
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
    ],
    */
  });

  // Audio setup end

  // These two states are used to control the context on the screen
  // play === false, start === true: show start button
  // play === false, start === false: show count down
  // play === true: show exercise instructions
  const COUNT = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(COUNT);
  const [playing, setPlaying] = useState(false); // true for play, false for pause
  const [check, setCheck] = useState(false); // use in checking whether the audio started or not, in order to trigger the checkEnd() and ->
  // prevent trigger checkEnd() before the upcoming 2nd audio is started, as the complete screen may pops up when opening 2nd audio in screen0/1
  // after the 1st finished
  const [end, setEnd] = useState(false); // use in checking the end of song, true when song reaches the end. Cooperate with check in useEffect to trigger the complete screen and increment of streakNumber
  const countDown = useRef(null);
  const intervalDown = useRef(null); // use in clearInterval() of checkEnd(), by marking down the intervalID
  const startTimer = () => {
    setCurrentPage(1);
    // some times setCount can not get the updated count from previous loop, so it cause the countdown process to lag.
    let c = COUNT;
    setCount(COUNT);
    countDown.current = setInterval(() => {
      if (c != 0) {
        setCount(c - 1);
        c -= 1;
      } else endTimer();
    }, 1000);
  };

  const endTimer = () => {
    clearInterval(countDown.current);
    setCurrentPage(2);
    setCheck(true);
    togglePlay();
  };

  const togglePlay = () => {
    setPlaying(!playing);
    playing ? TrackPlayer.pause() : TrackPlayer.play();
  };

  const setUpTrackPlayer = async () => {
    try {
      // console.log(locale);
      if (locale === "SC") {
        trackid += trackNumber;
      } else if (locale === "TC") {
        trackid += trackNumber * 2;
      }
      // console.log(trackid);
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks[trackid]);
    } catch (error) {
      console.log(error);
    }
  };
  // testing using checkEnd() function
  // current bug: 1. useEffect or setInterval keeps running even out of detailscreen, may cause lag, need genious people help me fix and stop the function when not used
  // hypothesis: the clearInterval() may not working, not sure, or the end and check values are not properly set, again not sure.
  // good solution: maybe rewrite the logic of loading the checkEnd() function would be better, but no idea yet.
  // **UPDATE: bugs should be solved
  const { currentMember } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("current page ", currentPage)
    if (currentPage == 2) {
      setUpTrackPlayer();
      TrackPlayer.play()
    }
    if (!end) {
      intervalDown.current = checkEnd();
    }
    return () => {
      if (!end) {
        clearInterval(intervalDown.current);
      }
      if (end) {
        incrementStreakNumber(currentMember.name);
      }

      // console.log("StreakNumber: ", streakNumber);

      if (TrackPlayer) {
        TrackPlayer.stop();
      }
      setEnd(false);
    };
  }, [check, end, TrackPlayer]);


  // hardcode check end of the song
  // bugs: the check value is jumping and fluctuating between true and false, not affecting the normal operation though, expected it should keep true when checkEnd() starts running until song end. while other time is false
  // duration and position is passed from musicprogressbar, as the getPosition() value is strange from here and i dont dare to use it, while duration is hardcoded in tracks object
  // TrackPlayer.reset() and seekTo(0) are just ensured that the complete screen won't pops out even the checkend() function is abnormally running(after exit the detail screen)
  // **UPDATE: bugs should be solved
  function checkEnd() {
    return setInterval(() => {
      let duration = musicProgressBarDuration;
      let position = musicProgressBarPosition;
      /*
      console.log(check);
      console.log(duration);
      console.log(position);
      */
      if (check && !end) {
        if (
          Math.abs(duration - position) <= 0.5 &&
          duration != 0 &&
          position != 0
        ) {
          //TrackPlayer.seekTo(0);
          setCurrentPage(3);
          //TrackPlayer.reset();
          setEnd(true);
          setCheck(false);
        }
      }
    }, 250);
  }

  // bugs found:
  // 1. as the topbar also shows the trackplayer, we can set play/pause from the topbar, yet the play/pause button from currentPage2 won't change icon with it
  return (
    <View style={styles.container}>
      {currentPage === 0 && (
        <View>
          <TouchableOpacity style={styles.startButton} onPress={startTimer}>
            <Text style={styles.text}>{I18n.t("EYEEXERCISE_start")}</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentPage === 1 && (
        <View>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}

      {currentPage === 2 && (
        <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>
            {I18n.t("EYEEXERCISE_exerciseInstruction")}
          </Text>
          <View>
            <MusicProgressBar />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                icon={
                  playing ? (
                    <Icon
                      name="pause"
                      type="font-awesome"
                      color={Color.secondary}
                    />
                  ) : (
                    <Icon
                      name="play"
                      type="font-awesome"
                      color={Color.secondary}
                    />
                  )
                }
                onPress={togglePlay}
                buttonStyle={{ borderColor: Color.secondary }}
                containerStyle={styles.btn}
                type="outline"
              />
              <Button
                icon={
                  <Icon
                    name="stop"
                    type="font-awesome"
                    color={Color.secondary}
                  />
                }
                onPress={() => {
                  setCurrentPage(0);
                  TrackPlayer.stop();
                  setPlaying(false);
                }}
                buttonStyle={{ borderColor: Color.secondary }}
                containerStyle={styles.btn}
                type="outline"
              />
            </View>
          </View>
        </View>
      )}
      {currentPage === 3 && (
        <View style={styles.container}>
          <Text style={[s.color.main, s.text.large, s.text.googleSansBold]}>
            {I18n.t("EYEEXERCISE_congrat")}
          </Text>
          <Text style={[s.color.main, s.text.large, s.text.googleSansBold]}>
            {I18n.t("EYEEXERCISE_congrat2")}
          </Text>
          <Text
            style={[
              s.color.secondary,
              s.text.medium,
              { marginHorizontal: wp(15), paddingVertical: wp(5), textAlign: "center"},
            ]}
          >
            {I18n.t("EYEEXERCISE_getStreak")}
          </Text>
          <Image
            source={require("../../assets/ApplicationLogo.png")}
            style={{
              width: Size.h.xxlarge,
              height: Size.h.xxlarge,
              borderRadius: scale(20),
            }}
          />
        </View>
      )}
    </View>
  );
}

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    height: wp(50),
    width: wp(50),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    backgroundColor: Color.main,
  },
  text: {
    color: Color.accent,
    fontSize: hp(5),
  },
  paragraphContainer: {
    width: wp(70),
    height: scale(500),
    justifyContent: "space-around",
  },
  paragraph: {
    fontSize: hp(3),
    textAlign: "center",
    color: Color.main,
  },
  countText: {
    fontSize: hp(20),
    fontWeight: "bold",
    color: Color.secondary,
  },
  btn: {
    width: scale(90),
    margin: Spacing.h.small,
  },
});
