import React, {Component} from 'react';
import {ImageBackground, View, Text, TextInput,Alert} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {styles} from './styles';
import {CloseButton, RedButton} from '../../../components/Buttons';
import {formatPhoneNumber, checkPhoneNumberValidation} from '../../../utils';
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";

class SMSScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            formattedNumber: ''
        }
    }

    onClose = () => {
       // alert('close');
        this.props.navigation.goBack();
    };

    getRandomNumber()
    {
       return  Math.floor(Math.random()*100000);
    }

    onContinue = () => {
        var code=this.getRandomNumber().toString()
        const {number} = this.state;
        if (checkPhoneNumberValidation(number)) {
            if (Preference.get("userType") === "Barber") {
                Alert.alert("Random Number ",code+"  "+number);
                this.sendVerifyCodeToServerBarber(code);
                //this.props.navigation.navigate('ConfirmSMSScreen',{Code:code});
            }else
            {
                Alert.alert("Random Number ",code+"  "+number);
                this.sendVerifyCodeToServerClient(code);
                //this.props.navigation.navigate('ConfirmSMSScreen',{Code:code});
            }
            console.log("RandomNumber",code);
        } else {
            alert('invalid format');
        }
    };

    onChangeText = (str) => {
        const number = str.replace(/\D/g, '');
        const formattedNumber = formatPhoneNumber(str);
        this.setState({number, formattedNumber});
    };
    sendVerifyCodeToServerBarber(code)
    {

        var details = {
            user_id: Preference.get("userId"),
            contact_no:"+1"+this.state.formattedNumber,
            code:code
        };
        console.log("BarbersSendVerfication", "-" +JSON.stringify(details));
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.BarbersSendVerfication, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responsesendVerifyCodeToServer-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    Alert.alert("Success!","Your message is successfully sent on Number Provided.");
                    this.props.navigation.navigate('ConfirmSMSScreen',{Code:code});
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            })
            .catch(error => {
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: "+error);
            });
    }

    sendVerifyCodeToServerClient(code)
    {
        var details = {
            client_id: Preference.get("userId"),
            contact_no:"+1"+this.state.formattedNumber,
            code:code
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.ClientSendVerfication, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responsesendVerifyCodeToServer-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    Alert.alert("Success!","Your message is successfully sent on Number Provided.");
                    this.props.navigation.navigate('ConfirmSMSScreen',{Code:code,number:"+1"+this.state.formattedNumber});
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            })
            .catch(error => {
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: "+error);
            });
    }

    render() {
        const {formattedNumber} = this.state;
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.parentContainer}>
                    <ImageBackground
                        source={require('../../../assets/img_background4.png')}
                        style={styles.container}
                        imageStyle={styles.backgroundImg}>
                        <View style={styles.closeContainer}>
                            <CloseButton onPress={this.onClose}/>
                        </View>
                        <Text style={styles.titleText}>
                            {`Confirm using\nyour Phone Number`}
                        </Text>
                        <View style={styles.mainContainer}>
                            <View style={[styles.inputContainer]}>
                                <View style={styles.countryCodeContainer}>
                                    <Text style={styles.titleText}>
                                        +1
                                    </Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={this.onChangeText}
                                        value={formattedNumber}
                                        keyboardType="numeric"
                                        maxLength={12}
                                        autoFocus={true}
                                    />
                                </View>
                            </View>
                            <Text style={styles.whiteText}>
                                We will send you One-Time code.
                            </Text>
                            <RedButton label="Continue" onPress={this.onContinue} style={styles.btnContainer}/>
                        </View>
                    </ImageBackground>
                    <View style={styles.bottomContainer}/>
                </SafeAreaView>
            </View>
        );
    }
}

export default SMSScreen;
