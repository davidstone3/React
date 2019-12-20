import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBox from "../../../components/CheckBox";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import CheckBoxSquare from "../SurgePricing";


export default class Cancellations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            policy: false,
            twoHour: false,
            oneHour: false,
            thirtyMin: false,
            noShowPolicy: false,
            bookingPrefrence: false,
            cancellationNoShow: false,
            surgePrice: false
        }
    }

    componentDidMount(): void {
        this.getCancellationsNoShow();
    }

    updateCancellation() {
        let cancellationPolicyValue = 0;
        let noShowPolicyValue = 0;
        if (this.state.twoHour === true)
            cancellationPolicyValue = 1;
        else if (this.state.oneHour === true)
            cancellationPolicyValue = 2;
        else if (this.state.thirtyMin === true)
            cancellationPolicyValue = 3;
        else
            cancellationPolicyValue = 0;

        if (this.state.bookingPrefrence === true)
            noShowPolicyValue = 1;
        else if (this.state.cancellationNoShow === true)
            noShowPolicyValue = 2;
        else if (this.state.surgePrice === true)
            noShowPolicyValue = 3;
        else
            noShowPolicyValue = 0;

        this.setState({showLoading: true})
        var details = {
            user_id: Preference.get("userId"),
            cancellation_policy: this.state.policy,
            cancellation_policy_value: cancellationPolicyValue,
            no_show_policy: this.state.noShowPolicy,
            no_show_policy_value: noShowPolicyValue,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.UpdateCancellation, {
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
                    this.props.navigation.goBack();
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

    getCancellationsNoShow() {
        this.setState({showLoading: true});
        fetch(constants.BarberBookingPreference + "?user_id=" +  Preference.get("userId"), {
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
                    if (prefrence.cancellation_policy === true)
                        this.setState({policy: true})
                    else
                        this.setState({policy: false})
                    if (prefrence.no_show_policy === true)
                        this.setState({noShowPolicy: true})
                    else
                        this.setState({noShowPolicy: false})

                    if (prefrence.cancellation_policy_value === "1")
                        this.setState({twoHour: true})
                    if (prefrence.cancellation_policy_value === "2")
                        this.setState({oneHour: true})
                    if (prefrence.cancellation_policy_value === "3")
                        this.setState({thirtyMin: true})

                    if (prefrence.no_show_policy_value === "1")
                        this.setState({bookingPrefrence: true})
                    if (prefrence.no_show_policy_value === "2")
                        this.setState({cancellationNoShow: true})
                    if (prefrence.no_show_policy_value === "3")
                        this.setState({surgePrice: true})

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

    checkBox(val) {
        if(this.state.policy)
        {
            if (val === "2 Hours Ahead,No Fee, 1 Reschedule") {
                if (this.state.twoHour === false)
                    this.setState({twoHour: true,oneHour:false,thirtyMin:false})
                /* else
                     this.setState({twoHour: false})*/
            } else if (val === "1 Hour Ahead, 15% Fee, 1 Reschedule") {
                if (this.state.oneHour === false)
                    this.setState({oneHour: true,twoHour: false,thirtyMin:false})
                /*else
                    this.setState({oneHour: false})*/
            } else if (val === "30 Minutes Ahead, 25% Fee, 1 Reschedule") {
                if (this.state.thirtyMin === false)
                    this.setState({thirtyMin: true,twoHour: false,oneHour:false})
                /* else
                     this.setState({thirtyMin: false})*/
            }
        }

        if(this.state.noShowPolicy)
        {
            if (val === "Charge 100%") {
                if (this.state.bookingPrefrence === false)
                    this.setState({bookingPrefrence: true,cancellationNoShow:false,surgePrice:false})
                /* else
                     this.setState({bookingPrefrence: false})*/
            } else if (val === "Charge 75%") {
                if (this.state.cancellationNoShow === false)
                    this.setState({cancellationNoShow: true,bookingPrefrence: false,surgePrice:false})
                /*else
                    this.setState({cancellationNoShow: false})*/
            } else if (val === "Charge 50%") {
                if (this.state.surgePrice === false)
                    this.setState({surgePrice: true,bookingPrefrence: false,cancellationNoShow:false})
                /*else
                    this.setState({surgePrice: false})*/
            }
        }


    }

    setPolicy() {
        if (this.state.policy === true)
            this.setState({policy: false,twoHour: false,oneHour:false,thirtyMin:false})
        else
            this.setState({policy: true})
    }

    setNoShowPolicy() {
        if (this.state.noShowPolicy === true)
            this.setState({noShowPolicy: false,surgePrice: false,bookingPrefrence: false,cancellationNoShow:false})
        else
            this.setState({noShowPolicy: true})
    }

    renderRow(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 25, marginLeft: 40}}>
            <CheckBox rightText={item.title}  onClick={() => this.checkBox(item.title)
            } isChecked={item.value} style={{width:"90%"}}/>
           {/* <Text style={styles.row_title}>{item.title}</Text>*/}
        </View>;
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "CANCELLATIONS & NO-SHOWS", style: {color: "#fff"}}}
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
                    <Text style={styles.txtHeader}>CANCELLATIONS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                            <Image style={styles.leftIcon}
                                   source={require("../../../assets/images/ic_cancellation_policy.png")}/>
                            <Text style={styles.row_title}>Cancellation Policy</Text>
                            <Switch onChange={() => this.setPolicy()} value={this.state.policy} style={{
                                transform: [{ scaleX: .8 }, { scaleY: .8 }],
                                position: 'absolute',
                                right: 14,
                                alignSelf: 'center',
                                tintColor: 'white'
                            }}/>
                        </View>
                    </View>
                    {this.renderRow({title: "2 Hours Ahead,No Fee, 1 Reschedule", value: this.state.twoHour})}
                    {this.renderRow({title: "1 Hour Ahead, 15% Fee, 1 Reschedule", value: this.state.oneHour})}
                    {this.renderRow({title: "30 Minutes Ahead, 25% Fee, 1 Reschedule", value: this.state.thirtyMin})}
                    <Text style={styles.txtHeader}>NO-SHOWS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                            <Image style={styles.leftIcon} source={require("../../../assets/images/ic_no_show.png")}/>
                            <Text style={styles.row_title}>No-Show Policy</Text>
                            <Switch onChange={() => this.setNoShowPolicy()} value={this.state.noShowPolicy} style={{
                                transform: [{ scaleX: .8 }, { scaleY: .8 }],
                                position: 'absolute',
                                right: 14,
                                alignSelf: 'center',
                                tintColor: 'white'}}/>
                        </View>
                    </View>
                    {this.renderRow({title: "Charge 100%", value: this.state.bookingPrefrence})}
                    {this.renderRow({title: "Charge 75%", value: this.state.cancellationNoShow})}
                    {this.renderRow({title: "Charge 50%", value: this.state.surgePrice})}

                    <TouchableOpacity style={[globalStyles.button, {marginTop: 70, marginBottom: 30, width: '70%'}]}
                                      onPress={() => {
                                          this.updateCancellation()
                                      }}>
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
        height: 16,
        width: 16,
        marginLeft: 8,
        alignSelf: 'center',
        resizeMode: "contain"
    },
    row_title: {
        color: Colors.white,
        marginTop: 0,
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
