import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBox from "../../../components/CheckBox";
import {constants} from "../../../utils/constants";

let item1price = 0, item2price = 0;
export default class DiscoverMe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            zipCode: false,
            city: false,
            stat: false,
            oneWeek: false,
            twoWeek: false,
            threeWeek: false,
            previosItemPrice: 0,
            price: 0,
        }
    }

    componentDidMount(): void {
        this.getDiscovedMe()
    }

    getDiscovedMe() {
        this.setState({showLoading: true});
        fetch(constants.BarberBookingPreference + "?user_id=" + "5d1206c0a70da23e2c2ae205" /*Preference.get("userId")*/, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseBookingPrefrence-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    let prefrence = response.Data;

                    if (prefrence.get_discovered_range === "1")
                        this.setState({zipCode: true})
                    if (prefrence.get_discovered_range === "2")
                        this.setState({city: true})
                    if (prefrence.get_discovered_range === "3")
                        this.setState({stat: true})

                    if (prefrence.get_discovered_promotion_duration === "1")
                        this.setState({oneWeek: true})
                    if (prefrence.get_discovered_promotion_duration === "2")
                        this.setState({twoWeek: true})
                    if (prefrence.get_discovered_promotion_duration === "3")
                        this.setState({threeWeek: true})


                } else {
                    this.setState({showLoading: false});
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false});
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    checkBox(val) {
        if (val === 1) {
            if (this.state.zipCode === true) {
                let pr = this.state.price;
                pr = pr - 5;
                this.setState({zipCode: false, price: pr})
            } else {
                let pr = this.state.price;
                pr = pr + 5;
                this.setState({zipCode: true, price: pr})
            }

        }
        if (val === 2) {
            if (this.state.city === true) {
                let pr = this.state.price;
                pr = pr - 15;
                this.setState({city: false, price: pr})
            } else {
                let pr = this.state.price;
                pr = pr + 15;
                this.setState({city: true, price: pr})
            }
        }
        if (val === 3) {
            if (this.state.stat === true) {
                let pr = this.state.price;
                pr = pr - 50;
                this.setState({stat: false, price: pr})
            } else {
                let pr = this.state.price;
                pr = pr + 50;
                this.setState({stat: true, price: pr})
            }
        }
        if (val === 4) {
            if (this.state.oneWeek === true) {
                /*let pr = this.state.price;
                pr = pr - 5;
                this.setState({oneWeek: false, price: pr})*/
            } else {
                let pr = this.state.price;
                pr = pr + 5 - this.state.previosItemPrice;
                this.setState({oneWeek: true, twoWeek: false, threeWeek: false, previosItemPrice: 5, price: pr})
            }
        }
        if (val === 5) {
            if (this.state.twoWeek === true) {
                /* let pr = this.state.price;
                 pr = pr - 10;
                 this.setState({twoWeek: false, price: pr})*/
            } else {
                let pr = this.state.price;
                pr = pr + 10 - this.state.previosItemPrice;
                this.setState({twoWeek: true, oneWeek: false, threeWeek: false, previosItemPrice: 10, price: pr})
            }
        }
        if (val === 6) {
            if (this.state.threeWeek === true) {
                /*let pr = this.state.price;
                pr = pr - 15;
                this.setState({threeWeek: false, price: pr})*/
            } else {
                let pr = this.state.price;
                pr = pr + 15 - this.state.previosItemPrice;
                this.setState({threeWeek: true, oneWeek: false, twoWeek: false, previosItemPrice: 15, price: pr})
            }
        }
    }

    renderRow(item) {
        return <View style={{ flexDirection: 'row', height: 22, marginLeft: 40}}>
            <CheckBox onClick={() => this.checkBox(item.itemNu)} rightText={item.title} isChecked={item.value}
                      style={{width:160}}/>
            {/*<Text style={styles.row_title}>{item.title}</Text>*/}
        </View>;
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "GET DISCOVERED", style: {color: "#fff"}}}
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
                                source={require("../../../assets/images/ic_back.png")}
                            />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                            <Image style={styles.leftIcon} source={require("../../../assets/images/ic_range.png")}/>
                            <Text style={styles.row_title}>RANGE</Text>
                        </View>
                    </View>
                    {this.renderRow({title: "Zipcode ($5)", value: this.state.zipCode, itemNu: 1})}
                    {this.renderRow({title: "City ($15)", value: this.state.city, itemNu: 2})}
                    {this.renderRow({title: "State ($50)", value: this.state.stat, itemNu: 3})}
                    <View style={[globalStyles.rowBackground, styles.row, {marginTop: 30}]}>
                        <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                            <Image style={styles.leftIcon} source={require("../../../assets/images/ic_siren.png")}/>
                            <Text style={styles.row_title}>PROMOTION DURATION</Text>
                        </View>
                    </View>
                    {this.renderRow({title: "1 Week ($5)", value: this.state.oneWeek, itemNu: 4})}
                    {this.renderRow({title: "2 Weeks ($10)", value: this.state.twoWeek, itemNu: 5})}
                    {this.renderRow({title: "3 Weeks ($15)", value: this.state.threeWeek, itemNu: 6})}

                    <View style={[globalStyles.rowBackground, {
                        marginTop: 30,
                        height: 60,
                        width: 200,
                        alignSelf: 'center',
                        borderRadius: 25
                    }]}>
                        <View style={{flex: 1, flexDirection: 'column', height: 36, alignSelf: 'center'}}>
                            <Text style={styles.promo_title}>TOTAL</Text>
                            <Text style={styles.promo_title}>${this.state.price}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={[globalStyles.button, {marginTop: 70, width: '70%'}]} onPress={() => {
                        this.props.navigation.navigate('PaymentMethod');
                    }}>
                        <Text style={globalStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
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
        );
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
        marginTop: 20,
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

    promo_title: {
        color: "#2FCEFE",
        marginTop: 2,
        fontSize: 16,
        marginLeft: 10,
        alignSelf: 'center',
        fontFamily: "AvertaStd-Bold"
    },

    row_title: {
        color: Colors.white,
        marginTop: 0,
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
