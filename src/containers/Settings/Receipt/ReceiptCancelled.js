import React, {Component} from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    FlatList
} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header, AirbnbRating} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";

let appointmentId = "";
export default class ReceiptCancelled extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showLoading: false,
            invoiceNo: "",
            invoiceDate: "",
            invoiceTime: "",
            barberName: "",
            barberShopName: "",
            barberLocation: "",
            barberServices: "",
            subTotal: "",
            ServiceFee: "",
            tipLeft: "",
            surgePrice: "",
            totalMain: "",
            rating: "",
            goodQuality: false,
            cleanliness: false,
            punctuality: false,
            professional: false,
        }
        const {navigation} = this.props;
        appointmentId = navigation.getParam('appointmentId');
    }

    componentDidMount(): void {
        this.getRecieptDetails();
    }

    getRecieptDetails() {
        this.setState({showLoading: true})
        fetch(constants.ClientReciept + "?appointment_id=" + appointmentId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getRecieptDetails-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    let recieptData = response.Data;
                    let receptDate=recieptData.date;
                    receptDate=receptDate.split("T");
                    this.setState({
                        invoiceNo: recieptData.invoice_no,
                        invoiceDate: receptDate[0],
                        invoiceTime: "12:00am",
                        barberName: recieptData.barber_firstname +" "+recieptData.barber_lastname ,
                        barberShopName: recieptData.barber_shop_name,
                        barberLocation:recieptData.location,
                        barberServices: recieptData.selected_services,
                        subTotal: recieptData.total_price,
                        ServiceFee: recieptData.service_fee,
                        tipLeft: recieptData.tip_price,
                        surgePrice: "",
                        totalMain: "",
                        rating: recieptData.rating,
                        goodQuality: recieptData.good_quality,
                        cleanliness: recieptData.cleanliness,
                        punctuality: recieptData.punctuality,
                        professional: recieptData.professionol,
                    })
                    if(recieptData.selected_surge_price===true)
                    {
                        let surgePricee=recieptData.total_price/2
                        let TotalMain=(parseInt(recieptData.total_price)+1)+(parseInt(surgePricee)+parseInt(recieptData.tip_price));
                        this.setState({surgePrice:surgePricee,totalMain:TotalMain});
                    }else
                    {
                        let surgePricee=0;
                        let TotalMain=(parseInt(recieptData.total_price)+1)+(parseInt(surgePricee)+parseInt(recieptData.tip_price));
                        this.setState({surgePrice:surgePricee,totalMain:TotalMain});
                    }
                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            this.setState({showLoading: false})
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    renderRow(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 30}}>
            <Image style={styles.leftIcon} source={item.ic}/>
            <Text style={styles.row_title}>{item.title}</Text>
        </View>;
    }

    renderRow2(item) {
        return <View style={{width: "100%", flexDirection: 'row', height: 30}}>
            <Text style={[styles.row_title, {
                width: "75%",
                justifyContent: "flex-start",
                marginStart: 10
            }]}>{item.title}</Text>
            <Text style={[styles.row_title, {width: "25%", justifyContent: "flex-end",}]}>{item.value}</Text>
        </View>;
    }


    renderSeperator() {
        return <View style={{height: 0.5, backgroundColor: Colors.lightGrey}}></View>
    }

    render() {
        let ratings = Math.floor(Math.random() * 5 + 1);
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "RECEIPT", style: {color: "#fff"}}}
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


                    <View
                        style={{flex: 1, flexDirection: "column", marginBottom: 150}}>
                        <View style={{width: "100%", alignItems: "center"}}>
                            <Image
                                source={require("../../../assets/images/logo.png")}
                                style={{marginTop: 20, resizeMode: 'contain', width: 200}}/>
                        </View>
                        <Text style={styles.txtHeader}>CANCELLED</Text>
                        <View style={{width: "85%", flexDirection: "row", marginStart: 30,marginEnd:30}}>
                            <Text
                                style={{ color: "white", justifyContent: "flex-start", fontSize: 12}}>Invoice
                                No.{this.state.invoiceNo}</Text>
                            <Text style={{
                                color: "white",
                                position:"absolute",
                                right:0,
                                fontSize: 12
                            }}>{this.state.invoiceDate} - {this.state.invoiceTime}</Text>
                        </View>
                        <View style={[globalStyles.rowBackground, styles.row]}>
                            <Text style={{
                                color: "white",
                                alignItems: "flex-start",
                                fontSize: 16,
                                fontWeight: "bold",
                                marginStart: 10,
                                marginTop: 10
                            }}>To be paid to:</Text>
                            {this.renderRow({
                                title: this.state.barberName + " (" + this.state.barberShopName + ")",
                                ic: require("../../../assets/images/ic_barbershop.png"),
                            })}
                            {this.renderRow({
                                title: this.state.barberLocation,
                                ic: require("../../../assets/images/location.png"),
                            })}
                            <FlatList renderItem={({item}) => this.renderRow2({
                                title: item.name,
                                value: "$"+item.price,
                            })}
                                      data={this.state.barberServices}
                                      keyExtractor={(item, index) => index}
                                      numColumns={1}
                            />
                            {this.renderSeperator()}
                            <View style={{width: "100%", flexDirection: 'row', height: 36}}>
                                <Text style={{
                                    color: "white",
                                    alignItems: "flex-start",
                                    fontSize: 16,
                                    width: "75%",
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 10
                                }}>{"Subtotal:"}</Text>
                                <Text style={{
                                    color: "white",
                                    width: "25%",
                                    alignItems: "flex-end",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 10
                                }}>{"$"+this.state.subTotal+".00"}</Text>
                            </View>
                            {this.renderRow2({
                                title: "Service Fee",
                                value: "$1.00",
                            })}

                            {this.renderRow2({
                                title: "Surge Price",
                                value:"$"+this.state.surgePrice,
                            })}
                            <View style={{width: "100%", flexDirection: 'row', height: 36}}>
                                <Text style={{
                                    color: "white",
                                    alignItems: "flex-start",
                                    fontSize: 16,
                                    width: "75%",
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 5
                                }}>{"Total:"}</Text>
                                <Text style={{
                                    color: "white",
                                    width: "25%",
                                    alignItems: "flex-end",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 5
                                }}>{"$"+this.state.totalMain}</Text>

                            </View>
                            {this.renderSeperator()}


                            <Text style={{
                                color: "white",
                                alignItems: "flex-start",
                                fontSize: 16,
                                width: "75%",
                                fontWeight: "bold",
                                marginStart: 10,
                                marginTop: 5,
                            }}>{"Cancelled by:"}</Text>
                            <Text
                                style={{
                                    color: "white",
                                    alignItems: "flex-start",
                                    fontSize: 14,
                                    width: "75%",
                                    marginStart: 10,
                                }}>{"Dani Alvez (Client) "}</Text>
                            <View style={{width: "100%", flexDirection: 'row', height: 36}}>
                                <Text style={{
                                    color: "white",
                                    alignItems: "flex-start",
                                    fontSize: 15,
                                    width: "40%",
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 10,
                                }}>{"Time Cancelled:"}</Text>
                                <Text style={{
                                    color: "white",
                                    width: "55%",
                                    textAlign: "center",
                                    fontSize: 14,
                                    //backgroundColor:"red",
                                    marginTop: 10
                                }}>{"2nd September at 10:00 AM"}</Text>
                            </View>
                        </View>
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
