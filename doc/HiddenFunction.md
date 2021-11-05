# HiddenFunction 
<br>

##Usage
Use to pop up a react native model which shows "Coming Soon!" message to users while this function is activated.

## Filepath
ForeSee-App\src\components\HiddenFunction.js

## Parameter
This function accepts two parameter, on and setOn, on is controlling whether the model is visible or not, visible when true and vice versa, while setOn is to set state of on whether true or false.

This pair of [on, setOn] should be passed from the screen you need to use this function.


## How to use:
You need to first import {useState} from "react" for the current file you are using.

Then set up a state: const [warning, setWarning] = useState(false)

Import the JSX tag from where you want to add it in, and pass the state and setState to the function, for example: <View><HiddenFunction on={warning} setOn={setWarning}/></view>

You are expect to see the function pops up when setWarning(true), most likely applied in onPress on buttons. For example, setting up a button to pop the modal: <Button title="unfinished function" onPress{()=>{setWarning(true);}}>