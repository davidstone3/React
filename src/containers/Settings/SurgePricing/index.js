import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import PopupDialog from 'react-native-popup-dialog';
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import {constants} from "../../../utils/constants";

import Preference from "react-native-preference";


export default class SurgePricing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DialogSurgePrice: false,
            showLoading: false,
            surgePrice: false,
            holidays: false,
            birthday: false,
            anyDayAfter10: false,
            houseCall: false,
            radiousLimit: 0,
            duration: 0,
            price: 0,
            DialogVisible: false,
        }
    }

    componentDidMount(): void {
        this.getSurgePricing()
    }

    updateSurgePricing() {
        let holidayBit = 0;
        let birthdaysBit = 0;
        let any_day_after_10pmBit = 0;
        let houseCallBit = 0;
        if (this.state.holidays === true)
            holidayBit = 1;
        else
            holidayBit = 0;

        if (this.state.birthday === true)
            birthdaysBit = 1;
        else
            birthdaysBit = 0;

        if (this.state.anyDayAfter10 === true)
            any_day_after_10pmBit = 1;
        else
            any_day_after_10pmBit = 0;

        if (this.state.houseCall === true)
            houseCallBit = 1;
        else
            houseCallBit = 0;


        console.log("SurgeData1:-->" + holidayBit)
        console.log("SurgeData2:-->" + birthdaysBit)
        console.log("SurgeData3:-->" + any_day_after_10pmBit)
        console.log("SurgeData4:-->" + houseCallBit)

        this.setState({showLoading: true})
        var details = {
            user_id: Preference.get("userId"),
            surge_radius_limit: this.state.radiousLimit,
            surge_duration: this.state.duration,
            surge_price: this.state.price,
            surge_pricing: this.state.surgePrice,
            holidays: holidayBit,
            birthdays: birthdaysBit,
            any_day_after_10pm: any_day_after_10pmBit,
            housecall: houseCallBit,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.UpdateSurgePricing, {
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
                    this.setState({showLoading: false});
                    alert("Surge Pricing updated successfully");
                    if (Preference.get("newUser") === true)
                        this.props.navigation.push("BookingPreferences");
                    else
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

    getSurgePricing() {
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
                    if (prefrence.surge_pricing === 1)
                        this.setState({surgePrice: true})
                    if (prefrence.holidays === 1)
                        this.setState({holidays: true})
                    if (prefrence.birthdays === 1)
                        this.setState({birthday: true})
                    if (prefrence.any_day_after_10pm === 1)
                        this.setState({anyDayAfter10: true})
                    if (prefrence.housecall === 1)
                        this.setState({houseCall: true})

                    this.setState({
                        radiousLimit: prefrence.surge_radius_limit,
                        duration: prefrence.surge_duration,
                        price: prefrence.surge_price
                    })


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

    setSurgePrice() {
        if (Preference.get("userPackage") === "basic") {
            this.setState({DialogSurgePrice: true})
        } else {
            if (this.state.surgePrice === true)
                this.setState({surgePrice: false,holidays:false,birthday:false,anyDayAfter10:false,houseCall:false})
            else
                this.setState({surgePrice: true})
        }

    }

    checkBox(val) {
        if(this.state.surgePrice)
        {
            if (val === "Holidays") {
                if (this.state.holidays === false)
                    this.setState({holidays: true})
                else
                    this.setState({holidays: false})
            } else if (val === "Birthday") {
                if (this.state.birthday === false)
                    this.setState({birthday: true})
                else
                    this.setState({birthday: false})
            } else if (val === "Any Day After 10 PM") {
                if (this.state.anyDayAfter10 === false)
                    this.setState({anyDayAfter10: true})
                else
                    this.setState({anyDayAfter10: false})
            } else if (val === "HouseCall") {
                if (this.state.houseCall === false)
                    this.setState({houseCall: true})
                else
                    this.setState({houseCall: false})
            }
        }

    }

    renderRowWithCheck(item) {
        return <TouchableOpacity onPress={()=>this.checkBox(item.title)} style={{flex: 1, flexDirection: 'row', height: 22, marginLeft: 40}}>
            <CheckBoxSquare rightText={item.title} onClick={() => this.checkBox(item.title)} rightText={item.title} isChecked={item.value} style={{width:160}}/>
           {/* <Text style={[styles.row_title, {fontSize: item.fontSize}]}>{item.title}</Text>*/}
            {(item.title === "Birthday") &&
            <Text style={[styles.row_title, {fontSize: 14}]}>{"- " + Preference.get("userDOB")}</Text>}

            {item.infoIcon && <TouchableOpacity onPress={() => Alert.alert(
                'Holidays', " New Years, Valentines Day, Easter, Cinco de Mayo, 4th of July, Memorial Day, Labor Day, Halloween, Thanksgiving, Christmas")}>
                <Image style={{marginStart: 10, width: 16, height: 16, marginTop: 3}}
                       source={require("../../../assets/images/info.png")}/>
            </TouchableOpacity>}
        </TouchableOpacity>;
    }

    renderRowSurge(item) {
        return <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', height: 20}}>
                <Image style={styles.leftIcon} source={item.ic}/>
                <Text style={styles.row_title}>{item.title}</Text>
                <Switch
                    trackColor="#00D200"
                    thumbColor="#fff"
                    onChange={() => this.setSurgePrice()}
                    value={this.state.surgePrice} style={{
                    transform: [{ scaleX: .8 }, { scaleY: .8 }],
                    position: 'absolute',
                    top: 8,
                    right: 14,
                    alignSelf: 'center',
                    tintColor: 'white',
                }}/>
            </View>
            <Text style={{
                marginStart: 30,
                color: "grey",
                fontStyle: "italic",
                height: 15,
                marginBottom: 10
            }}>{item.hint}</Text>
        </View>
    }

    renderRowSurge2(item) {
        return <View style={{flex: 1, flexDirection: 'row', marginStart: 15, marginTop: 5}}>
            <Text style={{color: "grey", fontSize: 11}}>{item.hint}</Text>
            <Text style={{marginLeft: 7, fontSize: 11, fontWeight: "bold", color: "white"}}>{item.value}</Text>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "SURGE PRICING", style: {color: "#fff"}}}
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
                    <View style={[globalStyles.rowBackground, styles.row, {marginTop: 20}]}>
                        {this.renderRowSurge({
                            title: "Surge Pricing",
                            ic: require("../../../assets/images/surge_pricing.png"),
                            hint: "Supreme MemberShip Only"
                        })}
                        {/*<View style={{marginStart: 30, height: 15, marginBottom: 3}}>

                        </View>*/}
                    </View>
                    {this.renderRowWithCheck({
                        title: "Holidays",
                        value: this.state.holidays,
                        fontSize: 17,
                        infoIcon: true
                    })}
                    {this.renderRowWithCheck({
                        title: "Birthday",
                        value: this.state.birthday,
                        fontSize: 17,
                        infoIcon: false
                    })}
                    {this.renderRowWithCheck({
                        title: "Any Day After 10 PM",
                        value: this.state.anyDayAfter10,
                        fontSize: 17,
                        infoIcon: false
                    })}
                    {this.renderRowWithCheck({
                        title: "HouseCall",
                        value: this.state.houseCall,
                        fontSize: 17,
                        infoIcon: false
                    })}

                    <View
                        style={[globalStyles.rowBackground, styles.row, {marginTop: 20, marginLeft: 40, height: 30,}]}>
                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            {this.renderRowSurge2({
                                hint: "Radius Limit :",
                                value: this.state.radiousLimit
                            })}
                            {this.renderRowSurge2({
                                hint: "Duration :",
                                value: this.state.duration
                            })}
                            {this.renderRowSurge2({
                                hint: "Price :",
                                value: this.state.price
                            })}
                            <TouchableOpacity onPress={() => this.setState({DialogVisible: true})}>
                                <Image style={styles.leftIcon2} source={require("../../../assets/images/edit.png")}/>
                            </TouchableOpacity>
                            <PopupDialog
                                visible={this.state.DialogVisible}
                                width={0.6}
                                onTouchOutside={() => {
                                    this.setState({DialogVisible: false});
                                }}
                                ref={(popupDialog) => {
                                    this.popupDialog = popupDialog;
                                }}>
                                <View style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginTop: 20,
                                    marginBottom: 20
                                }}>
                                    <View style={{
                                        width: "100%",
                                        marginTop: 3,
                                        marginBottom: 3,
                                        backgroundColor: "black",
                                    }}/>
                                    {/* <Text>Radious Limit</Text>*/}
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={{fontSize: 15, color: "black", marginTop: 12}}>Radious
                                            Limit :</Text>
                                        <TextInput
                                            onChangeText={(text) => this.setState({radiousLimit: text})}
                                            value={this.state.radiousLimit}
                                            fontSize={17}
                                            keyboardType="numeric"
                                            maxLength={5}
                                            placeholder={"Radoius Limit"}
                                            autoFocus={true}
                                        />
                                    </View>

                                    <View style={{
                                        width: "100%",
                                        height: 0.2,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        backgroundColor: "black"
                                    }}/>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={{fontSize: 15, color: "black", marginTop: 12}}>Duration :</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={(text) => this.setState({duration: text})}
                                            value={this.state.duration}
                                            fontSize={17}
                                            keyboardType="numeric"
                                            placeholder={"Duration"}
                                            maxLength={5}
                                        />
                                    </View>
                                    <View style={{
                                        width: "100%",
                                        height: 0.2,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        backgroundColor: "black"
                                    }}/>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={{fontSize: 15, color: "black", marginTop: 12}}>Price :</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={(text) => this.setState({price: text})}
                                            value={this.state.price}
                                            fontSize={17}
                                            keyboardType="numeric"
                                            placeholder={"Price"}
                                            maxLength={5}
                                        />
                                    </View>
                                    <View style={{
                                        width: "100%",
                                        height: 0.2,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        backgroundColor: "black"
                                    }}/>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({DialogVisible: false});
                                    }} style={[globalStyles.button, {
                                        marginTop: 10,
                                        marginBottom: 10,
                                        height: 40,
                                        width: "80%",
                                    }]}>
                                        <Text style={globalStyles.buttonText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </PopupDialog>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => {
                    this.updateSurgePricing();
                }} style={[globalStyles.button, {
                    marginTop: 70,
                    height: 40,
                    width: 260,
                    position: "absolute",
                    bottom: 40
                }]}>
                    <Text style={globalStyles.buttonText}>DONE</Text>
                </TouchableOpacity>

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
                <PopupDialog
                    visible={this.state.DialogSurgePrice}
                    width={0.7}
                    onTouchOutside={() => {
                        this.setState({DialogVisible1: false});
                    }}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog;
                    }}
                >
                    <View style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{
                            marginTop: 10,
                            fontSize: 18,
                            textAlign: "center",
                            marginBottom: 20,
                            marginStart: 10,
                            marginEnd: 10
                        }}>Only Supreme Barbers can use this feature!
                            Do you want to upgrade your account?</Text>
                        <View style={{width: "100%", height: 1, marginBottom: 0, backgroundColor: "black"}}/>
                        <View style={{width: "100%", height: 50, flexDirection: "row"}}>
                            <TouchableOpacity onPress={() => this.setState({DialogSurgePrice: false})} style={{
                                width: "50%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Text style={{color: "red", fontSize: 18}}>NO</Text>
                            </TouchableOpacity>
                            <View style={{width: 1, height: "100%", marginBottom: 0, backgroundColor: "black"}}/>
                            <TouchableOpacity onPress={() => {
                                this.setState({DialogSurgePrice: false});
                                this.props.navigation.push("Subscription");
                            }} style={{width: "50%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: "green", fontSize: 18}}>YES</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </PopupDialog>

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
        marginTop: 10,
        marginLeft: 8,
        alignSelf: 'center',
        resizeMode: "contain"
    },
    leftIcon2: {
        height: 16,
        width: 16,
        marginTop: 6,
        marginRight: 8,
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
