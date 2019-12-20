import React, {Component} from "react";
import moment from 'moment';
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    TextInput, Dimensions,
} from "react-native";
import Preference from "react-native-preference";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import {Header} from "react-native-elements";
import CalendarHeader from "react-native-calendars/src/calendar/header";
import {constants} from "../../../utils/constants";

const {width, height} = Dimensions.get("window");
const today = moment().format("YYYY-MM-DD");
console.log("todaydate:" + today);
let getDay = new Date().getDate();
let getmonthh = new Date().getMonth();
let getyear = new Date().getFullYear();

export default class ClientHaircuts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            text2: 'Your Message...',
            upcomingBack: "transparent",
            completeBack: "transparent",
            cancelledBack: "transparent",
            allBack: "transparent",
            upcomingtext: "grey",
            completetext: "grey",
            cancelledtext: "grey",
            allAppointments: [],
            selectedMonth: "",
            allAppointmentsCalender: "",
            alltext: "grey",
            blue: "transparent",
            red: "transparent",
            green: "transparent",
        };
        this.checkDayReciept = this.checkDayReciept.bind(this);
    }

    componentDidMount(): void {
        const {navigation} = this.props;
        this.focusListener = navigation.addListener("didFocus", payload => {
            let mon = getmonthh + 1;
            if (parseInt(mon) < 10) {
                mon = "0" + mon;
            }
            let mn = getyear + "-" + mon;
            this.setState({selectedMonth: mn})
            this.getAllAppointments(mn);
        });
        //this.getAllAppointments(getyear+"-"+getmonthh);
        //this.optionSelected("all",);
    }

    getAllAppointments(monthYear) {
        this.setState({showLoading: true})
        console.log("URLgetAllAppointments-->", constants.ClientGetAllAppointments + "?client_id=" + Preference.get("userId") + "&month=" + monthYear);
        fetch(constants.ClientGetAllAppointments + "?client_id=" + Preference.get("userId") + "&month=" + monthYear, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => response.json())
            .then(response => {
                console.log("responsegetAllAppointments-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    let allAppointment = response.Data;
                    this.setState({allAppointments: allAppointment})
                    this.optionSelected("all", allAppointment)
                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    decreaseMonth() {
        let selectmonth = this.state.selectedMonth;
        console.log("Monthis", selectmonth);
        selectmonth = selectmonth.split("-");
        if (selectmonth[1] === "1") {
            selectmonth[1] = "12";
            selectmonth[0] = parseInt(selectmonth[0]) - 1;
        } else {
            selectmonth[1] = parseInt(selectmonth[1]) - 1;
        }
        let mainMonth = selectmonth[0] + "-" + selectmonth[1];
        this.setState({selectedMonth: mainMonth});
        this.getAllAppointments(mainMonth);
    }

    increaseMonth() {
        let selectmonth = this.state.selectedMonth;
        selectmonth = selectmonth.split("-")
        if (selectmonth[1] === "12") {
            selectmonth[1] = "1";
            selectmonth[0] = parseInt(selectmonth[0]) + 1;
        } else {
            selectmonth[1] = parseInt(selectmonth[1]) + 1;
        }
        let mainMonth = selectmonth[0] + "-" + selectmonth[1];
        this.setState({selectedMonth: mainMonth});
        this.getAllAppointments(mainMonth);
        this.checkDayReciept = this.checkDayReciept.bind(this);
    }


    optionSelected(item, Data) {
        if (item === "upcoming") {
            this.setState({upcomingBack: "#1999CE", upcomingtext: "white"});
            this.setState({completeBack: "transparent", completetext: "grey"});
            this.setState({cancelledBack: "transparent", cancelledtext: "grey"});
            this.setState({allBack: "transparent", alltext: "grey"});
            this.setState({blue: "#1999CE",});
            this.setState({green: "transparent"});
            this.setState({red: "transparent"});
            let details = new Object();
            for (let i = 0; i < Data.length; i++) {
                let data = Data[i].date;
                data = data.split("T");
                let appointdate = data[0];
                console.log("calenderAppointments11-->", Data[i].appointment_type);
                if (Data[i].appointment_type === "confirmed") {
                    details[`${appointdate}`] = {selected: true, selectedColor: "#389CFE"}
                }
            }
            console.log("calenderAppointmentsArray-->", JSON.stringify(details));
            this.setState({allAppointmentsCalender: details});
        }
        if (item === "complete") {
            this.setState({completeBack: "#00D200", completetext: "white"});
            this.setState({upcomingBack: "transparent", upcomingtext: "grey"});
            this.setState({cancelledBack: "transparent", cancelledtext: "grey"});
            this.setState({allBack: "transparent", alltext: "grey"});
            this.setState({green: "#00D200"});
            this.setState({blue: "transparent",});
            this.setState({red: "transparent"});
            let details = new Object();
            for (let i = 0; i < Data.length; i++) {
                let data = Data[i].date;
                data = data.split("T");
                let appointdate = data[0];
                console.log("calenderAppointments11-->", Data[i].appointment_type);
                if (Data[i].appointment_type === "completed") {
                    details[`${appointdate}`] = {selected: true, selectedColor: "#2DD010"}
                }
            }
            console.log("calenderAppointmentsArray-->", JSON.stringify(details));
            this.setState({allAppointmentsCalender: details});
        }
        if (item === "cancelled") {
            this.setState({cancelledBack: "red", cancelledtext: "white"});
            this.setState({completeBack: "transparent", completetext: "grey"});
            this.setState({upcomingBack: "transparent", upcomingtext: "grey"});
            this.setState({allBack: "transparent", alltext: "grey"});
            this.setState({red: "red"});
            this.setState({green: "transparent"});
            this.setState({blue: "transparent",});
            let details = new Object();
            for (let i = 0; i < Data.length; i++) {
                let data = Data[i].date;
                data = data.split("T");
                let appointdate = data[0];
                console.log("calenderAppointments11-->", Data[i].appointment_type);
                if (Data[i].appointment_type === "cancelled") {
                    details[`${appointdate}`] = {selected: true, selectedColor: "#F50000"}
                }
            }
            console.log("calenderAppointmentsArray-->", JSON.stringify(details));
            this.setState({allAppointmentsCalender: details});
        }
        if (item === "all") {
            this.setState({allBack: "#7131FD", alltext: "white"});
            this.setState({cancelledBack: "transparent", cancelledtext: "grey"});
            this.setState({completeBack: "transparent", completetext: "grey"});
            this.setState({upcomingBack: "transparent", upcomingtext: "grey"});
            this.setState({red: "red", green: "#00D200", blue: "#1999CE"})
            let details = new Object();
            for (let i = 0; i < Data.length; i++) {
                let data = Data[i].date;
                data = data.split("T");
                let appointdate = data[0];
                console.log("calenderAppointments11-->", Data[i].appointment_type);
                if (Data[i].appointment_type === "confirmed") {
                    details[`${appointdate}`] = {selected: true, selectedColor: "#389CFE"}
                }
                if (Data[i].appointment_type === "cancelled") {
                    details[`${appointdate}`] = {selected: true, selectedColor: "#F50000"}
                }
                if (Data[i].appointment_type === "completed") {
                    details[`${appointdate}`] = {selected: true, selectedColor: "#2DD010"}
                }
            }
            console.log("calenderAppointmentsArray-->", JSON.stringify(details));
            this.setState({allAppointmentsCalender: details});
        }
    }

    checkDayReciept(day) {
        console.log("Dayis" + day.dateString);
        let allbookings = this.state.allAppointments;
        for (let j = 0; j < allbookings.length; j++) {
            let data = allbookings[j].date;
            data = data.split("T");
            let appointdate = data[0];
            if (appointdate === day.dateString) {
                if (allbookings[j].appointment_type==="completed") {
                    this.props.navigation.navigate("Receipt",{appointmentId:allbookings[j]._id});
                    break;
                }else {
                    if (allbookings[j].appointment_type==="cancelled") {
                        this.props.navigation.navigate("ReceiptCancelled",{appointmentId:allbookings[j]._id});
                        break;
                    }
                }
            }
        }
    }

    render() {
        return (<View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "HAIRCUTS", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("ClientQR");
                            }}>
                            <Image
                                style={{
                                    tintColor: "white",
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                                source={require("../../../assets/images/qr.png")}/>
                        </TouchableOpacity>}/>
                <ScrollView>
                    <View style={{
                        flexDirection: "column",
                        marginStart: 5,
                        marginEnd: 5,
                        height: height - 110,
                        marginTop: 20
                    }}>
                        <Calendar
                            /* current={getyear+"-"+getmonthh+1+"-"+getDay}*/
                            /* minDate={'1970-1-1'}
                             maxDate={'2050-12-31'}*/
                            minDate={'2010-01-01'}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            maxDate={'2025-12-31'}
                            firstDay={1}
                            onDayPress={this.checkDayReciept}
                            //onDayPress={(day) => {console.log('selected day', day)}}
                            markedDates={this.state.allAppointmentsCalender}
                            hideDayNames={true}
                            onPressArrowLeft={substractMonth => {
                                this.decreaseMonth();
                                substractMonth();
                            }}
                            onPressArrowRight={addMonth => {
                                this.increaseMonth();
                                addMonth();
                            }}
                            theme={{
                                monthTextColor: 'red',
                                calendarBackground: Colors.themeBackground,
                                arrowColor: 'white',
                            }}
                            hideExtraDays={true}
                            disabledByDefault={true}
                        />

                        <View style={{
                            flexDirection: "row",
                            borderColor: "grey",
                            width: "90%",
                            marginStart: 15,
                            marginTop: 20,
                            height: 35,
                            alignItems: "center",
                            borderRadius: 20,
                            borderWidth: 0.5,
                        }}>
                            <TouchableOpacity
                                onPress={() => this.optionSelected("upcoming", this.state.allAppointments)}
                                style={{
                                    height:25,
                                    justifyContent:"center",
                                    marginStart: 10,
                                    width: "20%",
                                    backgroundColor: this.state.upcomingBack,
                                    borderRadius: 15,
                                    alignItems: "center"
                                }}>
                                <Text style={{
                                    color: this.state.upcomingtext,
                                    fontSize: 10,
                                }}
                                >{"UPCOMING"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.optionSelected("complete", this.state.allAppointments)}
                                style={{
                                    height:25,
                                    backgroundColor: this.state.completeBack,
                                    borderRadius: 15,
                                    width: "20%",
                                    marginStart: 10,
                                    alignItems: "center",
                                    justifyContent:"center",

                                }}>
                                <Text style={{
                                    color: this.state.completetext,
                                    fontSize: 10,
                                }}>{"COMPLETE"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.optionSelected("cancelled", this.state.allAppointments)}
                                style={{
                                    height:25,
                                    backgroundColor: this.state.cancelledBack,
                                    borderRadius: 15,
                                    width: "25%",
                                    alignItems: "center",
                                    marginStart: 10,
                                    justifyContent:"center",
                                }}>
                                <Text style={{
                                    color: this.state.cancelledtext,
                                    fontSize: 10,
                                }}>{"CANCELLED"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.optionSelected("all", this.state.allAppointments)}
                                              style={{
                                                  height:25,
                                                  borderRadius: 15,
                                                  backgroundColor: this.state.allBack,
                                                  width: "18%",
                                                  alignItems:"center",
                                                  justifyContent:"center",
                                                  marginStart: 10,
                                              }}>
                                <Text style={{
                                    color: this.state.alltext,
                                    fontSize: 10,
                                }}>{"ALL"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {this.state.showLoading && <View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    position: "absolute",
                    opacity: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")}
                           style={{width: 60, height: 60, opacity: 1,}}/>
                </View>}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: Colors.themeBackground
    },
    row: {
        flexDirection: 'column',
        height: 'auto',
        marginTop: 4,
        marginLeft: 18,
        marginRight: 18,
        marginBottom: 10
    },
    txtHeader: {
        color: Colors.lightGrey,
        marginTop: 16,
        marginBottom: 4,
        marginLeft: 30,
        fontSize: 12,
        fontFamily: "AvertaStd-Regular"
    },
    leftIcon: {
        height: 16,
        width: 16,
        marginLeft: 8,
        alignSelf: 'center',
        resizeMode: "contain"
    },
    row_title: {
        color: Colors.white,
        marginTop: 5,
        marginLeft: 10,
        alignSelf: 'center',
        fontFamily: "AvertaStd-Regular"
    },
    right_arrow: {
        position: 'absolute',
        right: 14,
        alignSelf: 'center',
        height: 9,
        width: 5,
        tintColor: 'white'
    }
});
