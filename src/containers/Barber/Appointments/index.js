import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Alert} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";
import {SafeAreaView} from "react-navigation";
var moment = require("moment");

let appointmentId="",clr = "", clientName = "", createdAt = "", startTime = "", endTime = "", price = "", services = "",client_image="",
    totalServices = "";
export default class Appointments extends Component {

    constructor(props) {
        super(props);

        const {navigation} = this.props;
        appointmentId = navigation.getParam('appointmentId');
        clr = navigation.getParam('bgc');
        clientName = navigation.getParam('clientName');
        createdAt = navigation.getParam('createdAt');
        startTime = navigation.getParam('startTime');
        endTime = navigation.getParam('endtTime');
        price = navigation.getParam('price');
        var m = moment(new Date(createdAt));
        client_image=navigation.getParam("client_Image")
        services = navigation.getParam('services');
        console.log("Servicesss-->",services)
        totalServices = services.split(",");
        createdAt=m.format("DD-MM-YYYY HH:MM:SS");
        console.log("gettingUSersignIn--->" +m.format("DD-MM-YYYY HH:MM:SS"));
        this.state={
            showLoading:false,
        }
    }


    renderRowSurge(item) {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                <Image style={styles.leftIcon} source={item.ic}/>
                <Text style={styles.row_title}>{item.title}</Text>
                <Switch
                    trackColor="#00D200"
                    thumbColor="#fff"
                    value={true} style={{
                    transform: [{ scaleX: .8 }, { scaleY: .8 }],
                    position: 'absolute',
                    top: 5,
                    right: 14,
                    alignSelf: 'center',
                    tintColor: 'white',
                }}/>
            </View>
            <Text style={{marginStart: 30, color: "grey", fontStyle: "italic", height: 20}}>{item.hint}</Text>
        </View>
    }

    renderRowapp(item) {
        return <View style={{
            flexDirection: "row",
            width: "100%",
            height: 60,
            marginTop: 10
        }}>
            <View style={{width: "20%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                <Image resizeMode={"contain"} source={item.ic} style={{width: 40, height: 40}}/>
            </View>
            <View style={{width: "80%", height: "100%", justifyContent: "center", marginStart: 10}}>
                <Text style={{fontSize: 12, color: "white"}}>
                    {item.text1}
                </Text>
                <Text style={{fontSize: 12, color: "#6D757D"}}>
                    {item.text2}
                </Text>
            </View>
        </View>
    }

    renderRowBox(item) {
        return <View style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <View style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Image source={item.img} style={{resizeMode: "contain", height: 25, width: 25}}/>
                <Text style={{fontWeight: "bold", fontSize: 16, color: "white"}}>
                    {item.title}
                </Text>
            </View>
            <View style={{width: 0.5, backgroundColor: "#52525D", marginStart: 50}}></View>
        </View>
    }

    renderRowButtons(item) {
        return <TouchableOpacity
                style={{
                    flexDirection: "row",
                    height: 28,
                    bottom: 20,
                    marginBottom: 70,
                    marginStart:20,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    borderWidth: 0.2,
                    borderColor: "white",
                    backgroundColor: "#626371"
                }}>
                <Image source={require("../../../assets/images/tick.png")}
                       style={{resizeMode: "contain", height: 15, width: 15,marginStart:10}}/>
                <Text style={[globalStyles.receiptButtonText, {marginStart: 5, fontWeight: "bold",marginEnd:10}]}>{item.text}</Text>

            </TouchableOpacity>
    }

    updateAppointment(status)
    {
        let Appointmentstatus=0;
        if(status==="complete")
            Appointmentstatus=1;
        if(status==="inprogress")
            Appointmentstatus=2;
        if(status==="confirm")
            Appointmentstatus=3;
        if(status==="pending")
            Appointmentstatus=4;
        if(status==="cancelled")
            Appointmentstatus=5;
        if(status==="noshow")
            Appointmentstatus=6;
        this.setState({showLoading:true})
        var details = {
            appointment_id: appointmentId,
            appointment_type: Appointmentstatus,
        };
        console.log("Credentials",JSON.stringify(details));
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.BarberUpdateAppointmentStatus, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseAddReviews-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading:false})
                    this.setState({showLoading: false});
                    Alert.alert("Success!","Appointment Status changed successfully.")
                    this.props.navigation.goBack();
                } else {
                    this.setState({showLoading:false})
                    this.setState({showLoading: false});
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            })
            .catch(error => {
                this.setState({showLoading:false})
                //console.error('Errorr:', error);
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
                    centerComponent={{text: "APPOINTMENTS", style: {color: "#fff"}}}
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
                        </TouchableOpacity>}/>
                <ScrollView>
                    <View style={{flexDirection: "column"}}>
                        <View style={{height: 300, width: "100%"}}>
                            <View style={{width: "100%", height: 200}}>
                                <Image resizeMode={"cover"} source={require("../../../assets/images/banner_surge.png")}
                                       style={{width: "100%", height: "100%"}}/>
                            </View>
                            <View style={{
                                flexDirection: "column",
                                width: "100%",
                                position: "absolute",
                                alignItems: "center",
                                top: 120
                            }}>
                                <Image resizeMode={"cover"} source={{uri:client_image}}
                                       style={[styles.profileImage, {position: "absolute", width: 150, height: 150,borderRadius:75}]}/>
                                <Text style={{
                                    marginTop: 155,
                                    fontSize: 16,
                                    color: "white",
                                    fontWeight: "bold"
                                }}>{clientName}</Text>
                            </View>
                        </View>
                        {/*CONFIRMED*/}
                        {clr === "#00B6FF" &&
                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                            height: 80,
                            backgroundColor: "grey",
                            marginTop: 15
                        }}>
                            <View style={{width: "33.3%", backgroundColor: "#5BD900", height: "100%"}}>
                                <TouchableOpacity onPress={()=>this.updateAppointment("complete")}>
                                {this.renderRowBox({
                                    img: require("../../../assets/images/tick-2.png"),
                                    title: "Complete"
                                })}
                                </TouchableOpacity>
                            </View>
                            <View style={{width: "33.3%", backgroundColor: "#A5AAAE", height: "100%"}}>
                                <TouchableOpacity  onPress={()=>this.updateAppointment("noshow")}>
                                {this.renderRowBox({
                                    img: require("../../../assets/images/-.png"),
                                    title: "No-Show"
                                })}
                                </TouchableOpacity>
                            </View>
                            <View style={{width: "33.3%", backgroundColor: "#F7001E", height: "100%"}}>
                                <TouchableOpacity  onPress={()=>this.updateAppointment("cancelled")}>
                                {this.renderRowBox({
                                    img: require("../../../assets/images/x.png"),
                                    title: "Cancel"
                                })}
                                </TouchableOpacity>
                            </View>
                        </View>
                        }
                        {/*//complete*/}
                        {clr === "#46d400" &&
                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                            height: 80,
                            backgroundColor: "grey",
                            marginTop: 15
                        }}>
                            <View style={{width: "100%", backgroundColor: "#5BD900", height: "100%"}}>
                                {this.renderRowBox({
                                    img: require("../../../assets/images/tick-2.png"),
                                    title: "Completed!"
                                })}</View>
                        </View>}
                        {/*NO-SHOW*/}
                        {clr === "#6c6f79" &&
                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                            height: 80,
                            backgroundColor: "grey",
                            marginTop: 15
                        }}>
                            <View style={{width: "100%", backgroundColor: "#A5AAAE", height: "100%"}}>
                                {this.renderRowBox({
                                    img: require("../../../assets/images/-.png"),
                                    title: "No-Show"
                                })}
                            </View>
                        </View>}
                        {/*CANCEL*/}
                        {clr === "#f40323" &&
                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                            height: 80,
                            backgroundColor: "grey",
                            marginTop: 15
                        }}>
                            <View style={{width: "100%", backgroundColor: "#F7001E", height: "100%"}}>
                                {this.renderRowBox({
                                    img: require("../../../assets/images/x.png"),
                                    title: "Cancelled!"
                                })}
                            </View>
                        </View>
                        }
                        {this.renderRowapp({
                            ic: require("../../../assets/images/calender.png"),
                            text1: createdAt,
                            text2: startTime + " - " + endTime,
                        })}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Receipt")}>
                            {this.renderRowapp({
                                ic: require("../../../assets/images/surg_price.png"),
                                text1: "$"+price,
                                text2: "SURGE PRICE : $0"
                            })}
                        </TouchableOpacity>
                        <View style={{height: 0.5, backgroundColor: "#52525D", marginStart: 90, marginTop: 10}}></View>
                        <Text style={{
                            fontSize: 11,
                            color: "#6D757D",
                            marginStart: 25,
                            marginTop: 10,
                            fontWeight: "bold"
                        }}>SERVICES SELECTED </Text>
                        <View style={{flexDirection: "row", width: "100%", marginTop: 25}}>
                            {
                                totalServices.map((l) => (
                                    this.renderRowButtons({
                                        text:l,
                                    })
                                ))
                            }
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
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")} style={{width:60,height:60, opacity: 1,}}/>
                </View>}
            </View>);
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
