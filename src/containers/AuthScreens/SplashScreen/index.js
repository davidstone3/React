import React, {Component} from 'react';
import {ImageBackground, View, Text, Image} from 'react-native';
import {Colors} from "../../../themes";

import Preference from 'react-native-preference';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(): void {
        setTimeout(() => {
            //this.setState({splashScreen: false});
            // Alert.alert("hello");
            this.closeScreen();
        }, 3000)
    }

    closeScreen() {
        if (Preference.get("clientlogin") === true) {
            this.props.navigation.navigate("ClientTabNavigator");
        } else if (Preference.get("barberlogin") === true) {
            this.props.navigation.navigate("TabNavigator");
        } else
            this.props.navigation.navigate("SelectScreen");
    }


    render() {
        return (
            <ImageBackground
                source={require('../../../assets/images/splash_bg.png')}
                style={{
                    flex: 1,
                    paddingTop: 0,
                    backgroundColor: Colors.themeBackground
                }}
                imageStyle={{resizeMode: 'stretch', backgroundColor: "grey"}}>
                <View style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/logo.png")}
                           style={{height: 100, width: 140}}/>
                </View>
            </ImageBackground>
        )
    }
}

export default SplashScreen;
