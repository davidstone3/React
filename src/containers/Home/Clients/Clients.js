import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    ScrollView,
    Switch,
} from "react-native";

import {Header, AirbnbRating} from "react-native-elements";

import {Colors} from "../../../themes";
import {styles} from "./styles";
import {globalStyles} from "../../../themes/globalStyles";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";


export default class ClientHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            newCustomers: 0,
            oldCustomers: 0,
            NoClient: false,
            /*dataSource: [{
                id: 0,
                imgPathh: require("../../../assets/images/anthony.png"),
                title: "Anthony Martial",
                txt: "NEW",
                color: "yellow",
                btnTxt: "$5.00",
                btnClr: "#000000",
            },
                {
                    id: 1,
                    imgPathh: require("../../../assets/images/stefan.png"),
                    color: "yellow",
                    title: "Stefan Danillo",
                    txt: "NEW",
                    btnTxt: "$6.00",
                    btnClr: "#000000",
                },
                {
                    id: 2,
                    imgPathh: require("../../../assets/images/stefan.png"),
                    color: "red",
                    title: "Stefan Danillo",
                    txt: "44 Times",
                    btnTxt: "$6.00",
                    btnClr: "#ffffff",
                }
            ]*/
            dataSource:[],
        }
    }

    componentDidMount(): void {
        this.getClients();
    }

    getClients() {
        this.setState({showLoading: true})
        console.log("URLresponseBarberGetRevenue-->", constants.BarberGetClients + "?barber_id=" + Preference.get("userId"));
        fetch(constants.BarberGetClients + "?barber_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => response.json())
            .then(response => {
                console.log("responsegetClients-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    let Data = response.Data;

                    let allClients = Data.client_info;
                    let newClients = 0;
                    let oldClients = 0;
                    for (let c = 0; c < allClients.length; c++) {
                        if (allClients[c].client_counter === 1)
                            newClients++;
                        else
                            oldClients++;
                    }
                    this.setState({
                        dataSource: Data.client_info, newCustomers: newClients, oldCustomers: oldClients
                    });

                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: getClients " + error);
        });
    }


    renderRowSurge(item) {
        let colorLabel="";
        let textLabelColor="";
        let counterText="";
        if (item.client_counter > 1) {
            colorLabel="red";
            textLabelColor="white";
            counterText="#"+item.client_counter+" Times";
        }else {
            colorLabel="yellow";
            textLabelColor="black";
            counterText="NEW";
        }

        return <View
            style={{
                flexDirection: 'row',
                marginTop: 10,
                width: "100%",
                alignItems: "center",
                height: 70,
                backgroundColor: "#474857",
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: "white"
            }}>
            <Image resizeMode={"contain"} source={item.client_data.client_image} style={{
                marginStart: 10, height: "100%", width: 50
            }}/>
            <View style={{flexDirection: "column", marginStart: 10}}>
                <Text
                    style={{fontSize: 15, color: "white"}}
                >{item.client_data.username + " " + item.client_data.lastname}</Text>
                <View style={{
                    flexDirection: "row",
                    marginTop: 5,
                    width: 75,
                    height: 20,
                    backgroundColor:colorLabel,
                    borderRadius: 3, alignItems: "center", justifyContent: "center"
                }}>
                    <Text
                        style={{fontSize: 12, color: textLabelColor}}>{counterText}</Text>
                </View>


            </View>
            <Text
                style={{fontSize: 10, color: "white", position: "absolute", right: 20, top: 10}}
            >{"Average Tip"}</Text>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Receipt")}
                style={{
                    top: 20,
                    right: 0,
                    position: "absolute",
                    height: 26,
                    width: 75,
                    marginTop: 10,
                    marginEnd: 10,
                    alignItems: 'center',
                    justifyContent: "center",
                    borderRadius: 12,
                    backgroundColor: "#626371"
                }}>

                <Text style={{marginTop: 3, color: "white", fontSize: 10, fontWeight: "bold"}}>{"$5.00"}</Text>
            </TouchableOpacity>

        </View>
    }

    renderRowSurge2(item) {
        return <View
            style={{
                flexDirection: 'row',
                marginTop: 10,
                width: "100%",
                alignItems: "center",
                height: 70,
                backgroundColor: "#474857",
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: "white"
            }}>

            <View style={{flexDirection: "column", marginStart: 10}}>
                <Text
                    style={{fontSize: 15, color: "white"}}
                >{item.title}</Text>

            </View>


        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.state.dataSource.length >0 ?
                        <View style={{height: 50, flexDirection: "row", marginStart: 20, marginEnd: 20}}>
                            <View style={{width: "50%", flexDirection: "row", justifyContent: "flex-start"}}>
                                <Image resizeMode={"contain"} style={{height: 16, width: 16, marginTop: 20}}
                                       source={require("../../../assets/images/ic_new_customer_header.png")}/>
                                <Text style={{
                                    fontSize: 12,
                                    color: "white",
                                    marginStart: 5,
                                    marginTop: 20
                                }}>{this.state.newCustomers + " New Customers"} </Text>
                            </View>
                            <View
                                style={{width: "50%", flexDirection: "row", justifyContent: "flex-end", marginEnd: 20}}>
                                <Image resizeMode={"contain"}
                                       style={{height: 16, width: 16, marginStart: 20, marginTop: 20}}
                                       source={require("../../../assets/images/ic_returning_customer.png")}/>
                                <Text style={{
                                    color: "white",
                                    fontSize: 12,
                                    marginStart: 5,
                                    marginTop: 20
                                }}>{this.state.dataSource.length + " Total Customers"} </Text>
                            </View>
                        </View> : <View></View>}

                    <View style={{marginTop: 0, marginStart: 20, marginEnd: 20}}>
                        {this.state.dataSource.length >0 ?
                            <FlatList renderItem={({item}) => this.renderRowSurge(item)}
                                      data={this.state.dataSource}
                                      keyExtractor={(item, index) => index}
                                      numColumns={1}
                            />
                            :

                            this.renderRowSurge2({
                                title: "You have no clients yet!"
                            })}

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









