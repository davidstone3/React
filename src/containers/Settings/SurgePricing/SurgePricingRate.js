import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";

let client_id,
    barber_id,
    barberImage,
    barberName,
    barberShopName,
    appointmentPrice,
    selected_services,
    date,
    selected_slot_id,
    total_price,
    service_fee,
    selected_surge_price,barberMobilePay,surgeprice;
export default class SurgePricingRate extends Component {

    constructor(props) {
        super(props)
        const {navigation} = this.props;
        client_id = navigation.getParam('client_id');
        barber_id = navigation.getParam('barber_id');
        barberImage=navigation.getParam('barberImage');
        barberName = navigation.getParam('barberName');
        barberShopName = navigation.getParam('barberShopName');
        appointmentPrice = parseInt(navigation.getParam('appointmentPrice'));
        selected_services = navigation.getParam('selected_services');
        date = navigation.getParam('date');
        selected_slot_id = navigation.getParam('selected_slot_id');
        total_price = navigation.getParam('total_price');
        service_fee = navigation.getParam('service_fee');
        selected_surge_price = navigation.getParam('selected_surge_price');
        barberMobilePay= navigation.getParam('barberMobilePay');
        surgeprice=parseInt(total_price)/2;
        this.state={
            surgePrice:surgeprice,
        }
    }

    bookApointment() {
        var details = {
            client_id: Preference.get("userId"),
            barber_id: barber_id,
            selected_services:selected_services,
            date: date,
            selected_slot_id: selected_slot_id,
            total_price: surgeprice,
            service_fee: "1",
            selected_surge_price: true,
            cus_stripe_id: "",
            transaction_id:"",
            balance_transaction: "" ,
            destination: "" ,
            destination_payment: "" ,
            source_transaction: "",
            payment_date: "",
            payment_created : ""
        };
        console.log("Outputdata::::" + JSON.stringify(details));
        fetch(constants.ClientBookAppointment, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details),
        }).then(response => response.json())
            .then(response => {
                console.log("ClientBookAppointment-->", "-" + JSON.stringify(response));
                this.setState({showLoading: false})

                if (response.ResultType === 1) {
                    Alert.alert("Success!", "Appointment is Booked successfully.");
                    this.props.navigation.navigate('ClientLeaveReview',{
                        client_id: Preference.get("userId"),
                        barber_id: barber_id,
                        barberImage: barberImage,
                        barberName: barberName,
                        barberShopName: barberShopName,
                        appointmentPrice: appointmentPrice,
                        selected_services: selected_services,
                        date: date,
                        selected_slot_id: selected_slot_id,
                        total_price: surgeprice,
                        service_fee:service_fee,
                        selected_surge_price: selected_surge_price,
                        appointmentId:response.Data._id
                    });
                } else {
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

    checkBooking()
    {
        if (barberMobilePay === "mobilePay") {
            this.props.navigation.navigate("PaymentMethodClient",{
                client_id: Preference.get("userId"),
                barber_id: barber_id,
                barberImage: barberImage,
                barberName: barberName,
                barberShopName: barberShopName,
                appointmentPrice: appointmentPrice,
                selected_services: selected_services,
                date: date,
                selected_slot_id: selected_slot_id,
                total_price: surgeprice,
                service_fee: "1",
                selected_surge_price:selected_surge_price,
            })
        } else {
          this.bookApointment();
        }
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
                                source={require("../../../assets/images/ic_back.png")}/>
                        </TouchableOpacity>
                    }/>
                <ScrollView>
                    <View style={{flexDirection: "column",alignItems:"center"}}>
                        <View style={[styles.row, {marginTop: 20}]}>
                            <Text style={[{textAlign: "center", color: "white",fontWeight:"bold",fontSize:13}]}>
                                Your price on this session</Text>
                            <Text style={[{textAlign: "center", color: "white",fontWeight:"bold",fontSize:13}]}>
                                will be higher than normal,when</Text>
                            <Text style={[{textAlign: "center", color: "white",fontWeight:"bold",fontSize:13}]}>
                                demand is high we increase the rates.</Text>
                        </View>
                        <Image resizeMode={"contain"} style={{width:300,height:300}}
                               source={require("../../../assets/images/circle_rates.png")}/>
                        <View style={{alignItems: "center",flexDirection:"column"}}>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 25,
                                    width: 160,
                                    backgroundColor: "#494A56",
                                }}>
                                <Text style={[globalStyles.buttonText, {color: "#16ABDB"}]}>Surge Price</Text>
                                <Text style={[globalStyles.buttonText, {color: "#16ABDB",marginBottom:5}]}>+${this.state.surgePrice}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{
                                this.checkBooking()
                            }} style={[globalStyles.button, {
                                height: 35,
                                width: 250,
                                backgroundColor: "red",
                                marginTop:20,
                            }]}>
                                <Text style={{fontSize:14,fontWeight:"bold",color:"white"}}>Accept Higher Rate</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.goBack();
                            }} style={[globalStyles.button, {
                                height: 35,
                                width: 250,
                                backgroundColor: "red",
                                marginTop:20,
                            }]}>
                                <Text style={{fontSize:14,fontWeight:"bold",color:"white"}}>Cancel</Text>
                            </TouchableOpacity>
                            <Text style={{textAlign: "center", color: "white",marginTop:20,fontSize:12}}>
                                Current Rate Expires in 10 Minutes</Text>
                        </View>
                    </View>
                </ScrollView>
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
