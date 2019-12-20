import { Colors } from "../../../themes";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export const styles = {
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: Colors.themeBackground
  },
  calendar_weekly_header: {
    height: 60,
  },
  week_day_container: {
    alignSelf: "center",
    color: "white",
    fontFamily: "AvertaStd-Semibold",
    fontSize:12
  }
};
