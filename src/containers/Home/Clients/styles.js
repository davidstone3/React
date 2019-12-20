import { Colors } from "../../../themes";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export const styles = {
    tip_price_container:{
        backgroundColor: Colors.border,
        marginTop: 8,
        width: 80,
        height: 24,
        borderWidth: 0.5,
        borderColor: Colors.border,
        borderRadius: 12
      },
      MainContainer: {
        justifyContent: "center",
        flex: 1,
      },
      avatar_conatiner:{
        alignSelf: "center",
        marginLeft: 10,
        height: 60,
        width: 60
      },
      icon_header:{
        height:20,
        width:20
      },

    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: Colors.themeBackground
    },
    calendar_weekly_header: {
        height: 60,
        flexDirection: "row"
    },
    week_day_container: {
        alignSelf: "center",
        color: "white",
        fontFamily: "AvertaStd-Semibold",
        fontSize:12
    },
    track:{
       Color:"red"
    }

};
