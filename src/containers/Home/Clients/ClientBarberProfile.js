import React, {Component} from "react";
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, TouchableWithoutFeedback, Share, Linking, Alert

} from "react-native";
import Header from "../../../components/Header";
import {ScrollView} from "react-native-gesture-handler";
import colors from "../../../themes/colors";
import CheckBoxSquare from "../../../components/CheckBox";
import {Colors} from "../../../themes";
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import {AirbnbRating} from "react-native-elements";


const {height, width} = Dimensions.get("window");
var moment = require("moment");

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
let getmonth = new Date().getMonth();
let getmonthh = new Date().getMonth();
let getDate = new Date().getDate();
let getDay = new Date().getDay();
let getYear = new Date().getFullYear();
console.log("todayDate::", getmonthh + 1 + "-" + getDate + "-" + getYear);
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
getmonthh = 1 + getmonthh;
console.log("todayDate::", getmonthh);
if (getmonthh < 10)
    getmonthh = "0" + getmonthh;

if (getDate < 10)
    getDate = "0" + getDate;
console.log("todayDate::", getmonthh + "-" + getDate + "-" + getYear);
let barberId = 0;


let barberMobilePay = false;
export default class ClientBarberProfile extends Component {

    rightAction() {
        //this.props.navigation.navigate('BarberEditProfile');
        //this.props.navigation.push('Share');
        Share.share({message: "Share Profile"}).then(result => {
        }).catch(errorMessage => console.log(errorMsg));
    }

    leftAction() {
        this.props.navigation.goBack();
    }

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        barberId = navigation.getParam('barberId');
        let barberRating = navigation.getParam('barberRating');
        let barberReviews = navigation.getParam('barberReviews');
        barberMobilePay = navigation.getParam('barberMobilePay');
        this.state = {
            showLoading: false,
            selectedMonth: "",
            showMonth: "",
            barberProfileImage: require("../../../assets/images/personImage.jpg"),
            barberInsta: "",
            barberName: "",
            barberShopName: "",
            barberRating: barberRating,
            barberReviews: barberReviews,
            barberImages: [],
            barberServices: [],
            barberTimeSlots: [],
            barberTotalAmout: 0,
            barberFav: false,
            barberMobilePay: "",
            //barberData:undefined,
            dataSource: [],
            monthSet: undefined,
            monthDays: [],
            surgePriceSelected: false,
            serviceTypeSelected: false,
            serviceDaySelected: true,
            serviceTimeSelected: false,
            totalPriceService: 0,
            selectedServices: [],
            totalServicesTime: 0,
            selectedDate: "",
            selectedSlotTime: "",
            selectedSlotIds: [],
            buttonPayText: "Pay",
            dayData: [
                {
                    id: 1,
                    time: "10:00AM",
                    selected: "transparent",
                    surgePrice: true,
                }, {
                    id: 2,
                    time: "10:30AM",
                    selected: "transparent",
                    surgePrice: false,
                }, {
                    id: 3,
                    time: "11:00AM",
                    selected: "transparent",
                    surgePrice: false,
                }, {
                    id: 4,
                    time: "11:30AM",
                    selected: "transparent",
                    surgePrice: false,
                }, {
                    id: 5,
                    time: "12:00PM",
                    selected: "transparent",
                    surgePrice: false,
                }, {
                    id: 6,
                    time: "12:30AM",
                    selected: "transparent",
                    surgePrice: false,
                }],
            savedCard: ["************4242", "************4242", "************4242"],
            DialogVisible: false,
            month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            ListData: [
                {
                    id: 1,
                    imagePath: require('../../../assets/images/vp2.png')
                },
                {
                    id: 2,
                    imagePath: require('../../../assets/images/vp2.png')
                },
                {
                    id: 3,
                    imagePath: require('../../../assets/images/vp2.png')
                }],
            ListData2: [
                {
                    id: 1,
                    check: false,
                    title: "Haircut",
                    duration: "30 mins",
                    prize: 20,
                    selected: "transparent",
                },
                {
                    id: 2,
                    check: false,
                    title: "Beard Trim",
                    duration: "15 mins",
                    prize: 15,
                    selected: "transparent",
                },
                {
                    id: 3,
                    check: false,
                    title: "Design",
                    duration: "30 mins",
                    prize: 20,
                    selected: "transparent",
                },
                {
                    id: 4,
                    check: false,
                    title: "Hot Towel Shape",
                    duration: "45 mins",
                    prize: 40,
                    selected: "transparent",
                },
                {
                    id: 5,
                    check: false,
                    title: "Housecall",
                    duration: "1 hr",
                    prize: 100,
                    selected: "transparent",
                }

            ]
        }
    }

    componentDidMount() {
        let items = [];
        for (i = 0; i < 7; i++) {
            var weekDate = this.startOfWeek(new Date());
            var newDate = weekDate.addDays(i);
            items.push(this.renderWeekDay({k: i, d: newDate}));
        }
        let hours = Array.apply(null, Array(46)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });
        console.log("slotsData-->" + JSON.stringify(hours));
        /*this.setState({
            dayData: hours,
            dataSource: items
        });*/
        this.setState({
            dataSource: items
        });
        ////////////////////////////////////////////////////////////////////Calender
        //this.setMonthDays(getmonthh, getYear);
        this.setMonth();
    }

    getDateToday() {
        let date = new Date();
        let setMonth = date.getMonth() + 1;
        let dateSelected = date.getFullYear() + "-" + setMonth + "-" + date.getDate();
        console.log("TodayDate--->", dateSelected);
        return dateSelected;
    }

    startOfWeek(date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    itemSelect(indx) {
        //alert("index-"+indx);
        let dataDay = this.state.barberTimeSlots;
        for (let i = 0; i < dataDay.length; i++) {
            if (i === indx) {
                dataDay[indx].slot_detail.selected = "green";
                this.setState({selectedSlotTime: dataDay[indx].slot_detail._id})
                if (dataDay[indx].surge_price === true) {
                    this.setState({surgePriceSelected: true})
                } else {
                    this.setState({surgePriceSelected: false})
                }
            } else {
                dataDay[i].slot_detail.selected = "transparent";
            }
        }
        console.log("SurgePriceSelected-" + this.state.surgePriceSelected)
        this.setState({dayData: dataDay, serviceTimeSelected: true});
        this.checkSlotsAvailability(dataDay[indx].slot_detail._id);
    }

    renderWeekDay(item) {
        let bottomLine = "";
        let bottomLineHeight = "";
        var mDate = moment(item.d);
        var week = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");

        var date1 = moment(item.d).format("YYYY-MM-DD");
        var date2 = moment(new Date()).format("YYYY-MM-DD");

        var currentStyle = {};


        if (date1 === date2) {
            currentStyle = {color: Colors.green};
            bottomLine = Colors.green;
            bottomLineHeight = 2;
        } else {
            bottomLine = Colors.grey;
            bottomLineHeight = 0.5;
        }
        return (
            <View
                key={item.k}
                style={{
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                }}>
                <Text style={[styles.week_day_container, currentStyle]}>
                    {week[item.k]}
                </Text>
                <Text
                    style={[
                        styles.week_day_container,
                        {color: Colors.grey1},
                        currentStyle
                    ]}>
                    {mDate.format("DD")}
                </Text>
                <View style={{height: bottomLineHeight, width: "100%", backgroundColor: bottomLine, marginTop: 5}}/>

            </View>
        );
    }



    addFavoriteBarber() {
        var details = {
            user_id: barberId,
            client_id: Preference.get("userId"),
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formData:" + JSON.stringify(formBody));
        this.setState({showLoading: true})
        fetch(constants.ClientAddFavoriteBarber, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        }).then(response => response.json())
            .then(response => {
                console.log("ClientAddFavoriteBarber-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    Alert.alert("Success!", "Barber set Favorite successfully");
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
            alert("Error: " + error);
        });
    }

    removeFavoriteBarber() {
        var details = {
            user_id: barberId,
            client_id: Preference.get("userId"),
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formData:" + JSON.stringify(formBody));
        this.setState({showLoading: true})
        fetch(constants.ClientRemoveFavoriteBarber, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        }).then(response => response.json())
            .then(response => {
                console.log("ClientAddFavoriteBarber-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    Alert.alert("Success!", "Barber set un Favorite successfully");
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
            alert("Error: " + error);
        });
    }

    getBarberDetails(dateDay) {
        console.log("getBarberDetails barberID-->" + barberId);
        console.log("getBarberDetails barberID-->" + dateDay);
        var details = {
            barber_id: barberId,
            check_date: dateDay,
            client_id: Preference.get("userId"),
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formData:" + JSON.stringify(formBody));
        this.setState({showLoading: true})
        fetch(constants.ClientBarbersProfileSlots, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        }).then(response => response.json())
            .then(response => {
                console.log("ClientBarbersProfileSlots-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    let barberData = response.Data;
                    if (barberData.favorite_bit === 0)
                        this.setState({barberFav: false})
                    else
                        this.setState({barberFav: true})
                    this.setState({
                        barberProfileImage: {uri: barberData.user_image},
                        barberInsta: barberData.username,
                        barberName: barberData.firstname + barberData.lastname,
                        barberShopName: barberData.shop_name,
                        ListData: barberData.portoflios,
                        ListData2: barberData.services,
                        barberTimeSlots: barberData.slots,
                        barberRating: barberData.average_rating,
                        barberReviews: barberData.total_reviews,
                        barberTotalAmout: 0,
                        totalPriceService: 0,
                        barberMobilePay: barberData.payment_option,
                    });

                    let PortfolioImages = this.state.ListData;
                    for (let i = 0; i < PortfolioImages.length; i++) {
                        console.log("ImagesDataURl", PortfolioImages[i].portfolio_image);
                        PortfolioImages[i].portfolio_image = constants.portfolioImagePath + PortfolioImages[i].portfolio_image;
                    }
                    this.setState({ListData: PortfolioImages})
                    //this.setState({barberData: response.Data});

                    if (this.state.barberMobilePay === "mobilePay") {
                        this.setState({buttonPayText: "PAY"})
                    } else {
                        this.setState({buttonPayText: "RESERVE"})
                    }
                    console.log("Slotsdata::", this.state.barberTimeSlots);
                    //this.setState({barberData: response.Data});
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
            alert("Error: " + error);
        });
    }

    bookApointment() {
        this.setState({showLoading:true});
        var details = {
            client_id: Preference.get("userId"),
            barber_id: barberId,
            selected_services:this.state.selectedServices,
            date: this.state.selectedDate,
            selected_slot_id: this.state.selectedSlotIds,
            total_price: this.state.totalPriceService,
            service_fee: "1",
            selected_surge_price: false,
            cus_stripe_id: "",
            transaction_id:"",
            balance_transaction: "" ,
            destination: "" ,
            destination_payment: "" ,
            source_transaction: "",
            payment_date: "",
            payment_created : ""
        };
        console.log("Outputdata::::" + JSON.stringify(details));
        fetch(constants.ClientBookAppointment, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details),
        }).then(response => response.json())
            .then(response => {
                console.log("ClientBookAppointment-->", "-" + JSON.stringify(response));
                this.setState({showLoading: false})
                if (response.ResultType === 1) {
                    Alert.alert("Success!", "Appointment is Booked successfully.");
                    this.props.navigation.navigate('ClientLeaveReview',{
                        client_id: Preference.get("userId"),
                        barber_id: barberId,
                        barberImage: this.state.barberProfileImage,
                        barberName: this.state.barberName,
                        barberShopName: this.state.barberShopName,
                        appointmentPrice: this.state.totalPriceService,
                        selected_services: this.state.selectedServices,
                        date: this.state.selectedDate,
                        selected_slot_id: this.state.selectedSlotIds,
                        total_price: this.state.totalPriceService,
                        service_fee: "1",
                        selected_surge_price: true,
                        appointmentId:response.Data._id
                    });
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    checkSlotsAvailability(id) {
        console.log("checkSlots -Availability:", "---inside")
        //let selectedslot = this.state.selectedSlotTime;
        let totalslots = this.state.barberTimeSlots;
        //console.log("checkSlots -Availability:", "---selectedSlot-->" + id)
        //console.log("checkSlots -Availability:", "---AllSlot-->" + JSON.stringify(totalslots))
        let calculateTotalTimeforSlots = this.state.totalServicesTime;
        //console.log("checkSlots -Availability:", "------calculateTotalTimeforSlots-" + calculateTotalTimeforSlots);
        let totalSlotsNeeded = Math.ceil(calculateTotalTimeforSlots / 15);
        //console.log("checkSlots -Availability:", "------totalSlotsNeeded-" + totalSlotsNeeded);
        let availSlots = 0;
        let totalSelectedSlotsIds = [];
        for (let i = 0; i < totalslots.length; i++) {
            //console.log("checkSlots -Availability:", i + "------inside loop-" + id + "===" + totalslots[i].slot_detail._id);

            if (id === totalslots[i].slot_detail._id) {
                for (let j = 0; j < totalSlotsNeeded; j++) {
                    //console.log("checkSlots -Availability:", i + "--*********--" + j);
                    if (totalslots[i + j].slot_status === 0) {
                        //console.log("checkSlots -Availability:", i + "----" + j + "--");
                        availSlots++;
                        totalSelectedSlotsIds.push(totalslots[i + j].slot_detail._id);
                    } else {
                        if (totalslots[i + j].slot_status === 1) {
                            //console.log("checkSlots -Availability:", i + "----" + j + "--rejected");
                            Alert.alert("Warning!", "Consective slots are not available for these services.");
                            return false;
                        }
                    }
                    if (availSlots === totalSlotsNeeded) {
                        //console.log("checkSlots -Availability:", i + "----" + j + "--allAvailable");
                        this.setState({selectedSlotIds: totalSelectedSlotsIds});
                        //console.log("checkSlots -Availability:", i + "----" + j + "--allAvailable----->>>>>>" + totalSelectedSlotsIds);
                        return true;
                    }
                }
            }
        }
    }


    setFavorite() {
        if (this.state.barberFav === true) {
            this.setState({barberFav: false});
            this.removeFavoriteBarber();
        } else {
            this.setState({barberFav: true});
            this.addFavoriteBarber();
        }
    }

    renderItem(item, index) {
        if (item.slot_status === 0) {
            //var m = moment(new Date(2011, 2, 12, 0, 0, 0));
            //m.add(item.id * 30, "minutes");
            if (item.surge_price === true) {
                return (<View>
                    <TouchableOpacity onPress={() => this.itemSelect(index)}>
                        <View style={{
                            height: 20,
                            flexDirection: "row",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: item.slot_detail.selected,
                            marginStart: 10,
                        }} cellKey={item.id}>
                            <Image resizeMode={"contain"} source={require("../../../assets/images/dollar_surge.png")}
                                   style={{width: 12, height: 12, marginStart: 5, marginTop: 2}}/>
                            <Text style={{
                                textAlignVertical: "top",
                                height: 40,
                                marginStart: 4,
                                marginEnd: 7,
                                fontFamily: "AvertaStd-Regular",
                                color: "#01E8F1",
                                fontSize: 12,
                                fontWeight: "bold",
                            }}>
                                {this.showTime(item.slot_detail.start_time)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>)
            } else
            {
                return (<View>
                    <TouchableOpacity onPress={() => this.itemSelect(index)}>
                        <View style={{
                            height: 20,
                            flexDirection: "row",
                            borderRadius: 10,
                            borderWidth: 1,
                            alignItems: "center",
                            borderColor: item.slot_detail.selected,
                            marginStart: 3,
                        }} cellKey={item.slot_detail._id}>
                            <Text style={{
                                textAlignVertical: "top",
                                marginLeft: 10,
                                marginRight: 10,
                                width: 50,
                                textAlign: "center",
                                fontFamily: "AvertaStd-Regular",
                                color: Colors.white,
                                fontSize: 11,
                                fontWeight: "bold",
                            }}>
                                {this.showTime(item.slot_detail.start_time)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>)
            }
        } else {
            return (<View>
                <View style={{
                    height: 20,
                    flexDirection: "row",
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: "center",
                    borderColor: item.slot_detail.selected,
                    marginStart: 3,
                }} cellKey={item.slot_detail._id}>
                    <Text style={{
                        textAlignVertical: "top",
                        marginLeft: 10,
                        marginRight: 10,
                        width: 50,
                        textAlign: "center",
                        fontFamily: "AvertaStd-Regular",
                        color: "green",
                        fontSize: 11,
                        fontWeight: "bold",
                    }}>
                        {"Booked"}
                    </Text>
                </View>
            </View>)
        }

    }

    showTime(time) {
        let waqt = time.split(":");
        let am = "";
        if (waqt[0] > 11) {
            waqt[0] = waqt[0] - 12;
            if (waqt[0] === 0) {
                waqt[0] = 12;
            }
            am = "PM";

        } else {
            am = "AM";
        }
        if(waqt[1]<10)
        {
            waqt[1]="0"+waqt[1];
        }
        return waqt[0] + ":" + waqt[1] + " " + am;
    }

    showDialog() {
        this.setState({DialogVisible: true})
    }

    cardSelected(card) {
        this.setState({DialogVisible: false})
    }

    checkSurgePriceSelected() {
        if (this.state.serviceTypeSelected === true && this.state.serviceDaySelected === true && this.state.serviceTimeSelected === true) {
            if (this.state.surgePriceSelected === true)
                this.props.navigation.navigate('SurgePricingRate',{
                    client_id: Preference.get("userId"),
                    barber_id: barberId,
                    barberImage: this.state.barberProfileImage,
                    barberName: this.state.barberName,
                    barberShopName: this.state.barberShopName,
                    appointmentPrice: this.state.totalPriceService,
                    selected_services: this.state.selectedServices,
                    date: this.state.selectedDate,
                    selected_slot_id: this.state.selectedSlotIds,
                    total_price: this.state.totalPriceService,
                    service_fee: "1",
                    selected_surge_price: true,
                    barberMobilePay:this.state.barberMobilePay
                });
            else {
                if (this.state.barberMobilePay === "mobilePay")
                {
                    this.props.navigation.navigate("PaymentMethodClient",{
                        client_id: Preference.get("userId"),
                        barber_id: barberId,
                        barberImage: this.state.barberProfileImage,
                        barberName: this.state.barberName,
                        barberShopName: this.state.barberShopName,
                        appointmentPrice: this.state.totalPriceService,
                        selected_services: this.state.selectedServices,
                        date: this.state.selectedDate,
                        selected_slot_id: this.state.selectedSlotIds,
                        total_price: this.state.totalPriceService,
                        service_fee: "1",
                        selected_surge_price: false,
                    })

                }else
                {
                    this.bookApointment();
                }

            }
        } else {
            alert("Please select Service,Time and Day for further procedure.");
        }
    }

    checkBoxClicked(id) {
        //console.log("IDforService---->" + id);
        let mainData = this.state.ListData2;
        if (mainData[id].check === true) {
            //console.log("IDforService---->"+mainData[id].check);
            mainData[id].check = false;
            //console.log("IDforService---->"+mainData[id].check);
            let totalprice = this.state.totalPriceService;
            //totalprice = totalprice - mainData[id].price;
            totalprice = parseInt(totalprice) - parseInt(mainData[id].price);
            this.setState({totalPriceService: totalprice});
        } else {
            //console.log("IDforService---->"+ mainData[id].check);
            mainData[id].check = true;
            //console.log("IDforService---->"+mainData[id].check);
            let totalprice = this.state.totalPriceService;
            totalprice = parseInt(totalprice) + parseInt(mainData[id].price);
            this.setState({totalPriceService: totalprice});
        }

        this.setState({serviceTypeSelected: false, selectedServices: []});
        let selectedservice = [];
        let totalTime = 0;
        for (let j = 0; j < mainData.length; j++) {
            //console.log("IDforService---->"+j+"--"+ mainData[j].check);
            if (mainData[j].check === true) {
                //console.log("IDforService---->"+j+"-true-"+ mainData[j].check);
                selectedservice.push(mainData[j]._id);
                totalTime += parseInt(mainData[j].duration);
                this.setState({serviceTypeSelected: true});
                //console.log("IDforService---->" + JSON.stringify(selectedservice));
            }
        }

        this.setState({ListData2: mainData, selectedServices: selectedservice, totalServicesTime: totalTime});
        //console.log("IDforService--t-->"+ JSON.stringify(totalTime));
    }

    selectday(indx) {
        //alert("dayselected " + indx);
        let monthDaysData = this.state.monthDays;
        //console.log("Dateselected is",monthDaysData[indx].dateOfDay)
        this.setState({selectedDate: monthDaysData[indx].dateOfDay});
        for (let s = 0; s < monthDaysData.length; s++) {
            console.log("slectDay-loop" + s);
            if (s === indx) {
                console.log("slectDay-loop-index-true" + s);
                monthDaysData[s].dayColor = "green";
                monthDaysData[s].bottomColor = "green";
            } else {
                console.log("slectDay-loop-index-false" + s);
                monthDaysData[s].dayColor = "#ffffff";
                monthDaysData[s].bottomColor = "transparent";
            }
        }
        console.log("NEWMonthdata1 ", JSON.stringify(monthDaysData));
        this.setState({monthDays: monthDaysData}, () => {
            console.log("NEWMonthdata ", JSON.stringify(this.state.monthDays));
        });

        console.log("selectedDateIs", JSON.stringify(monthDaysData[indx].dateOfDay));
        this.getBarberDetails(monthDaysData[indx].dateOfDay)
        //alert("dayselected " + this.state.selectedDate);
    }

    async setMonth() {
        const input = getmonth + "-19";
        let outt = input.split("-");
        let showmonth = monthNames[outt[0]] + "20" + outt[1];
        this.setState({selectedMonth: input, showMonth: showmonth});
        await this.setMonthDays(input, true);
    }

    increaseMonth() {
        //alert("increaseMonth");
        const input = this.state.selectedMonth;
        console.log("SetMonth---->>>", input);
        let outt = input.split("-");
        console.log("SetMonth---->>>--->", outt);
        if (parseInt(outt[0]) === 11) {
            outt[0] = 0;
            outt[1] = parseInt(outt[1]) + 1;
        } else {
            outt[0] = parseInt(outt[0]) + 1;
            console.log("SetMonth---->>>--->", parseInt(outt[0]) + 1);
        }
        console.log("SetMonth---->>>--->", outt[0]);
        let showmonth = monthNames[outt[0]] + "20" + outt[1];
        console.log("SetMonth---->>>", showmonth);
        let selectedmonth = outt[0] + "-" + outt[1];
        this.setState({selectedMonth: selectedmonth, showMonth: showmonth});
        this.setMonthDays(selectedmonth, false);
    }

    decreaseMonth() {
        // alert("decreaseMonth")
        const input = this.state.selectedMonth;
        console.log("SetMonth---->>>", input);
        let outt = input.split("-");
        if (parseInt(outt[0]) === 0) {
            outt[0] = 11;
            outt[1] = parseInt(outt[1]) - 1;
        } else {
            outt[0] = parseInt(outt[0]) - 1;
        }
        let showmonth = monthNames[outt[0]] + "20" + outt[1];
        console.log("SetMonth---->>>", showmonth);
        let selectedmonth = outt[0] + "-" + outt[1];
        this.setState({selectedMonth: selectedmonth, showMonth: showmonth});
        this.setMonthDays(selectedmonth, false);
    }

    setMonthDays(input, current) {
        const inputt = input.split("-");
        console.log("DateMonth--" + inputt);
        const output = moment(parseInt(inputt[0]) + 1 + "-" + inputt[1], "MM-YY");
        console.log("DateMonth--" + output);
        let lastDay = output.endOf('month').format('DD');
        console.log("DateMonth--" + lastDay);
        let monthh = getmonth + 1;
        if (monthh < 10)
            monthh = "0" + monthh;
        let daysData = [];
        let loopstart = 0;
        if (current) {
            loopstart = getDate;
        } else
            loopstart = 1;
        for (let i = loopstart; i <= lastDay; i++) {
            let realDate = "";
            let month = parseInt(inputt[0]) + 1;
            if (i < 10) {
                if (month < 10) {
                    realDate = "20" + inputt[1] + "-0" + month + "-0" + i;
                } else {
                    realDate = "20" + inputt[1] + "-" + month + "-0" + i;
                }
            } else {
                if (month < 10) {
                    realDate = "20" + inputt[1] + "-0" + month + "-" + i;
                } else {
                    realDate = "20" + inputt[1] + "-" + month + "-" + i;
                }
            }

            console.log("Real_date-----> ", realDate);
            let dayColor = "";
            let bottomColor = "";
            if (i === loopstart) {
                dayColor = "green";
                bottomColor = "green";
            } else {
                dayColor = "#ffffff";
                bottomColor = "transparent";
            }
            daysData.push({
                id: i,
                day: i,
                dayColor: dayColor,
                weekDay: this.getDayOfWeek(realDate),
                bottomColor:bottomColor,
                dateOfDay: realDate
            })
        }
        let mon = this.state.month[getmonth];
        this.setState({monthDays: daysData,selectedDate: daysData[0].dateOfDay});
        this.getBarberDetails(daysData[0].dateOfDay);
        //this.selectday(0);
    }

    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getDay();
        return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][dayOfWeek];
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        <Header
                            leftAction={this.leftAction.bind(this)}
                            rightAction={this.rightAction.bind(this)}
                            bgIcon={require("../../../assets/images/bannerprofile.png")}
                            rightIcon={require("../../../assets/images/share.png")}
                            leftIcon={require("../../../assets/images/ic_back.png")}/>
                        {this.state.barberFav && <TouchableOpacity onPress={() => this.setFavorite()}
                                                                   style={{position: "absolute", top: 40, right: 60}}>
                            <Image source={require("../../../assets/images/star.png")}
                                   style={{width: 20, height: 20,}}/>
                        </TouchableOpacity>}
                        {!this.state.barberFav && <TouchableOpacity onPress={() => this.setFavorite()}
                                                                    style={{position: "absolute", top: 40, right: 60}}>
                            <Image source={require("../../../assets/images/star-unselected.png")}
                                   style={{width: 20, height: 20,}}/>
                        </TouchableOpacity>}
                        <View style={styles.detailsContainer}>
                            <View style={styles.profileImageContainer}>
                                <Image
                                    source={this.state.barberProfileImage}
                                    style={styles.profileImage}>
                                </Image>
                            </View>

                            <TouchableOpacity style={styles.icon}
                                              onPress={() => Linking.openURL('https://www.instagram.com/' + this.state.barberInsta)}>
                                <Image
                                    source={require("../../../assets/images/insta.png")}
                                    style={{height: 50, width: 50,}}
                                />
                            </TouchableOpacity>


                            <View>
                                <View style={[styles.infoContainer]}>
                                    <Text style={[styles.allFontStyle, styles.name]}>
                                        {this.state.barberName}
                                    </Text>
                                    <View style={{flexDirection: "row",}}>
                                        <Text style={{color: colors.white, fontSize: 12}}>
                                            {this.state.barberShopName}
                                        </Text>
                                        {/*<Image resizeMode={"contain"}
                                           style={{height: 8, width: 8, marginStart: 10, marginTop: 5}}
                                           source={require("../../../assets/images/arrow_down.png")}/>*/}
                                    </View>

                                    <View style={styles.review}>
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('ClientSupremeReview', {barberId: barberId});
                                        }}>
                                            <AirbnbRating
                                                isDisabled={true}
                                                showRating={false}
                                                count={5}
                                                defaultRating={this.state.barberRating}
                                                size={10}
                                                style={{marginStart: 10, height: 30}}
                                            />
                                            {/*<Image
                                            resizeMode="contain"
                                            source={require("../../../assets/images/start.png")}
                                            style={styles.rating}
                                        />*/}
                                        </TouchableOpacity>
                                        <Text
                                            style={[styles.allFontStyle, styles.reviewText]}>{"(" + this.state.barberReviews + " Reviews)"}</Text>

                                    </View>

                                </View>
                            </View>

                        </View>
                        <View style={{height: 25}}/>
                        <Text style={styles.row_title}>{"EXPERIENCE"}</Text>
                        <View style={[{
                            flex: 1,
                            width: '100%',
                            height: "100%",
                            flexDirection: "row"
                        }]}>

                            {/*<FlatList renderItem={({item}) =>
                            <View>
                                <Image style={{
                                    borderRadius: 10,
                                    marginStart: 8,
                                    height: 140,
                                    width: 160,
                                    backgroundColor: "grey"
                                }}
                                       resizeMode='cover'
                                       source={item.imagePath}/>
                            </View>}
                                  data={this.state.ListData}
                                  horizontal={true}
                                  showsHorizontalScrollIndicator={false}
                                  keyExtractor={item => item.id}/>
                        <Image resizeMode={"contain"} source={require("../../../assets/images/arrow1.png")}
                               style={{position: "absolute", width: 35, height: 35, right: 10, top: 50}}/>*/}
                            {(this.state.ListData.length > 0) && <FlatList
                                data={this.state.ListData}
                                extraData={this.state}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={index => index}
                                renderItem={({item}) =>
                                    <View>
                                        <Image style={{
                                            borderRadius: 10,
                                            marginStart: 8,
                                            height: 140,
                                            width: 160,
                                            backgroundColor: "grey"
                                        }}
                                               resizeMode='cover'
                                               source={{uri: item.portfolio_image}}/>
                                    </View>}
                            />}
                            {(this.state.ListData.length < 1) &&
                            <View style={{width: "100%", height: 60, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{
                                    fontSize: 15,
                                    color: "white"
                                }}>{this.state.barberName+" don't have any Experience Images"}</Text>
                            </View>}
                            {(this.state.ListData.length > 0) &&
                            <Image resizeMode={"contain"} source={require("../../../assets/images/arrow1.png")}
                                   style={{position: "absolute", width: 35, height: 35, right: 10, top: 50}}/>}
                        </View>
                        <View style={{height: 15}}/>
                        <View style={[{
                            backgroundColor: "grey",
                            color: "white",
                            margin: 20,
                            borderRadius: 12
                        }]}>

                            <View
                                style={[{
                                    width: "100%",
                                    flexDirection: "row",
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                    alignItems: "center",
                                    height: 35,
                                    backgroundColor: "#868791",
                                }]}>
                                <View style={{
                                    width: "45%", height: "100%", justifyContent: "center"
                                    , marginStart: 10
                                }}>
                                    <Text style={{color: "white", fontSize: 12}}>Type</Text>
                                </View>
                                <View style={{
                                    width: "30%", height: "100%", alignItems: "center"
                                    , flexDirection: "row"
                                }}>
                                    <View style={{width: 3, height: "100%", backgroundColor: "#686975"}}/>
                                    <Text style={{color: "white", marginStart: 15, fontSize: 12}}>Duration </Text>
                                    <View style={{
                                        width: 3,
                                        height: "100%",
                                        marginStart: 10,
                                        backgroundColor: "#686975"
                                    }}/>
                                </View>
                                <View style={[{width: "25%", right: 5, flexDirection: "row"}]}>
                                    <View style={{width: 1, height: "100%", backgroundColor: "#686975"}}/>
                                    <Text style={{color: "white", fontSize: 12}}>Prices</Text>
                                </View>
                            </View>

                            {this.state.ListData2.length > 0 && <FlatList
                                renderItem={({item, index}) =>
                                    <View style={{flexDirection: "column"}}>
                                        <TouchableOpacity onPress={() => this.checkBoxClicked(index)} style={[{
                                            flexDirection: "row",
                                            height: 30,
                                            backgroundColor: "#686975"
                                        }]}>
                                            <View style={[{
                                                flexDirection: "row",
                                                width: "50%",
                                                marginStart: 10,
                                                alignItems: "center"
                                            }]}>
                                                <CheckBoxSquare onClick={() => this.checkBoxClicked(index)}
                                                                isChecked={item.check}
                                                                uncheckedCheckBoxColor={"#272727"}/>
                                                <Text style={{color: "white", fontSize: 12}}>   {item.name} </Text>
                                            </View>
                                            <View style={[{flexDirection: "row", width: "25%", alignItems: "center"}]}>
                                                <Text style={{color: "white", fontSize: 12}}>{item.duration}</Text>
                                            </View>
                                            <View style={[{flexDirection: "row", width: "25%", alignItems: "center"}]}>
                                                <Text style={{color: "white", fontSize: 12}}>{"$" + item.price}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height: 0.5, backgroundColor: "#868791"}}/>
                                    </View>}
                                data={this.state.ListData2}
                                keyExtractor={(index) => index}
                                showsVerticalScrollIndicator={true}
                                removeClippedSubviews={false}
                                initialNumToRender={5}
                                numColumns={1}
                                style={{
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12, paddingBottom: 12, backgroundColor: "#686975"
                                }}/>}

                            {this.state.ListData2.length < 1 &&
                            <View style={{width: "100%", height: 60, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{fontSize: 15, color: "white"}}>{"You don't have any Services"}</Text>
                            </View>}


                        </View>
                        {this.state.ListData2.length > 0 && <View Style={{flexDirection: "column"}}>
                            <View style={{flexDirection: "row", width: "100%", height: 40}}>

                                <Text
                                    style={{
                                        fontFamily: "AvertaStd-Semibold",
                                        alignSelf: "center",
                                        marginTop: 5,
                                        color: Colors.red1,
                                        textAlign: "center",
                                        width: "100%"
                                    }}>
                                    {this.state.showMonth}
                                </Text>
                                <TouchableOpacity onPress={() => this.decreaseMonth()}
                                                  style={{position: "absolute", top: 15, left: 20}}>
                                    <Image style={{height: 13, width: 13,}}
                                           source={require("../../../assets/images/left_calender.png")}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.increaseMonth()}
                                                  style={{position: "absolute", top: 15, right: 20}}>
                                    <Image style={{height: 13, width: 13,}}
                                           source={require("../../../assets/images/right_arrow_calender.png")}/>
                                </TouchableOpacity>
                            </View>
                            {/*<Text
                                style={{
                                    fontFamily: "AvertaStd-Semibold",
                                    alignSelf: "center",
                                    marginTop: 12,
                                    color: Colors.red1
                                }}
                            >{this.state.month[getmonth] + " " + getYear}</Text>*/}
                            {/*<View style={styles.calendar_weekly_header}>
                            {this.state.dataSource}
                        </View>*/}
                            <FlatList
                                data={this.state.monthDays}
                                keyExtractor={(item, index) => index}
                                showsHorizontalScrollIndicator={false}
                                numColumns={1}
                                horizontal={true}
                                extraData={this.state}
                                renderItem={({item, index}) => <View
                                    style={{justifyContent: "center", alignItems: "center"}}>
                                    <TouchableOpacity style={{
                                        width: "100%", justifyContent: "center",
                                        alignItems: "center", height: 60, marginStart: 20, marginEnd: 20,
                                        borderBottomWidth: 2,
                                        borderBottomColor: item.bottomColor
                                    }} onPress={() => this.selectday(index)}>
                                        <Text style={{color: item.dayColor, fontSize: 15}}>{item.weekDay}</Text>
                                        <Text
                                            style={{
                                                color: item.dayColor,
                                                fontWeight: "bold",
                                                fontSize: 12
                                            }}>{item.day}</Text>

                                    </TouchableOpacity>
                                </View>
                                }/>
                            <View style={{height: 0.5, width: "100%", backgroundColor: "grey", marginBottom: 10}}/>
                            {(this.state.barberTimeSlots.length > 0) && <FlatList
                                /* data={this.state.dayData}*/
                                data={this.state.barberTimeSlots}
                                /* data={this.state.listData}*/
                                renderItem={({item, index}) => this.renderItem(item, index)}
                                numColumns={1}
                                extraData={this.state}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index}
                                horizontal={true}/>}
                            {!(this.state.barberTimeSlots.length > 0) && <View style={{
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "transparent"
                            }}>
                                <Text style={{color: "white", fontSize: 15}}>{"Fully Booked"}</Text>
                            </View>}
                        </View>}
                        <View
                            style={{
                                flexDirection: "column",
                                height: 100,
                                width: "100%",
                                marginBottom: 30,
                                marginTop: 30
                            }}>
                            <View style={{
                                flexDirection: "row",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#010221"
                            }}>
                                <View style={{
                                    flexDirection: "row", width: "40%", justifyContent: "center", alignItems: "center",
                                }}>
                                    <View style={{
                                        flexDirection: "column",
                                        height: "100%",
                                        width: "100%",
                                        marginStart: 25,
                                    }}>
                                        <Text style={{
                                            fontSize: 16, color: "white",
                                            fontFamily: "AvertaStd-Thin",
                                            marginTop: 10

                                        }}>Subtotal:</Text>
                                        <Text
                                            style={{
                                                fontSize: 35,
                                                fontWeight: "bold",
                                                textAlign: "left",
                                                color: "white",
                                            }}
                                        >${this.state.totalPriceService}</Text>
                                        <Text style={{color: "white", fontFamily: "AvertaStd-Thin", fontSize: 12}}>Service
                                            Fee:
                                            <Text style={{
                                                fontWeight: "bold",
                                                color: "white"
                                            }}>{"$1.00"}</Text>
                                        </Text>
                                    </View>
                                </View>
                                {(this.state.buttonPayText === "PAY") &&
                                <TouchableOpacity onPress={() => this.showDialog()} style={{
                                    flexDirection: "row",
                                    width: "40%",
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Image resizeMode={"contain"} source={require("../../../assets/images/visa.png")}
                                           style={{width: 25}}/>
                                    <Text style={{
                                        textAlign: "center",
                                        fontSize: 17,
                                        marginStart: 5,

                                        color: "white"

                                    }}>****4242</Text>
                                    <Image
                                        style={{
                                            marginStart: 5,
                                        }} resizeMode={"contain"}
                                        source={require("../../../assets/images/arrow_down.png")}/>
                                </TouchableOpacity>}
                                {!(this.state.buttonPayText === "PAY") &&<View style={{
                                    width: "40%",
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: "white",
                                        fontStyle: 'italic'
                                    }}>{" Pay in Store "}</Text>
                                </View>}

                                <TouchableOpacity onPress={() => {
                                    this.checkSurgePriceSelected()
                                }} style={{
                                    backgroundColor: "red",
                                    width: "20%",
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: "white",
                                        fontWeight: "bold"
                                    }}>{this.state.buttonPayText}</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                        <Dialog
                            visible={this.state.DialogVisible}
                            onTouchOutside={() => {
                                this.setState({DialogVisible: false});
                            }}
                            width={0.6}>
                            <DialogContent>
                                <Text style={{
                                    fontSize: 18,
                                    color: "black",
                                    fontWeight: "bold",
                                    marginBottom: 10,
                                    marginTop: 10
                                }}>{"Please select your Card"}</Text>
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{marginTop: 10}}
                                    data={this.state.savedCard}
                                    renderItem={({item}) =>
                                        <TouchableOpacity onPress={() => this.cardSelected(item)}>
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    color: "black",
                                                    margin: 10
                                                }}>{"Card # " + item}</Text>
                                            <View style={{width: "100%", height: 0.5, backgroundColor: "black"}}/>
                                        </TouchableOpacity>
                                    }
                                    numColumns={1}
                                    keyExtractor={(item, index) => index}
                                    horizontal={false}/>
                            </DialogContent>
                        </Dialog>
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
        width,
        backgroundColor: colors.themeBackground
    },
    detailsContainer: {
        flex: 1,
        alignItems: "center",
        marginBottom: 20
    },
    profileImageContainer: {
        height: width / 2.7,
        width: width / 2.7,
        borderRadius: width / 2.7 / 2,
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -width / 5
    },
    icon: {height: 50, width: 50, position: 'absolute', top: 10, right: width / 2 - width / 2.7 / 2},
    iconContainer: {},
    profileImage: {
        height: width / 3,
        width: width / 3,
        borderRadius: (width / 3) / 2,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    infoContainer: {
        height: 80,
        justifyContent: "space-around",
        width,
        alignItems: "center"
    },
    allFontStyle: {
        color: "#535361"
    },
    row_title: {
        color: "#697078",
        marginLeft: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        fontFamily: "AvertaStd-Regular"
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
    button: {
        width: width / 2.2,
        backgroundColor: "#FF0000",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 30,
        height: height / 19,
        alignItems: "center"
    },
    buttonText: {color: "white", fontSize: 15, fontWeight: "500"},
    review: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    reviewText: {
        fontSize: 12,
        color: colors.white
    },
    rating: {height: 30, width: width / 4},
    tip_price_container: {
        backgroundColor: Colors.border,
        marginTop: 8,
        width: 80,
        height: 24,
        borderWidth: 0.5,
        borderColor: Colors.border,
        borderRadius: 12
    },
    MainContainer: {
        justifyContent: "center",
        flex: 1,
    },
    avatar_conatiner: {
        alignSelf: "center",
        marginLeft: 10,
        height: 60,
        width: 60
    },
    icon_header: {
        height: 20,
        width: 20
    },


    calendar_weekly_header: {
        height: 60,
        flexDirection: "row"
    },
    week_day_container: {
        alignSelf: "center",
        color: "white",
        fontFamily: "AvertaStd-Semibold",
        fontSize: 12
    }


});
