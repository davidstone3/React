import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {styles} from './styles';
import {WhiteButton, RedButton} from '../../../components';

class InitialScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const itemId = navigation.getParam('User', 'NO-ID');
        console.log("gettingUSer--->" + itemId);
        this.state = {
            userName: undefined,
        };
        this.state.userName=itemId;
    }

    onSignUp = () => {
        this.props.navigation.navigate('SignUpScreen', {User:this.state.userName});
    };

    onSignIn = () => {
        this.props.navigation.navigate('SignInScreen', {User:this.state.userName});
    };
    componentDidMount(){
        this.getEvents();
    }

    getEvents()
    {
        console.log("LandingScreenResult:-->"+ "calling APi");
        fetch('http://ec2-34-211-183-21.us-west-2.compute.amazonaws.com/event?user_id=281&latitude=49.2834317&longitude=-123.11491930000001&search_distance=10000', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("LandingScreenResult:-->"+JSON.stringify(responseJson) );
            })
            .catch((error) => {
                //console.error(error);
                console.log('Error:', error);
                alert("Error: "+error);
            });
    }

    render() {
        return (
            <ImageBackground
                source={require('../../../assets/img_background3.png')}
                style={styles.container}
                imageStyle={styles.backgroundImg}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.buttonsContainer}>
                            <WhiteButton label="Sign Up" onPress={this.onSignUp}/>
                            <RedButton label="Sign In" onPress={this.onSignIn}/>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        )
    }
}

export default InitialScreen;
