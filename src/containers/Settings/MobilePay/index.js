import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import Preference from "react-native-preference"

export default class MobilePay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobilePayText: "Enable Mobile Pay"
        }
    }

    componentDidMount(): void {
        if (Preference.get("userMobilePay") === true) {
            this.setState({mobilePayText: "Disable Mobile Pay"})
        } else {
            this.setState({mobilePayText: "Enable Mobile Pay"})
        }
    }

    setMobilePay() {
        //alert("Mobile Pay");
        if (Preference.get("userMobilePay") === true) {
            Preference.set("userMobilePay", false);
            this.setState({mobilePayText: "Enable Mobile Pay"})
        } else {
            this.props.navigation.push("MobilePaySettings");
            /*Preference.set("userMobilePay", true);
            this.setState({mobilePayText: "Disable Mobile Pay"})
            if (Preference.get("newUser") === true) {
                this.props.navigation.push("MobilePaySettings");
            } else {
                //this.props.navigation.goBack();
                this.props.navigation.push("MobilePaySettings");
            }*/
        }



    }

    render() {
        return (<View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "MOBILE PAY", style: {color: "#fff"}}}
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
                    <View style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require("../../../assets/images/logo.png")}
                            style={{marginTop: 20, resizeMode: 'contain', width: 200}}/>
                        <Text style={{color: "white", fontSize: 35}}>+</Text>
                        <Image
                            source={require("../../../assets/images/mobile-pay-logo-png-5.png")}
                            style={{resizeMode: 'contain', width: 240, marginTop: -20}}/>
                        <Text style={{color: "white", justifyContent: "center", alignItems: "center", fontSize: 12}}>Allow
                            your Clients to pay through </Text>
                        <Text
                            style={{color: "white", justifyContent: "center", alignItems: "center", fontSize: 12}}> the
                            app with Mobile Pay.</Text>
                        <Text style={{
                            color: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 12
                        }}> Receive the deposits as quickly as next bussiness day.</Text>
                        <Text style={{
                            color: "white",
                            justifyContent: "center",
                            alignContent: "center",
                            fontSize: 20,
                            fontWeight: "bold",
                            marginTop: 60
                        }}>{"GET STARTED TODAY!"}</Text>
                        <Image resizeMode={"contain"} source={require("../../../assets/images/down_arrow.png")}
                               style={{width: 12}}/>
                        <TouchableOpacity style={[globalStyles.button, {marginTop: 60, width: 300}]}
                                          onPress={() => this.setMobilePay()}>
                            <Text style={globalStyles.buttonText}>{this.state.mobilePayText}</Text>
                        </TouchableOpacity>
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