import React, {Component} from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,Alert,
    TouchableOpacity,
    TextInput, Picker,
    ImageBackground
} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import {Header} from "react-native-elements";
import {NavigationActions, StackActions} from "react-navigation";
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";
import PopupDialog from 'react-native-popup-dialog';
import stripe from 'tipsi-stripe'

stripe.setOptions({
    publishableKey: 'pk_test_5f4q3aLF1SgN7kQdEV6WBSnn',
    androidPayMode: 'test', // Android only
})

export default class PaymentMethod extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            cardNumber: "4242424242424242",
            month: "04",
            year: "20",
            cvc: "123",
            cardHolderName: "",
            pickMonth: false,
            isConnected: true,
            DialogVisible: false,
            DialogVisible1: false,


            loading: false,
            token: null,
            error: null,
            params: {
                number: '4242424242424242',
                expMonth: 12,
                expYear: 24,
                cvc: '223',
                name: 'Test User',
                currency: 'usd',
                addressLine1: '123 Test Street',
                addressLine2: 'Apt. 5',
                addressCity: 'Test City',
                addressState: 'Test State',
                addressCountry: 'Test Country',
                addressZip: '55555',
            },
            errorParams: {
                number: '4242424242424241',
                expMonth: 12,
                expYear: 24,
                cvc: '223',
                name: 'Test User',
                currency: 'usd',
                addressLine1: '123 Test Street',
                addressLine2: 'Apt. 5',
                addressCity: 'Test City',
                addressState: 'Test State',
                addressCountry: 'Test Country',
                addressZip: '55555',
            },
        }
        console.disableYellowBox = true;
        //this.state = {text: ' 4242 - 4242 - 4242- 4242'};
    }

    saveCard = async (shouldPass = true) => {
        /*const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'ClientTabNavigator'})],
        });
        this.props.navigation.dispatch(resetAction);*/
        let usertype = "";
        if (Preference.get("userType") === "Barber")
            usertype = "barber";
        else
            usertype = "client";
        try {

            /* const source = await stripe.createSourceWithParams({
                 type: 'card',
                 number: '4242424242424242',
                 expMonth: 11,
                 expYear: 22,
                 cvc: '123',
             })*/
            this.setState({showLoading: true})
            console.log("CardNumber:-->", this.state.cardNumber)
            console.log("CardNumber:-->", this.state.month)
            console.log("CardNumber:-->", this.state.year)
            console.log("CardNumber:-->", this.state.cvc)
            console.log("CardNumber:-->", this.state.cardHolderName);


            /*const cardData = this.state.params;
            cardData.number = this.state.cardNumber;
            cardData.expMonth = parseInt(this.state.month);
            cardData.expYear = parseInt(this.state.year);
            cardData.cvc = this.state.cvc;
            cardData.name = this.state.cardHolderName;
            cardData.currency = 'usd';
            cardData.addressLine1 = '123 Test Street';
            cardData.addressLine2 = 'Apt. 5';
            cardData.addressCity = 'Test City';
            cardData.addressState = 'Test State';
            cardData.addressCountry = 'Test Country';
            cardData.addressZip = '55555';
            this.setState({params: cardData});
*/

            const params = this.state.params;
            const token = await stripe.createTokenWithCard(params)
            console.log("CArdReponse", token);
            this.setState({showLoading:false});
        } catch (error) {
            this.setState({showLoading:false});
            Alert.alert("Error!","Your card details are invalid")
            console.log("CArdReponse error", error);
            //this.setState({error, loading: false})
        }

        /* if (this.state.isConnected) {
             if (this.state.cardNumber === "" || this.state.cardNumber.length < 16 ||
                 this.state.month === "" || this.state.year === "" || this.state.cvc === "" || this.state.cardHolderName === "") {
                 alert("Please enter full data.");
             } else {
                 var details = {
                     user_id: Preference.get("userId"),
                     card_number: this.state.cardNumber,
                     expiration_date: this.state.month + "/" + this.state.year,
                     cvc: this.state.cvc,
                     card_holder_name: this.state.cardHolderName,
                     user_type: usertype,
                 };
                 var formBody = [];
                 for (var property in details) {
                     var encodedKey = encodeURIComponent(property);
                     var encodedValue = encodeURIComponent(details[property]);
                     formBody.push(encodedKey + "=" + encodedValue);
                 }
                 formBody = formBody.join("&");
                 fetch(constants.ClientPaymentMethod, {
                     method: 'POST',
                     headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/x-www-form-urlencoded'
                     },
                     body: formBody
                 }).then(response => response.json())
                     .then(response => {
                         console.log("responsePaymentCard-->", "-" + JSON.stringify(response));
                         if (response.ResultType === 1) {
                             alert("Card Updated successfully");
                             const resetAction = StackActions.reset({
                                 index: 0,
                                 actions: [NavigationActions.navigate({routeName: 'ClientTabNavigator'})],
                             });
                             this.props.navigation.dispatch(resetAction);
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
         } else {
             alert("Please connect Internet");
         }*/
        //this.props.navigation.navigate("ClientTabNavigator");
    }

    render() {
        return (<View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "PAYMENT METHOD", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                    leftComponent={<TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Image
                            style={{
                                tintColor: 'white',
                                height: 20,
                                resizeMode: 'contain'
                            }}
                            source={require("../../../assets/images/ic_back.png")}
                        />
                    </TouchableOpacity>}
                />
                <ScrollView>
                    <View style={{flexDirection: "column"}}>
                        <View style={{width: "100%",}}>
                            <View style={{width: "100%", flexDirection: "column", alignItems: "center"}}>

                                <ImageBackground resizeMode={"contain"}
                                                 source={require("../../../assets/images/paycard_bg.png")}
                                                 style={{width: "100%", height: 240}}>
                                    <Image resizeMode={"contain"}
                                           source={require("../../../assets/images/rectangle.png")}
                                           style={[{
                                               position: "absolute",
                                               height: 27, top: 60, left: 35
                                           }]}/>
                                    <Image resizeMode={"contain"} source={require("../../../assets/images/viss.png")}
                                           style={[{
                                               position: "absolute",
                                               height: 15, top: 65, right: 30

                                           }]}/>
                                    <Image resizeMode={"contain"} source={require("../../../assets/images/Forma1.png")}
                                           style={[{
                                               position: "absolute",
                                               height: 23, top: 130, right: "41%",
                                               justifyItems: "center"
                                           }]}/>
                                    <Text style={[{textAlign: "center", color: "white", top: 160, fontSize: 12}]}>
                                        Scan Credit Card</Text>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={{marginStart: 10, marginEnd: 10}}>
                            <Text style={styles.txtHeader}>CARD NUMBER</Text>
                            <TouchableOpacity>
                                <View style={[globalStyles.rowBackground, {flex: 1, flexDirection: 'row', height: 40}]}>
                                    <Image style={[styles.right_arrow]}
                                           source={require("../../../assets/images/vcircle.png")}/>
                                    <TextInput style={{fontSize: 15, color: 'white', marginStarts: 5}}
                                               placeholder={"4242-4242-4242-4242"}
                                               onChangeText={(text) => this.setState({cardNumber: text})}
                                               placeholderTextColor={"grey"}/>
                                </View>
                            </TouchableOpacity>

                            <View style={{flexDirection: "row", width: "100%"}}>
                                <View style={{width: "65%"}}>
                                    <Text style={styles.txtHeader}>EXPIRATION DATE</Text>
                                </View>
                                <View style={{width: "35%"}}>
                                    <Text style={styles.txtHeader}>CVV/CVC</Text>
                                </View>
                            </View>


                            <View style={{width: "100%", flexDirection: "row"}}>
                                <TouchableOpacity onPress={() => this.setState({DialogVisible: true})}
                                                  style={[styles.row_back, {width: "25%", marginStart: 10}]}>
                                    <Text style={{fontSize: 15, color: 'white', marginStart: 10, marginTop: 10}}
                                          placeholder={this.state.month}
                                          placeholderTextColor={"grey"}>{this.state.month}</Text>
                                    <Image resizeMode={"contain"} style={[styles.dropDown]}
                                           source={require("../../../assets/images/dropdown.png")}/>

                                    <PopupDialog
                                        visible={this.state.DialogVisible}
                                        width={0.6}
                                        onTouchOutside={() => {
                                            this.setState({DialogVisible: false});
                                        }}
                                        ref={(popupDialog) => {
                                            this.popupDialog = popupDialog;
                                        }}>
                                        <View style={{flexDirection: "column", alignItems: "center"}}>
                                            <View style={{
                                                width: "100%",
                                                height: 0,
                                                marginTop: 3,
                                                marginBottom: 3,
                                                backgroundColor: "black",
                                                flexDirection: "column",
                                            }}/>
                                            <Text style={{
                                                fontSize: 20,
                                                marginTop: 5,
                                                color: "black",
                                                fontWeight: "bold"
                                            }}>Select
                                                Month</Text>
                                            <Text onPress={() => this.setState({month: "01", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>01</Text>
                                            <Text onPress={() => this.setState({month: "02", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>02</Text>
                                            <Text onPress={() => this.setState({month: "03", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>03</Text>
                                            <Text onPress={() => this.setState({month: "04", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>04</Text>
                                            <Text onPress={() => this.setState({month: "05", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>05</Text>
                                            <Text onPress={() => this.setState({month: "06", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>06</Text>
                                            <Text onPress={() => this.setState({month: "07", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>07</Text>
                                            <Text onPress={() => this.setState({month: "08", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>08</Text>
                                            <Text onPress={() => this.setState({month: "09", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>09</Text>
                                            <Text onPress={() => this.setState({month: "10", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>10</Text>
                                            <Text onPress={() => this.setState({month: "11", DialogVisible: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>11</Text>
                                            <Text onPress={() => this.setState({month: "12", DialogVisible: false})}
                                                  style={{
                                                      fontSize: 18,
                                                      marginTop: 20,
                                                      color: "black",
                                                      marginBottom: 20
                                                  }}>12</Text>
                                        </View>
                                    </PopupDialog>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({DialogVisible1: true})}
                                                  style={[styles.row_back, {width: "25%", marginStart: 5}]}>
                                    <Text style={{fontSize: 15, color: 'white', marginStart: 10, marginTop: 10}}
                                          placeholder={this.state.year}
                                          placeholderTextColor={"grey"}>{this.state.year}</Text>
                                    <Image resizeMode={"contain"} style={[styles.dropDown]}
                                           source={require("../../../assets/images/dropdown.png")}/>

                                    <PopupDialog
                                        visible={this.state.DialogVisible1}
                                        width={0.6}
                                        onTouchOutside={() => {
                                            this.setState({DialogVisible1: false});
                                        }}
                                        ref={(popupDialog) => {
                                            this.popupDialog = popupDialog;
                                        }}>
                                        <View style={{flexDirection: "column", alignItems: "center"}}>
                                            <View style={{
                                                width: "100%",
                                                height: 0,
                                                marginTop: 3,
                                                marginBottom: 3,
                                                backgroundColor: "black",
                                                flexDirection: "column",
                                            }}/>
                                            <Text style={{
                                                fontSize: 20,
                                                marginTop: 5,
                                                color: "black",
                                                fontWeight: "bold"
                                            }}>Select
                                                Year</Text>
                                            <Text onPress={() => this.setState({year: "19", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2019</Text>
                                            <Text onPress={() => this.setState({year: "20", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2020</Text>
                                            <Text onPress={() => this.setState({year: "21", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2021</Text>
                                            <Text onPress={() => this.setState({year: "22", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2022</Text>
                                            <Text onPress={() => this.setState({year: "23", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2023</Text>
                                            <Text onPress={() => this.setState({year: "24", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2024</Text>
                                            <Text onPress={() => this.setState({year: "25", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2025</Text>
                                            <Text onPress={() => this.setState({year: "26", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2026</Text>
                                            <Text onPress={() => this.setState({year: "27", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2027</Text>
                                            <Text onPress={() => this.setState({year: "28", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2028</Text>
                                            <Text onPress={() => this.setState({year: "29", DialogVisible1: false})}
                                                  style={{fontSize: 18, marginTop: 20, color: "black"}}>2029</Text>
                                            <Text onPress={() => this.setState({year: "30", DialogVisible1: false})}
                                                  style={{
                                                      fontSize: 18,
                                                      marginTop: 20,
                                                      color: "black",
                                                      marginBottom: 20
                                                  }}>2030</Text>
                                        </View>
                                    </PopupDialog>
                                </TouchableOpacity>
                                <View style={{width: "17%",}}>

                                </View>

                                <View style={[styles.row_back, {width: "25%"}]}>
                                    <TextInput style={{fontSize: 15, color: 'white', marginStart: 5}}
                                               placeholder={"123"}
                                               onChangeText={(text) => this.setState({cvc: text})}
                                               placeholderTextColor={"grey"}/>
                                </View>
                            </View>
                            <Text style={styles.txtHeader}>CARD HOLDER NAME</Text>
                            <View style={{flex: 1, flexDirection: 'column', width: "100%"}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <TextInput
                                        style={{height: 40, color: "white", marginStart: 28}}
                                        placeholder={"Card holder name"}
                                        onChangeText={(text) => this.setState({cardHolderName: text})}
                                        placeholderTextColor={"grey"}
                                    />
                                </View>
                                <View style={{height: 0.5, backgroundColor: "#52525D", marginStart: 10}}></View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={this.saveCard} style={[globalStyles.button, {
                            marginTop: 40,
                            height: 35,
                            width: 260,
                            marginBottom: 30
                        }]}>
                            <Text style={{fontSize: 14, fontWeight: "bold", color: "white"}}>Add My Card</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {this.state.showLoading && <View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    position: "absolute",
                    opacity: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")}
                           style={{width: 60, height: 60, opacity: 1,}}/>
                </View>}
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
        height: 20,
        width: 20,

    },
    row_back: {
        backgroundColor: Colors.gray,
        borderWidth: 0.5,
        borderColor: Colors.border,
        borderRadius: 5,
        flexDirection: "row",
        margin: 1,
        height: 40
    },
    dropDown: {
        position: 'absolute',
        right: 14,
        alignSelf: 'center',
        height: 10,
        width: 10,

    }
});
