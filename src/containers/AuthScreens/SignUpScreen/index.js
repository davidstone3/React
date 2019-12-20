import React, {Component} from 'react';
import {ImageBackground, View, Text, NetInfo, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, Input, RedButton, ImageButton} from '../../../components';
import {checkEmail} from '../../../utils';
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";

const InputDataClient = [{
    iconSource: require('../../../assets/icon_name.png'),
    placeholder: 'First & Last Name',
    key: 'fullName',
}, {
    iconSource: require('../../../assets/icon_email.png'),
    placeholder: 'Email',
    key: 'email',
    keyboardType: 'email-address'
}, {
    iconSource: require('../../../assets/icon_password.png'),
    placeholder: 'Password',
    key: 'password',
    secureTextEntry: true,
}, {
    iconSource: require('../../../assets/icon_password_confirm.png'),
    placeholder: 'Confirm Your Password',
    key: 'confirmPassword',
    secureTextEntry: true,
}];
const InputDataBarber = [{
    iconSource: require('../../../assets/icon_name.png'),
    placeholder: 'First & Last Name',
    key: 'fullName',
}, {
    iconSource: require('../../../assets/icon_instagram.png'),
    placeholder: 'Instagram Username',
    key: 'instaUserName',
}, {
    iconSource: require('../../../assets/icon_email.png'),
    placeholder: 'Email',
    key: 'email',
    keyboardType: 'email-address'
}, {
    iconSource: require('../../../assets/icon_password.png'),
    placeholder: 'Password',
    key: 'password',
    secureTextEntry: true,
}, {
    iconSource: require('../../../assets/icon_password_confirm.png'),
    placeholder: 'Confirm Your Password',
    key: 'confirmPassword',
    secureTextEntry: true,
}];
let INPUTS_DATA = {};

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const itemId = navigation.getParam('User');
        console.log("gettingUSersignup--->" + itemId);


        this.state = {
            userInfo: {
                fullName: '',
                instaUserName: '',
                email: '',
                password: '',
                confirmPassword: '',
                userName: undefined,
                fieldUsename: false,
                isConnected: false,
            }
        };
        this.checkFieldsBarber = this.checkFieldsBarber.bind(this);
        this.checkFieldsClient = this.checkFieldsClient.bind(this);
        this.state.userName = itemId;
        if (itemId === "Client") {
            //this.setState({fieldUsername:false,userName:"Client"});
            this.state.fieldUsername = false;
            this.state.userName = "Client";
            INPUTS_DATA = InputDataClient;
        } else {
            this.state.fieldUsername = true;
            this.state.userName = "Barber";
            //this.setState({userName:"Barber",fieldUsername:true});
            INPUTS_DATA = InputDataBarber;
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    _handleConnectivityChange = (isConnected) => {
        this.setState({
            isConnected,
        });
    };

    componentDidMount(): void {
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        );
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.setState({isConnected});
            }
        );
    }


    onSignUp() {
        if (this.state.userName === "Client") {
            if (this.state.isConnected) {
                if (!this.checkFieldsClient()) {
                    //alert("Please enter correct data");
                    return false;
                } else {
                    this.setState({showLoading:true});
                    const {userInfo} = this.state;
                    var details = {
                        firstname: userInfo.fullName,
                        username: userInfo.instaUserName,
                        email: userInfo.email,
                        password: userInfo.password,
                    };
                    var formBody = [];
                    for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                    fetch(constants.ClientSignUp, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: formBody
                    }).then(response => response.json())
                        .then(response => {
                            console.log("responseClientsignup-->", "-" + JSON.stringify(response));
                            if (response.ResultType === 1) {
                                this.setState({showLoading:false});
                                Preference.set({
                                    clientlogin: true,
                                    userEmail: response.Data.email,
                                    userName: response.Data.username,
                                    userId: response.Data.id,
                                    userType: "Client",
                                    userToken: response.Data.token,
                                    newUser:true
                                });
                                this.moveToSMSScreen();
                            } else {
                                this.setState({showLoading:false});
                                if (response.ResultType === 0) {
                                    alert(response.Message);
                                }
                            }
                        })
                        .catch(error => {
                            this.setState({showLoading:false});
                            console.log('Error:', error);
                            alert("Error: "+error);
                        });
                }
            } else {
                alert("Please connect Internet.")
            }
        } else {
            if (this.state.isConnected) {
                if (!this.checkFieldsBarber()) {
                    //alert("Please enter correct data");
                    return false;
                } else {
                    this.setState({showLoading:true});
                    const {userInfo} = this.state;
                    var details = {
                        firstname: userInfo.fullName,
                        username: userInfo.instaUserName,
                        email: userInfo.email,
                        password: userInfo.password,
                    };
                    var formBody = [];
                    for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                    fetch(constants.BarberSignUp, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: formBody
                    }).then(response => response.json())
                        .then(response => {
                            console.log("responseBarbersignup-->", "-" + JSON.stringify(response));
                            if (response.ResultType === 1) {
                                this.setState({showLoading:false});
                                Preference.set({
                                    barberlogin: true,
                                    userEmail: response.Data.email,
                                    userName: response.Data.username,
                                    userId: response.Data.id,
                                    userMobilePay:false,
                                    userType: "Barber",
                                    userToken: response.Data.token,
                                    newUser:true
                                });
                                this.moveToSMSScreen();
                            } else {
                                this.setState({showLoading:false});
                                if (response.ResultType === 0) {
                                    alert(response.Message);
                                }
                            }
                        })
                        .catch(error => {
                            this.setState({showLoading:false});
                            //console.error('Error:', error);
                            console.log('Error:', error);
                            alert("Error: "+error);
                        });
                }
            } else {
                alert("Please connect Internet.")
            }
        }

    }

    moveToSMSScreen() {
        this.props.navigation.navigate("SMSScreen");
    }

    onClose = () => {
        //alert('onClose');
        this.props.navigation.goBack();
    };

    onChangeText = (key, value) => {
        const {userInfo} = this.state;
        const updatedUserInfo = {...userInfo};
        updatedUserInfo[key] = value;
        this.setState({userInfo: updatedUserInfo});
    };

    /*onSignUp = () => {
        this.props.navigation.navigate('SMSScreen');
    };
*/
    onFacebook = () => {
        alert('facebook');
    };

    onGoogle = () => {
        alert('google');
    };

    checkFieldsClient() {
        console.log("validating......");
        if (this.state.userInfo.fullName === "") {
            alert("Name field is required");
            return false;
        } else if (this.state.userInfo.email === "") {
            alert("Email field is required");
            return false;
        } else if (this.state.userInfo.password === "") {
            alert("Password field is required");
            return false;
        } else
            return true;
    }

    checkFieldsBarber() {
        console.log("validating......");
        if (this.state.userInfo.fullName === "") {
            alert("Name field is required");
            return false;
        } else if (this.state.userInfo.instaUserName === "") {
            alert("Name field is required");
            return false;
        } else if (this.state.userInfo.email === "") {
            alert("Email field is required");
            return false;
        } else if (this.state.userInfo.password === "") {
            alert("Password field is required");
            return false;
        } else
            return true;
    }

    /*validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({email: text})
            return false;
        } else {
            this.setState({email: text})
            console.log("Email is Correct");
            return true;
        }
    }*/

    renderInputsClient = () => {
        const {userInfo} = this.state;
        const isValidFullName = !!userInfo.fullName.length;
        const isValidInstaUsername = !!userInfo.instaUserName.length;
        const isValidEmail = checkEmail(userInfo.email);
        const isValidPassword = userInfo.password.length >= 6;
        const isValidPasswordConfirm = userInfo.confirmPassword.length >= 6 && (userInfo.password === userInfo.confirmPassword);
        const inputsValid = [isValidFullName, isValidEmail, isValidPassword, isValidPasswordConfirm];
        return INPUTS_DATA.map((item, index) => (<Input
                iconSource={INPUTS_DATA[index].iconSource}
                style={styles.inputContainer}
                placeholder={INPUTS_DATA[index].placeholder}
                value={userInfo[INPUTS_DATA[index].key]}
                onChangeText={(text) => this.onChangeText(INPUTS_DATA[index].key, text)}
                isValid={inputsValid[index]}
                keyboardType={INPUTS_DATA[index].keyboardType}
                secureTextEntry={INPUTS_DATA[index].secureTextEntry}
                key={`key-${index}`}
            />
        ));
    };

    renderInputsBarber = () => {
        const {userInfo} = this.state;
        const isValidFullName = !!userInfo.fullName.length;
        const isValidInstaUsername = !!userInfo.instaUserName.length;
        const isValidEmail = checkEmail(userInfo.email);
        const isValidPassword = userInfo.password.length >= 6;
        const isValidPasswordConfirm = userInfo.confirmPassword.length >= 6 && (userInfo.password === userInfo.confirmPassword);
        const inputsValid = [isValidFullName,isValidInstaUsername, isValidEmail, isValidPassword, isValidPasswordConfirm];
        return INPUTS_DATA.map((item, index) => (<Input
                iconSource={INPUTS_DATA[index].iconSource}
                style={styles.inputContainer}
                placeholder={INPUTS_DATA[index].placeholder}
                value={userInfo[INPUTS_DATA[index].key]}
                onChangeText={(text) => this.onChangeText(INPUTS_DATA[index].key, text)}
                isValid={inputsValid[index]}
                keyboardType={INPUTS_DATA[index].keyboardType}
                secureTextEntry={INPUTS_DATA[index].secureTextEntry}
                key={`key-${index}`}
            />
        ));
    };

    render() {
        return (
            <ImageBackground
                source={require('../../../assets/img_background2.png')}
                style={styles.container}
                imageStyle={styles.backgroundImg}
            >
                <SafeAreaView style={styles.parentContainer}>
                    <View style={styles.closeContainer}>
                        <CloseButton onPress={this.onClose}/>
                    </View>
                    <KeyboardAwareScrollView
                        style={styles.mainContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {this.state.userName==="Client" && <View style={styles.subContainer}>
                            <Text style={styles.whiteBoldBigText}>Register • {this.state.userName}</Text>
                            {this.renderInputsClient()}
                            <RedButton label="Sign Up" onPress={this.onSignUp} style={styles.buttonContainer}/>
                        </View>}
                        {this.state.userName==="Barber" && <View style={styles.subContainer}>
                            <Text style={styles.whiteBoldBigText}>Register • {this.state.userName}</Text>
                            {this.renderInputsBarber()}
                            <RedButton label="Sign Up" onPress={this.onSignUp} style={styles.buttonContainer}/>
                        </View>}
                        <View style={styles.termsContainer}>
                            <Text style={styles.whiteText}>
                                {'By Signing Up, you agree to our '}
                            </Text>
                            <Text style={styles.redText}>
                                Terms and Conditions
                            </Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Text style={styles.grayText}>
                                Or
                            </Text>
                            <View style={styles.buttonsSubContainer}>
                                <ImageButton
                                    iconSource={require('../../../assets/icon_facebook.png')}
                                    onPress={this.onFacebook}
                                />
                                <View style={styles.space}/>
                                <ImageButton
                                    iconSource={require('../../../assets/icon_gmail.png')}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
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
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

export default SignUpScreen;
