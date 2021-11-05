# ForeSee 2.0
Repo of ForeSee 2.0 frontend. Written in react native

## Prerequisites
- node.js
- yarn (optional)
- React native
- Android: Android studio
- iOS: XCode
- Emulator/ physical device

## Notible packages used
Here are some of the packages/ framework we used that might cause problem, specifically issues with react-native debugger.
- Reanimated 2
- Hermes

## Running the App
```
# install dependencies
# npm
npm install

# yarn
yarn
```
```
# run on android
react-native start
react-native run-android
```

## Documentation
All documentations and resources are available under ./doc  
[Navigate to ./doc](./doc)

## About git
Make sure to fetch/pull before committing!

## aws-exports.js
The app may crash on startup and complaint about the file aws-exports.js is missing. Configuring aws amplify and run ```amplify push``` will generate the required file. Contact us if you do not have the AWS access.

## coding style
We use [Prettier](https://prettier.io/) as our code formatter.