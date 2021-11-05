import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Color } from "../../constant/color";
import { withOpacity } from "../../utils/utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(7.5),
    paddingTop: hp(7.5),
    paddingBottom: hp(5),
    alignItems: "center",
  },
  heading: {
    fontSize: 35,
    color: Color.main,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 25,
    color: Color.main,
  },
  text: {
    fontSize: 20,
    color: Color.main,
  },
  hintText: {
    fontSize: 15,
    color: Color.secondary,
    textDecorationLine: "underline",
    fontFamily: "GoogleSans-Regular",
  },
  inputText: {
    fontSize: 20,
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: withOpacity(Color.background, 0.8),
    borderRadius: 10,
    marginVertical: 8,
    paddingVertical: 8,
  },
  tableHeader: {
    fontSize: 20,
    color: Color.main,
    textAlign: "center",
    flex: 1,
  },
  tableItemText: {
    fontSize: 20,
    color: Color.secondary,
    textAlign: "center",
    flex: 1,
  },
  tableItemLabel: {
    fontSize: 20,
    color: Color.secondary,
    paddingLeft: 20,
    width: "35%",
  },
});
