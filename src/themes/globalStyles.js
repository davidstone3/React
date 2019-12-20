import { Colors } from "../themes";
import {
  Dimensions} from "react-native";
const { height, width } = Dimensions.get("window");
export const globalStyles = {
  rowBackground: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.gray,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 5,
    height: 90,
    flexDirection: "row",
    margin: 1
  },
  buttonText: { 
    color: "white", 
    fontSize: 15, 
    marginTop:4,
    fontFamily: "AvertaStd-ExtraBold",
    alignSelf:"center",
    fontWeight: "500" },
  receiptButtonText: {
    color: "white",
    fontSize: 10,
    fontFamily: "AvertaStd-ExtraBold",
    alignSelf:"center",
    fontWeight: "500" },
  button: {
    width: width / 2.2,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    height: height / 17,
    alignItems: "center",

  },
  reciptButton: {
    width: width / 2.2,
    backgroundColor: "grey",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    height: 30,
    alignItems: "center"
  }
};
