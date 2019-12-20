import React, {Component} from "react";
//import rect in our project
import {StyleSheet, View, FlatList, Text, Image} from "react-native";
//import all the components we will need
import {Colors} from "../../../themes";
import {styles} from "./styles";
import {Avatar} from "react-native-elements";
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";
import {Header, AirbnbRating} from "react-native-elements";

export default class Notifications extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: {},
            Notifications: [],
            NoNotification: false
        };
    }

    componentDidMount() {
        var that = this;
        let items = Array.apply(null, Array(3)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });
        that.setState({
            dataSource: items
        });
        this.getNotification()

    }

    getNotification() {
        this.state.Notifications = [];
        fetch(constants.GetNotifications + "?barber_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responsegetNotifications-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({Notifications: response.Data})
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: getNotification " + error);
        });
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0,
                    width: "86%",
                    backgroundColor: "white",
                    marginLeft: "10%"
                }}
            />
        );
    };

    renderRowNotification(item) {
        let imagePath = "";
        let bgTitle="";
        let textColorTitle="";
        let timeDate=item.createdAt;
        timeDate=timeDate.split("T");
        let realTime=timeDate[1];
        realTime=realTime.split(":");
        if (item.notification_type === "New Booking") {
            imagePath = require("../../../assets/images/new_booking.png");
            bgTitle="#563E2D";
            textColorTitle="#E87C04";
        }
        if (item.notification_type === "New Review") {
            imagePath = require("../../../assets/images/new_review.png");
            bgTitle="#235731";
            textColorTitle="#30D121";
        }
        if (item.notification_type === "completed") {
            imagePath = require("../../../assets/images/completed.png");
            bgTitle="#235731";
            textColorTitle="#30D121";
        }
        if (item.notification_type === "New Customer") {
            imagePath = require("../../../assets/images/new_customer.png");
            bgTitle="#612163";
            textColorTitle="#E206BA";
        }
        if (item.notification_type === "cancelled") {
            imagePath = require("../../../assets/images/cancelled_noti.png");
            bgTitle="#661C2B";
            textColorTitle="#CC070D";
        }
        if (item.notification_type === "no show") {
            imagePath = require("../../../assets/images/noshow_noti.png");
            bgTitle="#3F404D";
            textColorTitle="#7C7C80";
        }
        if (item.notification_type === "confirmed") {
            imagePath = require("../../../assets/images/confirmed_noti.png");
            bgTitle="#21546E";
            textColorTitle="#219CD5";
        }

        if (item.notification_type === "New Review") {
            return (<View style={{height: 160, flexDirection: "row"}}>
                <View style={{marginLeft: 10, flexDirection: "column"}}>
                    <View
                        style={{
                            width: 1,
                            alignSelf: "center",
                            backgroundColor: Colors.border,
                            height: 30
                        }}/>
                    <View style={styles.circular_container}>
                        <Image
                            resizeMode="stretch"
                            source={imagePath}
                            style={{height: 30, width: 30, alignSelf: "center"}}/>
                    </View>
                    <View
                        style={{
                            width: 1,
                            alignSelf: "center",
                            backgroundColor: Colors.border,
                            height: 70
                        }}/>
                </View>
                <View style={{flexDirection: "column", marginTop: 30, height: 100}}>
                    <View style={{flexDirection: "row", height: 60}}>
                        <Image
                            source={{uri:item.client_image}}
                            style={{
                                marginLeft: 10,
                                height: 50,
                                borderRadius:30,
                                width: 50
                            }}
                        />
                        <Text style={[styles.client_name,{marginBottom:10}]}>
                            {item.client_firstname+" "+item.client_lastname}
                        </Text>
                    </View>
                    <View style={{flexDirection: "row",marginStart:10}}>
                        <Image source={require("../../../assets/images/chair.png")}
                               resizeMode={"contain"}
                               style={{
                                   height: 12,
                                   width: 12,
                                   marginTop: 3

                               }}
                        />
                        <Text
                            style={{color: "#95A2B5", fontSize: 12}}>{" "+realTime[0]+":"+realTime[1]}</Text>
                        <View style={{
                            flexDirection: "column",
                            width: 1, height: 13,
                            backgroundColor: "grey",
                            marginStart: 10,
                            marginEnd: 10
                        }}/>
                        <AirbnbRating
                            isDisabled={true}
                            showRating={false}
                            count={5}
                            defaultRating={3}
                            size={10}
                        />
                        <Text style={[styles.rating_text, {fontSize: 12,color:"white"}]}>{" 3 of 5"} </Text>
                    </View>
                    <Text style={[styles.rating_text, {fontSize: 12,color:"white",marginStart:10,marginTop:10}]}>{" Your cutting was very good."} </Text>
                </View>

                <View style={{
                    flexDirection: "column",
                    marginLeft: 10,
                    marginTop: 15}}/>

                <View style={{position: "absolute", right: 10, top: 20}}>
                    <View style={[styles.status_container,{backgroundColor:bgTitle}]}>
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 13,
                                fontWeight:"bold",
                                marginTop: 4,
                                color: textColorTitle
                            }}>{item.notification_type}</Text>
                    </View>
                    <Text style={styles.time_ago}>
                        {timeDate[0]}
                    </Text>
                </View>
                <View style={{
                    position: "absolute",
                    bottom: 1,
                    left: 80,
                    right: 0,
                    height: 0.5,
                    backgroundColor: Colors.border
                }}/>
            </View>);
        }else {
            return (<View style={{height: 140, flexDirection: "row"}}>
                <View style={{marginLeft: 10, flexDirection: "column"}}>
                    <View
                        style={{
                            width: 1,
                            alignSelf: "center",
                            backgroundColor: Colors.border,
                            height: 30
                        }}/>
                    <View style={styles.circular_container}>
                        <Image
                            resizeMode="stretch"
                            source={imagePath}
                            style={{height: 30, width: 30, alignSelf: "center"}}/>
                    </View>
                    <View
                        style={{
                            width: 1,
                            alignSelf: "center",
                            backgroundColor: Colors.border,
                            height: 70
                        }}/>
                </View>
                <View style={{flexDirection: "column", marginTop: 30, height: 100}}>
                    <View style={{flexDirection: "row", height: 60}}>
                        <Image
                            source={{uri:item.client_image}}
                            style={{
                                marginLeft: 10,
                                height: 50,
                                borderRadius:30,
                                width: 50
                            }}
                        />
                        <Text style={[styles.client_name,{marginBottom:10}]}>
                            {item.client_firstname+" "+item.client_lastname}
                        </Text>
                    </View>
                    <View style={{flexDirection: "row",marginStart:10}}>
                        <Image source={require("../../../assets/images/chair.png")}
                               resizeMode={"contain"}
                               style={{
                                   height: 12,
                                   width: 12,
                                   marginTop: 3

                               }}
                        />
                        <Text
                            style={{color: "#95A2B5", fontSize: 12}}>{" "+realTime[0]+":"+realTime[1]}</Text>
                        <View style={{
                            flexDirection: "column",
                            width: 1, height: 13,
                            marginTop: 3,
                            backgroundColor: "grey",
                            marginStart: 10,
                            marginEnd: 10
                        }}/>
                        <Text style={{color: "#95A2B5", fontSize: 12}}>{" $5.00" }</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: "column",
                    marginLeft: 10,
                    marginTop: 15}}/>

                <View style={{position: "absolute", right: 10, top: 20}}>
                    <View style={[styles.status_container,{backgroundColor:bgTitle}]}>
                        <Text
                            style={{
                                alignSelf: "center",
                                fontSize: 13,
                                fontWeight:"bold",
                                marginTop: 4,
                                color: textColorTitle
                            }}>{item.notification_type}</Text>
                    </View>
                    <Text style={styles.time_ago}>
                        {timeDate[0]}
                    </Text>
                </View>
                <View style={{
                    position: "absolute",
                    bottom: 1,
                    left: 80,
                    right: 0,
                    height: 0.5,
                    backgroundColor: Colors.border
                }}/>
            </View>);
        }

    }

    renderRowSurge2(item) {
        return <View
            style={{
                flexDirection: 'row',
                marginTop: 10,
                width: "100%",
                alignItems: "center",
                height: 70,
                justifyContent: "center",
                backgroundColor: "#474857",
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: "white"
            }}>
            <Text
                style={{fontSize: 15, color: "white"}}
            >{item.title}</Text>

        </View>
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                {this.state.Notifications.length < 1 ?
                    this.renderRowSurge2({
                        title: "You have no notifications yet!"
                    }) :
                    <FlatList
                        data={this.state.Notifications}
                        renderItem={({item}) => (
                            this.renderRowNotification(item)
                        )}
                        numColumns={1}
                        keyExtractor={(item, index) => index}
                    />}
            </View>
        );
    }
}
