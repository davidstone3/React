import React, {Component} from 'react';
import {
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    NetInfo,
    ActivityIndicator,
    Image,
    Alert,
    AsyncStorage
} from 'react-native';
import {NavigationActions, SafeAreaView, StackActions} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, ImageButton, Input, RedButton} from '../../../components';
import {checkEmail} from '../../../utils';
import Preference from 'react-native-preference';
import {constants} from "../../../utils/constants";
import firebase from 'react-native-firebase';
import NotificationPopup from 'react-native-push-notification-popup';

//import * as constants from "../../../utils/constants";
import {LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;



import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';


let itemId = "";
let fcmToken="";
class SignInScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        itemId = navigation.getParam('User');
        console.log("gettingUSersignIn--->" + itemId);
        this.state = {
            showLoading: false,
            email: '',
            password: '',
            userName: undefined,
            isConnected: true,
            accessToken: null,
            dataFacebook: undefined,
        };
        this.state.userName = itemId;
        this.responseInfoCallback = this.responseInfoCallback.bind(this);
        this.signinFacebook = this.signinFacebook.bind(this);
    }

    componentDidMount(): void {

        if (itemId === "Client") {
            if (Preference.get("clientlogin") === true) {
                this.props.navigation.navigate("ClientTabNavigator");
            }
        } else {
            if (Preference.get("barberlogin") === true) {
                this.props.navigation.navigate("TabNavigator");
            }
        }

        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
            // Repleace with your webClientId generated from Firebase console
            webClientId:
                '1006799815583-9p41g2vs13dn03lp4j7bkvuiku3gcrtk.apps.googleusercontent.com',
        });
        this.checkPermission();
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            console.log("fcmToken getting");
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        console.log("fcmToken getting inside");
        fcmToken = await Preference.get('fcmToken');
        console.log("fcmToken getting inside",JSON.stringify(fcmToken));
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log("fcmToken getting inside Got",JSON.stringify(fcmToken));
            if (fcmToken) {
                // user has a device token
                console.log("fcmToken: ",fcmToken);
                Preference.set('fcmToken', fcmToken);
            }
        }
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            //Alert.alert("Warning!","")
            console.log('permission rejected');
        }
    }

    _signIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {

            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            console.log('Google --> ', "yessss");
            const userInfo = await GoogleSignin.signIn();
            console.log('Google User Info --> ', userInfo);
            this.setState({userInfo: userInfo});
            this.socialLoginGoogle(userInfo);

        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened' + error.code);
            }
        }
    };

    socialLoginGoogle(userInfo) {
        if (itemId === "Client") {
            if (this.state.isConnected) {
                var details = {
                    email: userInfo.user.email,
                    authType: "google",
                    authId: userInfo.idToken,
                    firstName: userInfo.user.givenName,
                    lastName: userInfo.user.familyName,
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                this.setState({showLoading:true});
                formBody = formBody.join("&");
                fetch(constants.ClientSocialLogin, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                        this.setState({showLoading:false});
                        if (response.ResultType === 1) {
                            Preference.set({
                                clientlogin: true,
                                userEmail: response.Data.email,
                                userId: response.Data.id,
                                userName: userInfo.user.givenName,
                                userType: "Client",
                                userToken: response.Data.token
                            });
                            this.moveToHome();
                        } else {
                            if (response.ResultType === 0) {
                                alert(response.Message);
                            }
                        }
                    })
                    .catch(error => {
                        this.setState({showLoading:false});
                        //console.error('Errorr:', error);
                        console.log('Error:', error);
                        alert("Error: "+error);
                    });
                //Keyboard.dismiss();
            } else {
                alert("Please connect Internet");
            }
            //this.props.navigation.navigate('ClientTabNavigator');
        } else {
            if (this.state.isConnected) {
                var details = {
                    email: userInfo.user.email,
                    authType: "google",
                    authId: userInfo.idToken,
                    firstName: userInfo.user.givenName,
                    lastName: userInfo.user.familyName,
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                this.setState({showLoading:true});
                formBody = formBody.join("&");
                fetch(constants.BarberSocialLogin, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responseBarberlogin-->", "-" + JSON.stringify(response));
                        this.setState({showLoading:false});
                        if (response.ResultType === 1) {
                            Preference.set({
                                barberlogin: true,
                                userEmail: response.Data.email,
                                userName: userInfo.user.givenName,
                                userId: response.Data.id,
                                userType: "Barber",
                                userToken: response.Data.token
                            });
                            this.moveToHome();
                        } else {
                            if (response.ResultType === 0) {
                                alert(response.Message);
                            }
                        }
                    })
                    .catch(error => {
                        this.setState({showLoading:false});
                        //console.error('Errorr:', error);
                        console.log('Error:', error);
                        alert("Error: "+error);
                    });
                //Keyboard.dismiss();
            } else {
                alert("Please connect Internet");
            }
        }

    }

    _getCurrentUser = async () => {
        //May be called eg. in the componentDidMount of your main component.
        //This method returns the current user
        //if they already signed in and null otherwise.
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({userInfo});
        } catch (error) {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: "+error);
        }
    };

    _revokeAccess = async () => {
        //Remove your application from the user authorized applications.
        try {
            await GoogleSignin.revokeAccess();
            console.log('deleted');
        } catch (error) {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: "+error);
        }
    };

    onClose = () => {
        this.props.navigation.goBack();
    };

    onLogin = () => {
        if (itemId === "Client") {
            if (this.state.isConnected) {
                if (this.state.email === "" || this.state.password === "") {
                    alert("Please fill all fields");
                } else {
                    this.setState({showLoading: true});
                    const {email, password} = this.state;
                    var details = {
                        email: email,
                        password: password,
                        device_token:fcmToken
                    };
                    var formBody = [];
                    for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                    fetch(constants.ClientLogin, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: formBody
                    }).then(response => response.json())
                        .then(response => {
                            console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                            if (response.ResultType === 1) {
                                this.setState({showLoading: false});
                                Preference.set({
                                    clientlogin: true,
                                    userEmail: response.Data.email,
                                    userId: response.Data.id,
                                    userName: response.Data.firstname + " " + response.Data.lastname,
                                    userType: "Client",
                                    userToken: response.Data.token
                                });
                                if (response.Data.firstTimeSignUp === true) {
                                    this.props.navigation.navigate("SMSScreen");
                                } else {
                                    this.moveToHome();
                                }
                            } else {
                                this.setState({showLoading: false});
                                if (response.ResultType === 0) {
                                    alert(response.Message);
                                }
                            }
                        })
                        .catch(error => {
                            this.setState({showLoading: false});
                            //console.error('Errorr:', error);
                            console.log('Error:', error);
                            alert("Error: "+error);
                        });
                    //Keyboard.dismiss();
                }
            } else {
                alert("Please connect Internet");
            }
            //this.props.navigation.navigate('ClientTabNavigator');
        } else {
            //this.props.navigation.navigate('TabNavigator');
            if (this.state.isConnected) {
                if (this.state.email === "" || this.state.password === "") {
                    alert("Please fill all fields");
                } else {
                    this.setState({showLoading: true});
                    const {email, password} = this.state;
                    var details = {
                        email: email,
                        password: password,
                        device_token:fcmToken
                    };
                    var formBody = [];
                    for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                    fetch(constants.BarberLogin, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: formBody
                    }).then(response => response.json())
                        .then(response => {
                            console.log("responseBarberlogin-->", "-" + JSON.stringify(response));
                            if (response.ResultType === 1) {
                                this.setState({showLoading: false});
                                Preference.set({
                                    barberlogin: true,
                                    userEmail: response.Data.email,
                                    userId: response.Data.id,
                                    userName: response.Data.firstname + " " + response.Data.lastname,
                                    userType: "Barber",
                                    userToken: response.Data.token
                                });
                                if (response.Data.firstTimeSignUp === true) {
                                    this.props.navigation.navigate("SMSScreen");
                                } else {
                                    this.moveToHome();
                                }
                            } else {
                                this.setState({showLoading: false});
                                if (response.ResultType === 0) {
                                    alert(response.Message);
                                }
                            }
                        })
                        .catch(error => {
                            this.setState({showLoading: false});
                            //console.error('Errorr:', error);
                            console.log('Error:', error);
                            alert("Error: "+error);
                        });
                    //Keyboard.dismiss();
                }
            } else {
                alert("Please connect Internet");
            }
        }

    };

    facebokLogin = async () => {
        try {
            let result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
            if (result.isCancelled) {
                alert("Login was cancelled");
            } else {
                //alert("Login is succesfull with permission " + result.grantedPermissions.toString())
                this.FBGraphRequest('id,email,name,first_name,last_name,picture', this.FBLoginCallback);
            }

           /* const accessToken = await AccessToken.getCurrentAccessToken();
            console.log("Facebook access token: " + JSON.stringify(accessToken))
            if (accessToken) {
                //this.fetchFacebookData(accessToken.accessToken.toString());
                console.log("Facebook access token: " + accessToken.accessToken)
                let infoRequest = new GraphRequest(
                    '/me',
                    {
                        accessToken: accessToken.accessToken,
                        parameters: {
                            fields: {
                                string: 'id,email,name,first_name,last_name,picture'
                            }
                        }
                    },
                    (error, result) => {
                        if (error) {
                            console.log(error)
                            alert('Error fetching data: ' + error.toString());
                        } else {
                            console.log('Success fetching data: ' + JSON.stringify(result))

                            this.setState({dataFacebook: result, accessToken: accessToken});
                            this.signinFacebook(this.state.dataFacebook, this.state.accessToken);
                            //alert('Success fetching data: ' + JSON.stringify(result));
                        }
                    });

                await new GraphRequestManager().addRequest(infoRequest).start();
            }*/

            // this.setState({
            //     accessToken: accessToken
            // }).bind(this)
        } catch (e) {
            alert("Login error: " + e);
        }
    }

    async FBGraphRequest(fields, callback) {
        const accessData = await AccessToken.getCurrentAccessToken();
        // Create a graph request asking for user information
        this.setState({accessToken: accessData.accessToken})
        const infoRequest = new GraphRequest('/me', {
            accessToken: accessData.accessToken,
            parameters: {
                fields: {
                    string: fields
                }
            }
        }, callback.bind(this));
        // Execute the graph request created above
        new GraphRequestManager().addRequest(infoRequest).start();
    }

    async FBLoginCallback(error, result) {
        if (error) {
            alert(JSON.stringify(error))
        } else {
           //alert(JSON.stringify(result))
            this.setState({dataFacebook: result});
            this.signinFacebook(this.state.dataFacebook, this.state.accessToken);
        }
    }

    signinFacebook(data, accessToken) {
        if (itemId === "Client") {
            if (this.state.isConnected) {
                var details = {
                    email: data.email,
                    authType: "google",
                    authId: accessToken,
                    firstName: data.first_name,
                    lastName: data.last_name,
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                fetch(constants.ClientSocialLogin, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {
                            Preference.set({
                                clientlogin: true,
                                userEmail: response.Data.email,
                                userName: data.first_name,
                                userId: response.Data.id,
                                userType: "Client",
                                userToken: response.Data.token
                            });
                            if (response.Data.firstTimeSignUp === true) {
                                this.props.navigation.navigate("SMSScreen");
                            } else {
                                this.moveToHome();
                            }

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
            } else {
                alert("Please connect Internet");
            }
            //this.props.navigation.navigate('ClientTabNavigator');
        } else {
            if (this.state.isConnected) {
                var details = {
                    email: data.email,
                    authType: "google",
                    authId: accessToken,
                    firstName: data.first_name,
                    lastName: data.last_name,
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                fetch(constants.BarberSocialLogin, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responseBarberlogin-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {
                            Preference.set({
                                barberlogin: true,
                                userEmail: response.Data.email,
                                userName: data.first_name,
                                userId: response.Data.id,
                                userType: "Barber",
                                userToken: response.Data.token
                            });
                            if (response.Data.firstTimeSignUp === true) {
                                this.props.navigation.navigate("SMSScreen");
                            } else {
                                this.moveToHome();
                            }
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
            } else {
                alert("Please connect Internet");
            }
        }
    }

    responseInfoCallback = (error, result) => {
        if (error) {
            console.log(error)
            alert('Error fetching data: ' + error.toString());
        } else {
            console.log('Success fetching data: ' + JSON.stringify(result))
            alert('Success fetching data: ' + JSON.stringify(result));
        }
    }

    moveToHome() {
        if (itemId === "Client"){

            const goToIntoScreen = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'ClientTabNavigator' })],
            });
            this.props.navigation.dispatch(goToIntoScreen);
           // this.props.navigation.navigate("ClientTabNavigator");
        } else {
            const goToIntoScreen = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'TabNavigator' })],
            });
            this.props.navigation.dispatch(goToIntoScreen);
           // this.props.navigation.navigate("TabNavigator");
        }
    }

    onChangeText = (key, value) => {
        this.setState({[key]: value});
    };

    signupClicked() {
        this.props.navigation.navigate('SignUpScreen', {User: this.state.userName});
        //this.props.navigation.navigate("SignUpScreen");
    }

    onForgot = () => {
        //alert('forgot');
        this.props.navigation.push("ForgetPasswordScreen", {User: itemId});
    };

    render() {
        const {email, password} = this.state;
        const isValidEmail = checkEmail(email);
        const isValidPassword = password.length >= 6;
        return (
            <ImageBackground
                source={require('../../../assets/img_background2.png')}
                style={styles.container}
                imageStyle={styles.backgroundImg}
            >
                <NotificationPopup ref={ref => this.popup = ref} />
                <View style={styles.bottomContainer}/>
                <SafeAreaView style={styles.parentContainer}>
                    <View style={styles.closeContainer}>
                        <CloseButton onPress={this.onClose}/>
                    </View>
                    <KeyboardAwareScrollView style={styles.mainContainer}>
                        <View style={styles.subContainer}>
                            <Text style={styles.whiteBoldBigText}>
                                Login • {this.state.userName}
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
                            <Input
                                iconSource={require('../../../assets/icon_email.png')}
                                style={styles.inputContainer}
                                value={password}
                                placeholder="Password"
                                onChangeText={(text) => this.onChangeText('password', text)}
                                secureTextEntry
                                isValid={isValidPassword}
                            />
                        </View>
                        <View style={styles.forgotPasswordContainer}>
                            <Text style={styles.whiteText}>
                                {`Can't login? `}
                            </Text>
                            <TouchableOpacity onPress={this.onForgot}>
                                <Text style={styles.redText}>
                                    Forgot password!
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <RedButton style={styles.loginButton} label="Login" onPress={this.onLogin}/>
                            <ImageButton
                                onPress={this.facebokLogin}
                                iconSource={require('../../../assets/icon_facebook.png')}
                                iconStyle={styles.iconStyle}
                                style={styles.imgBtnContainer}
                            />
                            <ImageButton
                                onPress={this._signIn}
                                iconSource={require('../../../assets/icon_gmail.png')}
                                iconStyle={styles.iconStyle}
                                style={styles.imgBtnContainer}
                            />
                        </View>
                    </KeyboardAwareScrollView>
                    <View style={{flex: 1}}>
                    </View>
                    <View style={styles.bottomButtonContainer}>
                        <Text style={styles.grayText}>
                            {`Don't have an account? `}
                        </Text>
                        <TouchableOpacity onPress={() => this.signupClicked()}>
                            <Text style={styles.redText}>
                                Sign Up!
                            </Text>
                        </TouchableOpacity>
                    </View>

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
        )
    }
}

export default SignInScreen;
