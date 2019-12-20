import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity,Linking,Alert} from "react-native";

import {Header} from "react-native-elements";
import {globalStyles} from "../../../themes/globalStyles";
import {Colors} from "../../../themes";

import {CameraKitCamera} from 'react-native-camera-kit';
import {styles} from "./styles";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";

export default class QRCheckIn extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: {},
            text: "Google",
            QR_Code_Value: '',
            Start_Scanner: false,
        };
    }

    componentDidMountcomponentDidMount() {
        var that = this;
        let items = Array.apply(null, Array(6)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });
        that.setState({
            dataSource: items
        });
    }

    onOpenlink() {
        //Function to open URL, If scanned
        //Linking.openURL(this.state.QR_Code_Value);
        //Linking used to open the URL in any browser that you have installed
    }

    updateappointmentStatus(code)
    {
        fetch(constants.BarberUpdateAppointmentByQR + "?qr_code=" +code, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getFavoriteBarbers-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                   Alert.alert("Success!","Your appointment is in progress now.");
                   this.props.navigation.goBack();
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: "+error);
        });
    }

    onQR_Code_Scan_Done = (QR_Code) => {
        console.log("QR_Code--->>",QR_Code);
        this.setState({QR_Code_Value: QR_Code});
        this.setState({Start_Scanner: false});
        //this.onOpenlink();
        this.updateappointmentStatus(QR_Code);
    }


    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    leftComponent={{color: "#fff"}}
                    centerComponent={{
                        text: "CHECK IN",
                        style: {color: "#fff"}
                    }}
                    rightComponent={
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Image
                                style={{tintColor: 'white', height: 20, resizeMode: 'contain'}}
                                source={require("../../../assets/images/ic_forward_arrow.png")}
                            />
                        </TouchableOpacity>}
                    containerStyle={{
                        backgroundColor: Colors.themeBackground,
                        justifyContent: "space-around"
                    }}
                />

                <View style={{width: "100%", height: "100%"}}>
                    <CameraKitCamera
                        ref={cam => this.camera = cam}
                        style={{
                            flex: 1,
                            backgroundColor: 'white'
                        }}
                        cameraOptions={{
                            flashMode: 'auto',             // on/off/auto(default)
                            focusMode: 'on',               // off/on(default)
                            zoomMode: 'on',                // off/on(default)
                            ratioOverlay: '1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
                            ratioOverlayColor: '#00000077' // optional
                        }}
                        showFrame={true}
                        scanBarcode={true}
                        laserColor={'#FF3D00'}
                        frameColor={'#00C853'}
                        colorForScannerFrame={'black'}
                        onReadCode={event =>
                            this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
                        }
                    />
                </View>
                <TouchableOpacity style={[globalStyles.button, {marginTop: 70, marginBottom: 30}]} onPress={() => {
                    //this.props.navigation.navigate('BarberProfile');
                }}>
                    <Text style={globalStyles.buttonText}>Check In Customer</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
