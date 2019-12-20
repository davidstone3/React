import React, {Component} from 'react';
import {ImageBackground, Text, View, TouchableOpacity, NetInfo, Dimensions, Keyboard} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, ImageButton, Input, RedButton} from '../../../components';
import {checkEmail} from '../../../utils';
import {constants} from "../../../utils/constants";
import {KeycodeInput} from 'react-native-keycode';
import Modal from "react-native-modal";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let itemId = "";

class ForgetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        itemId = navigation.getParam('User');
        this.state = {
            isVisible: false,
            email: '',
            pin: "",
            isConnected: false,
            sendMail: true,
            resetPassword: false,
            forgetpassword_pin: "1234", password: "", repassword: "",
        };
        this.state.userName = itemId;
        this.showResetPassword = this.showResetPassword.bind(this);
        this.onCloseReset = this.onCloseReset.bind(this);
        this.onForgot = this.onForgot.bind(this);
        this.onResetPassword = this.onResetPassword.bind(this);
    }

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

    showResetPassword() {
        //this.setState({resetPassword: true, sendMail: false});
        this.onForgot();
    }

    onClose = () => {
        this.props.navigation.goBack();
    };

    _handleConnectivityChange = (isConnected) => {
        this.setState({
            isConnected,
        });
    };

    onChangeText = (key, value) => {
        this.setState({[key]: value});
    };

    onForgot = () => {
        //alert('forgot');
        if (this.state.userName === "Client") {
            if (this.state.email === "") {
                alert("Please enter email?");
            } else {
                var details = {
                    email: this.state.email,
                    forgetpassword_pin: this.state.forgetpassword_pin
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                fetch(constants.ClientForgetPassword, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responseforgetPasswordClient-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {
                            //alert("Please check your mail for reset password.")
                            this.setState({isVisible: true});
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
                //Keyboard.dismiss();
            }
        } else {
            if (this.state.email === "") {
                alert("Please enter email?");
            } else {
                var details = {
                    email: this.state.email,
                    forgetpassword_pin: this.state.forgetpassword_pin
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                fetch(constants.BarberForgetPassword, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responseforgetPasswordBarber-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {
                            //alert("Please check your mail for reset password.")
                            this.setState({isVisible: true});
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
                //Keyboard.dismiss();
            }
        }
    };

    onResetPassword = () => {
        //alert('forgot');
        if (this.state.userName === "Client") {
            if (this.state.password === "") {
                alert("Please enter password?");
            } else {
                var details = {
                    password: this.state.password,
                    email: this.state.email,
                    forgetpassword_pin: this.state.forgetpassword_pin
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                fetch(constants.ClientResetPassword, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("response-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {
                            alert("Your password has been reset");
                            this.props.navigation.goBack();
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
                //Keyboard.dismiss();
            }
        } else {
            if (this.state.password === "") {
                alert("Please enter password?");
            } else {
                var details = {
                    password: this.state.password,
                    email: this.state.email,
                    forgetpassword_pin: this.state.forgetpassword_pin
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                fetch(constants.BarberResetPassword, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("response-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {
                            alert("Your password has been reset");
                            this.props.navigation.goBack();
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
                //Keyboard.dismiss();
            }
        }
    };


    Reset = () => {
        //alert("Reset Clicked");
        //this.props.navigation.goBack();
        this.onResetPassword();
    }

    onCloseReset() {
        this.setState({resetPassword: false, sendMail: true});

    }

    checkCode(val) {
        //alert(val);
        if (this.state.forgetpassword_pin === val) {
            this.setState({resetPassword: true, sendMail: false, isVisible: false});
        } else {
            alert("Pin does not match");
        }
    }

    render() {
        const {email, password, repassword} = this.state;
        const isValidEmail = checkEmail(email);
        const isValidPassword = password.length >= 6;
        const isValidPasswordConfirm = repassword.length >= 6 && (password === repassword);
        return (

            <ImageBackground
                source={require('../../../assets/img_background2.png')}
                style={styles.container}
                imageStyle={styles.backgroundImg}
            >
                {/*<View style={styles.bottomContainer}/>*/}
                {this.state.sendMail && <SafeAreaView style={styles.parentContainer}>
                    <View style={styles.closeContainer}>
                        <CloseButton onPress={this.onClose}/>
                    </View>
                    <KeyboardAwareScrollView style={styles.mainContainer}>
                        <View style={[styles.subContainer, {margginTop: 10}]}>
                            <Text style={styles.whiteBoldBigText}>
                                Forgot Password • {this.state.userName}
                            </Text>
                            <Input
                                iconSource={require('../../../assets/icon_email.png')}
                                style={styles.inputContainer}
                                value={email}
                                placeholder="Email"
                                onChangeText={(text) => this.onChangeText('email', text)}
                                keyboardType="email-address"
                                isValid={isValidEmail}
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <RedButton style={styles.loginButton} label="Send Email"
                                       onPress={this.showResetPassword}/>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>}

                {this.state.resetPassword && <SafeAreaView style={styles.parentContainer}>
                    <View style={styles.closeContainer}>
                        <CloseButton onPress={this.onCloseReset}/>
                    </View>
                    <KeyboardAwareScrollView style={styles.mainContainer}>
                        <View style={[styles.subContainer, {margginTop: 10}]}>
                            <Text style={styles.whiteBoldBigText}>
                                Reset Password • {this.state.userName}
                            </Text>
                            <Input
                                iconSource={require('../../../assets/icon_email.png')}
                                style={styles.inputContainer}
                                value={password}
                                placeholder="New Password"
                                onChangeText={(text) => this.onChangeText('password', text)}
                                secureTextEntry
                                isValid={isValidPassword}
                            />
                            <Input
                                iconSource={require('../../../assets/icon_email.png')}
                                style={styles.inputContainer}
                                value={repassword}
                                placeholder="Confirm New Password"
                                onChangeText={(text) => this.onChangeText('repassword', text)}
                                secureTextEntry
                                isValid={isValidPasswordConfirm}
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <RedButton style={styles.loginButton} label="Reset" onPress={this.Reset}/>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>}
                <Modal
                    isVisible={this.state.isVisible}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    style={{alignItems: "center", justifyContent: "center", zIndex: 999}}>


                    <View style={{
                        width: "80%",
                        height: deviceHeight / 4,
                        backgroundColor: "white",
                        borderRadius: 15,
                        flexDirection: "column"
                    }}>
                        <View style={{
                            height: "75%",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column"
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: "black",
                                marginBottom: 10
                            }}>{"Please check your entered email for PIN"}</Text>
                            <KeycodeInput
                                ref={"keycodeinput"}
                                value={this.state.pin}
                                autoFocus={true}
                                onChange={(pin) => this.setState({pin: pin})}
                                onComplete={(value) => {
                                    //alert(value);
                                    this.checkCode(value);
                                }}
                            />
                        </View>
                        <View style={{height: 1, backgroundColor: "grey"}}/>
                        <View style={{height: "25%", flexDirection: "row", width: "100%"}}>
                            <View style={{width: "50%"}}>
                                <TouchableOpacity onPress={() => this.setState({pin: ""})} style={{
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Text style={{
                                        fontSize: 14, fontWeight: "bold",
                                        color: "green"
                                    }}>{"Clear"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width: 1, backgroundColor: "grey"}}/>
                            <View style={{width: "50%"}}>
                                <TouchableOpacity onPress={() => this.setState({isVisible: false})} style={{
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{fontSize: 14, color: "black"}}>{"Cancel"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>
            </ImageBackground>

        )
    }
}

export default ForgetPasswordScreen;
