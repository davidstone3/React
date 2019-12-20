import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";


export default class BookingPreferences extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            isConnected: true,
            autoConfirm: false,
            multipleServices: false,
            mobilePayCheck: false,
            inShopCheck: false,
            fifteenMin: false,
            twentyMin: false,
            thirtyMin: false,
            fifteenMin1: false,
            twentyMin1: false,
            thirtyMin1: false,
            MP: {
                MPradiocheck: require("../../../assets/images/radio_unselected.png"),
                StateMP: false
            }
            ,
            IN: {
                INradiocheck: require("../../../assets/images/radio_unselected.png"),
                StateIN: false
            }
        };
        console.disableYellowBox = true;
    }

    componentDidMount(): void {
        this.getBookingPrefferenceSetting()
    }

    getBookingPrefferenceSetting() {
        this.setState({showLoading: true});
        fetch(constants.BarberBookingPreference + "?user_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseBookingPrefrence-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    let prefrence = response.Data;
                    if (prefrence.accepted_payment_options === "mobilePay")
                        this.onSelectMP();
                    if (prefrence.accepted_payment_options === "inShop")
                        this.onSelectIN();
                    this.setState({
                        autoConfirm: prefrence.auto_confirm_appointments,
                        multipleServices: prefrence.multiple_services
                    })
                    if (prefrence.last_minute_booking === "1")
                        this.setState({fifteenMin: true})
                    if (prefrence.last_minute_booking === "2")
                        this.setState({twentyMin: true})
                    if (prefrence.last_minute_booking === "3")
                        this.setState({thirtyMin: true})

                    if (prefrence.calender_interval === "1")
                        this.setState({fifteenMin1: true})
                    if (prefrence.calender_interval === "2")
                        this.setState({twentyMin1: true})
                    if (prefrence.calender_interval === "3")
                        this.setState({thirtyMin1: true})


                } else {
                    this.setState({showLoading: false});
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false});
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    setAutoConfirm() {
        if (this.state.autoConfirm === true)
            this.setState({autoConfirm: false})
        else
            this.setState({autoConfirm: true})
    }

    setCheckBox(idx) {
        if (idx === 1) {
            if (this.state.fifteenMin === false)
                this.setState({fifteenMin: true, twentyMin: false, thirtyMin: false})
            /*else
                this.setState({fifteenMin: false})*/
        }
        if (idx === 2) {
            if (this.state.twentyMin === false)
                this.setState({twentyMin: true, fifteenMin: false, thirtyMin: false})
            /*else
                this.setState({twentyMin: false})*/
        }
        if (idx === 3) {
            if (this.state.thirtyMin === false)
                this.setState({thirtyMin: true, fifteenMin: false, twentyMin: false})
            /*else
                this.setState({thirtyMin: false})*/
        }
        if (idx === 4) {
            if (this.state.fifteenMin1 === false)
                this.setState({fifteenMin1: true, twentyMin1: false, thirtyMin1: false})
            /*else
                this.setState({fifteenMin1: false})*/
        }
        if (idx === 5) {
            if (this.state.twentyMin1 === false)
                this.setState({twentyMin1: true, fifteenMin1: false, thirtyMin1: false})
            /* else
                 this.setState({twentyMin1: false})*/
        }
        if (idx === 6) {
            if (this.state.thirtyMin1 === false)
                this.setState({thirtyMin1: true, fifteenMin1: false, twentyMin1: false})
            /*else
                this.setState({thirtyMin1: false})*/
        }

    }

    setMultipleServices() {
        if (this.state.multipleServices === true)
            this.setState({multipleServices: false})
        else
            this.setState({multipleServices: true})
    }

    renderRowWithCheck(item) {
        return <View style={{flexDirection: 'row', height: 22, marginLeft: 40}}>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => this.setCheckBox(item.indx)}>
                <CheckBoxSquare onClick={() => {
                    this.setCheckBox(item.indx)
                }} rightText={item.title} isChecked={item.value} style={{width: 200}}/>
                {/* <Text style={{marginStart:10,color:"white"}}>{item.title}</Text>*/}
            </TouchableOpacity>
        </View>;
    }

    renderRow(item) {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row', height: 20}}>
                <Image style={styles.leftIcon} source={item.ic}/>
                <Image style={styles.leftIcon} source={item.ic2}/>
                <Text style={styles.row_title}>{item.title}</Text>
            </View>
            <Text style={{
                marginStart: "16%",
                color: "grey",
                fontSize: 12,
                fontStyle: "italic",
                marginBottom: 3
            }}>{item.hint}</Text>
        </View>;
    }

    renderRowAppointment(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 32}}>
            <Image style={styles.leftIcon} source={item.ic}/>
            <Text style={styles.row_title}>{item.title}</Text>
            {item.title === "Auto Confirm" && <Switch
                trackColor="#00D200"
                thumbColor="#fff"
                onChange={() => this.setAutoConfirm()}
                value={item.value} style={{
                transform: [{ scaleX: .8 }, { scaleY: .8 }],
                position: 'absolute',
                right: 14,
                alignSelf: 'center',
                tintColor: 'white'
            }}/>
            }
            {item.title === "Multiple Services" && <Switch
                trackColor="#00D200"
                thumbColor="#fff"
                onChange={() => this.setMultipleServices()}
                value={item.value}
                style={{
                    transform: [{ scaleX: .8 }, { scaleY: .8 }],
                    position: 'absolute',
                    right: 14,
                    alignSelf: 'center',
                    tintColor: 'white'
                }}/>
            }
        </View>;
    }

    renderRowTimer(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 35}}>
            <Image style={styles.leftIcon} source={item.ic}/>
            <Text style={[styles.row_title]}>{item.title}</Text>
        </View>;
    }

    renderSeperator() {
        return <View style={{marginLeft: 40, height: 0.5, backgroundColor: Colors.grey1}}></View>
    }

    onSelectMP() {
        this.setState({MP: {MPradiocheck: require("../../../assets/images/radio_selected.png"), StateMP: true}});
        this.setState({IN: {INradiocheck: require("../../../assets/images/radio_unselected.png"), StateIN: false}})

    }

    onSelectIN() {
        this.setState({IN: {INradiocheck: require("../../../assets/images/radio_selected.png"), StateIN: true}});
        this.setState({MP: {MPradiocheck: require("../../../assets/images/radio_unselected.png"), StateMP: false}});
    }

    updateBookingPrefrence() {
        let paymentOption = 0;
        let lastMinBooking = 0;
        let calendarInterval = 0;
        if (this.state.MP.StateMP === true) {
            paymentOption = 0;
            Preference.set("paymentOption", "mobilepay")
        }
        if (this.state.IN.StateIN === true) {
            paymentOption = 1;
            Preference.set("paymentOption", "inshop")
        }
        console.log("paymentOptionBit--->" + this.state.MP.StateMP);
        console.log("paymentOptionBit--->" + paymentOption);
        if (this.state.fifteenMin === true)
            lastMinBooking = 1;
        else if (this.state.twentyMin === true)
            lastMinBooking = 2;
        else if (this.state.thirtyMin === true)
            lastMinBooking = 3;
        else
            lastMinBooking = 0;

        if (this.state.fifteenMin1 === true)
            calendarInterval = 1;
        else if (this.state.twentyMin1 === true)
            calendarInterval = 2;
        else if (this.state.thirtyMin1 === true)
            calendarInterval = 3;
        else
            calendarInterval = 0;

        this.setState({showLoading: true})
        var details = {
            user_id: Preference.get("userId"),
            accepted_payment_options: paymentOption,
            auto_confirm_appointments: this.state.autoConfirm,
            multiple_services: this.state.multipleServices,
            alerts: true,
            last_minute_booking: lastMinBooking,
            calender_interval: calendarInterval,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.UpdateBookingPreference, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("updateBookingPrefrence-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    //alert("Booking preferences updated successfully");
                    if (Preference.get("newUser") === true) {
                        if (this.state.MP.StateMP === true) {
                            this.props.navigation.push("MobilePay");
                        } else {
                            this.props.navigation.navigate("TabNavigator");
                            Preference.set("newUser", false);
                        }
                    } else {
                        this.props.navigation.goBack();
                    }
                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }

                }
            }).catch(error => {
            //console.error('Errorr:', error);
            this.setState({showLoading: false})
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "BOOKING PREFERENCES", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                    leftComponent={
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image
                                style={{tintColor: 'white', height: 20, resizeMode: 'contain'}}
                                source={require("../../../assets/images/ic_back.png")}
                            />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>

                    <Text style={styles.txtHeader}>ACCEPT PAYMENT OPTIONS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <TouchableOpacity onPress={() => this.onSelectMP()}>
                            {this.renderRow({
                                title: "Mobile Pay",
                                ic: require("../../../assets/images/mobile_pay.png"),
                                hint: "Payment through the App",
                                ic2: this.state.MP.MPradiocheck
                            })}
                        </TouchableOpacity>
                        {this.renderSeperator()}
                        <TouchableOpacity onPress={() => this.onSelectIN()}>
                            {this.renderRow({
                                title: "In Shop",
                                ic: require("../../../assets/images/inshop.png"),
                                hint: "Cash,Card and Other",
                                ic2: this.state.IN.INradiocheck
                            })}
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.txtHeader}>APPOINTMENTS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRowAppointment({
                            title: "Auto Confirm",
                            ic: require("../../../assets/images/AUTO.png"),
                            value: this.state.autoConfirm,
                        })}
                        {this.renderSeperator()}
                        {this.renderRowAppointment({
                            title: "Multiple Services",
                            ic: require("../../../assets/images/multiple_service.png"),
                            value: this.state.multipleServices,
                        })}
                    </View>

                    <Text style={styles.txtHeader}>LAST MINUTE BOOKING</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRowTimer({
                            /*title: "30 Minutes",*/
                            title: "Minimum time needed for a client to book an \n appointment",
                            ic: require("../../../assets/images/mins_30.png")
                        })}
                        {/*<Text style={{
                            marginStart: "10%",
                            color: "grey",
                            fontSize: 12,
                            fontStyle: "italic"
                        }}>{"Limited"}</Text>*/}
                        {/*<View style={{
                            marginStart: 30, marginEnd: 10, height: 18, marginBottom: 8, backgroundColor: "#5A5B68",
                            borderRadius: 10, justifyContent: "center"
                        }}>
                            <Text style={{
                                marginStart: 5,
                                fontSize: 10,
                                color: "white",
                            }}>{"Client can Book Appointment with you up until last minutes "}</Text>
                        </View>*/}
                    </View>
                    {this.renderRowWithCheck({title: "Every 15 Minutes", value: this.state.fifteenMin, indx: 1})}
                    {this.renderRowWithCheck({title: "Every 20 Minutes", value: this.state.twentyMin, indx: 2})}
                    {this.renderRowWithCheck({title: "Every 30 Minutes", value: this.state.thirtyMin, indx: 3})}

                    {/*<Text style={styles.txtHeader}>AVAILABILITY</Text>*/}
                    {/*<View style={[globalStyles.rowBackground, styles.row]}>*/}
                    {/*{this.renderRowTimer({*/}
                    {/* title: "Every 30 Minutes",*/}
                    {/*title: "Calender Interval",*/}
                    {/*ic: require("../../../assets/images/every_30_min.png"),*/}
                    {/*})}*/}
                    {/*<Text style={{*/}
                    {/*marginStart: 30,*/}
                    {/*color: "grey",*/}
                    {/*fontSize: 12,*/}
                    {/*fontStyle: "italic"*/}
                    {/*}}>{"Calender Interval"}</Text>*/}
                    {/*</View>*/}
                    {/*{this.renderRowWithCheck({title: "Every 15 Minutes", value: this.state.fifteenMin1, indx: 4})}*/}
                    {/*{this.renderRowWithCheck({title: "Every 20 Minutes", value: this.state.twentyMin1, indx: 5})}*/}
                    {/*{this.renderRowWithCheck({title: "Every 30 Minutes", value: this.state.thirtyMin1, indx: 6})}*/}

                    <TouchableOpacity style={[globalStyles.button, {marginTop: 70, marginBottom: 30, width: '70%'}]}
                                      onPress={() => this.updateBookingPrefrence()}>
                        <Text style={globalStyles.buttonText}>DONE</Text>
                    </TouchableOpacity>


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
        );
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
        height: 14,
        width: 14,
        marginLeft: 8,
        alignSelf: 'center',
        resizeMode: "contain"
    },
    row_title: {
        color: Colors.white,
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
