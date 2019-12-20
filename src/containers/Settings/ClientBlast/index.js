import React, {Component} from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    TextInput, Dimensions,Alert
} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import {Header} from "react-native-elements";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";

const {width, height} = Dimensions.get("window");

export default class ClientBlast extends Component {

    constructor(props) {
        super(props);
        this.state = {text2: 'Your Message...'};
        this.sendBlastMessage=this.sendBlastMessage.bind(this);
    }

    sendBlastMessage()
    {
        const {text2} = this.state;
        var details = {
            sender_id: Preference.get("userId"),
            notification_text:text2,};
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.ClientBlastMessage, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseClientBlast-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    Alert.alert("Success!","Your message was successfully sent to all your clients.");
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
        return (<View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "CLIENT BLAST", style: {color: "#fff"}}}
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
                    }
                />
                <ScrollView>
                    <View style={{
                        flex: 1,
                        marginStart: 20,
                        marginEnd: 20,
                        height: height - 110,
                    }}>
                        <View style={{
                            marginTop: 30,
                            width: "100%",
                        }}>
                            <View style={{
                                width: "100%",
                                height: 180,
                                borderRadius: 10,
                                borderWidth: 0.3,
                                borderColor: "white",
                                backgroundColor: "#2F3041"
                            }}>
                                <TextInput style={{
                                    height:"100%",
                                    fontFamily: "AvertaStd-RegularItalic", width: "100%",
                                    color: "white", fontSize: 14,marginStart:10
                                }}
                                           multiline={true}
                                           numberOfLines={10}
                                           onChangeText={(text) => this.setState({text2:text})}
                                           placeholder={"Your Message..."}
                                           placeholderTextColor={"#9C9CA2"}
                                />
                            </View>


                        </View>
                        <View>
                            <Text style={{
                                color: "white",
                                fontSize: 12,
                                marginTop: 10,
                                marginLeft: 5
                            }}>{"This message will be sent to all of your Clients."} </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.sendBlastMessage()} style={[globalStyles.button, {
                            height: 40,
                            width: 230,
                            position: "absolute",
                            bottom: 30,
                        }]}>
                            <Text style={globalStyles.buttonText}>SEND</Text>

                        </TouchableOpacity>
                    </View>
                </ScrollView>


            </View>

        )
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
