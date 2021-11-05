import { StyleSheet } from "react-native";
import { wp, hp } from "../styles/size";

import { Color } from "./color";
/**
 * @deprecated use src/styles/styles.js instead
 */

const view = StyleSheet.create({
  darkGreenContainer: {
    flex: 1,
    backgroundColor: Color.main,
    paddingHorizontal: wp(5),
  },
  greenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(2),
    backgroundColor: Color.secondary,
  },
  whiteContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
    backgroundColor: "white",
  },
  content: {
    marginTop: hp(6),
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(7.5),
    paddingTop: hp(7.5),
    paddingBottom: hp(5),
    alignItems: "center",
  },
  button: {
    backgroundColor: Color.background,
    borderRadius: 40,
    padding: 12,
  },
  buttonActive: {
    backgroundColor: Color.main,
    borderRadius: 40,
    padding: 12,
  },
  greenTextBox: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
});

const text = StyleSheet.create({
  title: {
    color: Color.lightText,
    marginVertical: hp(2),
    fontSize: hp(5.5),
  },

  greenTitle: {
    color: Color.main,
    marginVertical: hp(2),
    fontSize: hp(4.5),
    fontWeight: "bold",
  },

  hyperlinkText: {
    color: "blue",
    alignSelf: "center",
    marginVertical: hp(2),
  },

  yellowNumber: {
    color: Color.accent,
  },
  alertTitle: {
    color: Color.main,
    fontSize: 25,
    textAlign: "center",
  },
  alertMsg: {
    color: Color.secondary,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  heading: {
    fontSize: 35,
    fontFamily: "GoogleSans-Bold",
    color: Color.main,
    textAlign: "center",
  },
  subheading: {
    fontSize: 25,
    fontFamily: "GoogleSans-Bold",
    color: Color.main,
  },
  buttonTitle: {
    color: Color.secondary,
    fontSize: 20,
  },
  buttonActiveTitle: {
    color: Color.accent,
    fontSize: 20,
  },
});

export default Styles = { view, text };
