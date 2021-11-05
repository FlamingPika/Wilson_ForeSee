# Eye Exercises Flow and Function Explainations:
This document should help you understand the flow of how EyeExerciseHomeScreen.js, EyeExerciseDetailScreen.js and MusicProgressBar.js work, and the functions design of them.

The screens of navigation are set in FamiltFunctionRoute.js.
<br>

## <u>Exercise Flow(From Use Case documentation)</u>
The user could select and start an eye exercise.
### Pre-conditions
The user should be at the home screen.
### Basic Flow
1. The user navigate to the eye exercise screen by pressing on the eye exercise button.
2. The user is redirected to the eye exercise home screen, which consists of a description text, a cover image, and 4 different types of eye exercise.
3. The user select one of the eye exercises.
4. The system shows a start button
5. The user press the start button
6. The system shows a countdown timer. When the countdown reaches zero, the eye exercise will start. An audio track is played in the background, and an instruction text is shown on the screen.
7. The user follows the instruction and complete the exercise.
### Alternative Flow 1
7.1 During the exercise, the user can pause the audio track by pressing the play/pause button. 
7.2 During the exercise, the user can press stop to back to the starting screen of exercise.
<br>

## <u>Screen Flow</u>
The user navigates to EyeExerciseHomeScreen first, and choose the audio they want to hear, then click go button to naviagate to EyeExerciseDetailScreen for running the starting screen, the corresponding audio and completed exercise screen. MusicProgressBar is ran in this process. Then click the back button from naviagation bar to return to EyeExerciseHomeScreen.

<br>

## <u>Explaination of Screens</u>
### EyeExerciseHomeScreen.js
The EyeExercise tracks description are stored in eyeExerciseList, noted that four data of each track(uri, id, title, descriptiion) need to be specified.
The uri is type with require("...the url of the icon"), which is used as icon image of the box.

The description of track is stored in I18n translation files.
The id of the track is passed to EyeExerciseDetailScreen for playing the audio that choosed by user, so when editing this data, pay extra attention on both screen files.

The icon and tracks description are displayed in PurpleBlockList.
By clicking the PurpleBlockList, the currentExerciseID will change to the selected block id,	
Currently, the icon image is hardcoded and not changed by uri from eyeExerciseList.

By clicking go button, the screen will navigate to EyeExerciseDetailScreen with passing currentExerciseID as parameter.

### EyeExerciseDetailScreen.js
The details of the EyeExercise tracks are implemented here. The information of the tracks is saved in tracks object. It owns 4 variables: title, id, url and description. 

title is displayed in the topbar of audio player. duration is hardcode marked for the length of audio, which obtain from manually looking of length through window media player. url marks down the audio location. id is used in matching the currentExerciseID from EyeExerciseHomeScreen(named as trackid for easy reference).

The id is designed to match with same type of exercise but differnet language version. Variable trackNumber marked down the current number of types of exercises.
Variable locale used to locate the current language of the app is using, so to decide the calculation of trackid.
The formula of id of track is: trackNumber*0+trackid=EN, trackNumber*1+trackid=SC, trackNumber*2+trackid=TC 
 
The streakNumber for ProfileScreen streakNumber counter is incremented by incrementStreakNumber(), with matching the currentMember.name to use, the number can get from getStreakNumber(), with inputting currentMember to the ().

This TrackPlayer is set to have capability to play, pause and stop, and will not stop with the app, which means won't get destroyed with the app.

currentPage is used to set the subscreen show in EyeExerciseDetailScreen. In the working flow, setCurrentPage is used to change the subscreen we are showing. Default is 0.

There is startTimer and endTimer function, which are used to do animation on counting down the number after pressing start button in currentpage = 0. COUNT, countdown, count and setCount are used in these two functions. Default count is COUNT. While COUNT default is 3.

playing is used to toggle the audio playing or not, it matches with the playbutton and toggle the play in endTimer. Default is false.

check is used to for two reasons: 1. use in checking whether the audio started or not, in order to trigger the checkEnd() and 
2. prevent trigger checkEnd() before the upcoming 2nd audio is started, as the complete screen may pops up when opening 2nd audio in screen0/1 due to previous state variables exist value after the 1st audio is finished, default is false. 

end is used to check the end of the song, true when song reaches the end. Cooperate with check in useEffect to trigger the complete screen and increment of streakNumber, default is false.

intervalDown is used to record setInterval id in order to clear the setInterval in useEffect.

Pause button is made by using togglePlay(). While stop button is made in order to get back to starting screen of exercise and stop the audio track, with setting playing false using setPlaying(false).
The function flow is below:
1. When user load into the screen, useEffect is used once, TrackPlayer is setup and setInterval in checkEnd() is triggered with 250 miliseconds, currently has no effect to the screen.
2. When user click the start button, startTimer is triggered and setCount to decrement count with using setInterval.
3. when count = 0, endTimer is triggered, clearInterval with countdown.current to remove setInterval effect. setCurrentPage to 2, then do toggleplay() to current TrackPlayer and setCheck(true)
4. The audio is playing with using checkEnd() function per 250 miliseconds until the position reaches to 0.5 second before or after the duration(this is designed to endure the manual inputing duration roundoff error)
5. When the position reaches to the trigger point of if statement in checkEnd(), trackplayer is set to seekto(0) and reset just for safe issues, then setEnd to true and setCheck to false, setCurrentPage(3). The TrackPlayer will destroy and clearInterval, as end is true,incrementStreakNumber() is triggered and add streakNumber in firebase for 1, and setEnd back to false for next render.(Before setting to 1 for streakNumber, the screen may render once more beacuse of detecting changes in useEffect variables in subscription array, doesn't matter though)
6. The screen jump to complete screen, user triggers back button to navigate back to homeScreen.

### MusicProgressBar.js
We use LinearProgress from react-native-elements to express the progress bar.

As the getPosition() from RNTrackPlayer is giving out promise and not a number, I decide to use another way to locate the position of audio. As the MusicProgressBar is a class, we can track its position by using this.state.position, and pass it into calculation in ElapsedDisplay and DurationDisplay. While duration is get by this.state.duration just for consistency and can be changed to pass duration from tracks in future.
pad, minuteAndSeconds and minuteAndSecondsForElapsed is used to calculate minutes and seconds by storing these two number in array. While DurationDisplay and ElapsedDisplay are for displaying time of duration and elapsed position in xx:xx format.

this.state.position and this.state.duration is exported out as variables with name as musicProgressBarPosition and musicProgressBarDuration. The default value of these two are zero to avoid uninitialized problems.



