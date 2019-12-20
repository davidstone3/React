import { Colors } from "../../themes";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export const styles = {
  tip_price_container: {
    backgroundColor: Colors.border,
    marginTop: 8,
    width: 80,
    height: 24,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 12
  },
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: Colors.themeBackground
  },
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 30
  },
  avatar_container: {
    alignSelf: "center",
    marginLeft: 10,
    height: 60,
    width: 60
  },
  row_item: {
    height: 130
  },
  thumbnail: {
    position: "absolute",
    left: 22,
    top: 12,
    resizeMode : "cover",
    borderRadius: 6,
    borderWidth: 0,
    borderColor: "transparent",
    alignSelf: "center",
    height: 66,
    width: 86
  },
  client_name: {
    marginLeft: 110,
    marginTop: 5,
    fontSize: 16,
    color: Colors.white
  },
  ratings: {},
  rating_container: {
    flexDirection: "row",
    height: 20,
    justifyContent: "center",
    position: "absolute",
    top: 4,
    right: 6
  },
  rating_text: {
    color: Colors.lightGrey,
    marginLeft: 4,
    alignSelf: "center",
    fontSize: 10
  },
  txt_header:{

  }

};
