import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import CodeInput from 'react-native-confirmation-code-input';
import {styles} from './styles';
import {CloseButton, RedButton} from '../../../components';
import {Colors} from '../../../themes';
import Preference from "react-native-preference";

let Code = "",number="";


class ConfirmSMSScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        Code = navigation.getParam('Code');
        number=navigation.getParam("number");
        console.log("gettingUSersignIn--->" + Code);

        this.state = {
            No: undefined,
            codeVerified:false,
        };
        this.state.No = number+"-"+Code;
    }

    onClose = () => {
       // alert('onClose');
        this.props.navigation.goBack();
    };

    onFinishCheckingCode = (isValid, code) => {
        console.info('isValid', isValid);
        console.info('code', code);
        if (isValid) {
            if (code === Code) {
                this.setState({codeVerified:true})
            }
        } else {
            alert('invalid');
        }
    };

    onSubmit = () => {
        if(this.state.codeVerified)
        {
            if (Preference.get("userType") === "Barber") {
                this.props.navigation.navigate('BarberEditProfile');
            } else if (Preference.get("userType") === "Client") {
                this.props.navigation.navigate("ClientEditProfile")
            }
        }else
            Alert.alert("Warning!","Your enter code is invalid");

    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.closeContainer}>
                    <CloseButton onPress={this.onClose}/>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.whiteBoldBigText}>
                        Confirmation
                    </Text>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.whiteText}>
                            {`We just sent on SMS to\n ${this.state.No}\n with your verification code.\nEnter the 2-step verification code below.`}
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <CodeInput
                            ref="codeInputRef2"
                            keyboardType="numeric"
                            codeLength={5}
                            className="border-b"
                            compareWithCode={Code}
                            autoFocus={false}
                            codeInputStyle={styles.codeInputStyle}
                            onFulfill={this.onFinishCheckingCode}
                            inactiveColor={Colors.border}
                        />
                    </View>
                    <View style={styles.resendContainer}>
                        <Text style={styles.whiteSmallText}>
                            {`Didn't get it? `}
                        </Text>
                        <TouchableOpacity style={styles.resendButton}>
                            <Text style={styles.whiteSmallBoldText}>
                                Resend code
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <RedButton label="Submit" onPress={this.onSubmit}/>
                </View>
            </SafeAreaView>
        )
    }
}

export default ConfirmSMSScreen;
