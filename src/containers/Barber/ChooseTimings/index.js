import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    NetInfo,
    TextInput,
    BackHandler
} from "react-native";

import {Header} from "react-native-elements";

import DatePicker from 'react-native-date-picker';


import {Colors} from "../../../themes";
import {styles} from "./styles";

//import { globalStyles } from "../../themes/globalStyles";

import {globalStyles} from "../../../themes/globalStyles";
import CheckBoxSquare from "../../../components/CheckBox";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import PopupDialog from 'react-native-popup-dialog';

var moment = require("moment");
const dateFormat = "hh:mm a";

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

export default class ChooseTimings extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: false,
            dataSource: [],
            daysData: [],
            workingDays: [],
            startTime: new Date(),
            endTime: new Date(),
            chosenDate: new Date(),
            isOffToday: false,
            date: new Date().setHours(13, 0, 0),
            daySelected: "",
            showBreakTimeDialog: false,
            breakStart: "",
            breakEnd: "",
            showVacationDialog: false,

            newYear: false,
            valentineDay: false,
            easterDay: false,
            cincoDay: false,
            july4: false,
            memorialDay: false,
            labourDay: false,
            halloweenDay: false,
            thankDay: false,
            chrismasDay: false,
            yearlyHolidays: [],

        };
        this.setDate = this.setDate.bind(this);
        console.log("Timimng:::" + this.state.date);

    }

    setCheckBox(idx) {
        if (idx === 1) {
            if (this.state.newYear === false)
                this.setState({newYear: true})
            else
                this.setState({newYear: false})
        }
        if (idx === 2) {
            if (this.state.valentineDay === false)
                this.setState({valentineDay: true,})
            else
                this.setState({valentineDay: false})
        }
        if (idx === 3) {
            if (this.state.easterDay === false)
                this.setState({easterDay: true})
            else
                this.setState({easterDay: false})
        }
        if (idx === 4) {
            if (this.state.cincoDay === false)
                this.setState({cincoDay: true})
            else
                this.setState({cincoDay: false})
        }
        if (idx === 5) {
            if (this.state.july4 === false)
                this.setState({july4: true})
            else
                this.setState({july4: false})
        }
        if (idx === 6) {
            if (this.state.memorialDay === false)
                this.setState({memorialDay: true})
            else
                this.setState({memorialDay: false})
        }
        if (idx === 7) {
            if (this.state.labourDay === false)
                this.setState({labourDay: true})
            else
                this.setState({labourDay: false})
        }
        if (idx === 8) {
            if (this.state.halloweenDay === false)
                this.setState({halloweenDay: true})
            else
                this.setState({halloweenDay: false})
        }
        if (idx === 9) {
            if (this.state.thankDay === false)
                this.setState({thankDay: true})
            else
                this.setState({thankDay: false})
        }
        if (idx === 10) {
            if (this.state.chrismasDay === false)
                this.setState({chrismasDay: true})
            else
                this.setState({chrismasDay: false})
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            //this.goBack(); // works best when the goBack is async
            return true;
        });
        this.fetchWorkingHours();
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate});
    }


    startOfWeek(date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    fetchWorkingHours = () => {
        this.setState({showLoading: true});
        console.log("userID---->" + Preference.get("userId"));
        console.log("url--->" + constants.BarberWorkingHours + "?user_id=" + Preference.get("userId"));
        fetch(constants.BarberWorkingHours + "?user_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseworkinghours-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    this.setState({workingDays: response.Data.working_days, yearlyHolidays: response.Data.holidays});
                    //this.setWorkingDay();
                    this.setDays();
                    console.log("yearlyHolidays-1->",response.Data.holidays);
                    this.setHolidays(response.Data.holidays);
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
    };

    setHolidays(holidays) {
        console.log("yearlyHolidays-->",holidays);
        for (let n = 0; n < holidays.length; n++) {
            if (holidays[n].yearly_holiday === "New Year") {
                this.setState({newYear: holidays[n].status})
            } else if (holidays[n].yearly_holiday === "Valentines Day") {
                this.setState({valentineDay: holidays[n].status})
            } else if (holidays[n].yearly_holiday === "Easter") {
                this.setState({easterDay: holidays[n].status})
            } else if (holidays[n].yearly_holiday === "Cinco de Mayo ") {
                this.setState({cincoDay: holidays[n].status})
            } else if (holidays[n].yearly_holiday === "4th of July") {
                this.setState({july4: holidays[n].status})
            } else if (holidays[n].yearly_holiday === "Memorial Day") {
                this.setState({memorialDay: holidays[n].status})
            } else if (holidays[n].yearly_holiday === "Labor Day") {
                this.setState({labourDay: holidays[n].status})
            } else if (holidays[n].yearly_holiday === "Halloween") {
                this.setState({halloweenDay: holidays[n].status})
            } else if (holidays[n].yearly_holiday === "Thanksgiving") {
                this.setState({thankDay: holidays[n].status})
            } else if (holidays[n].yearly_holiday === "Christmas") {
                this.setState({chrismasDay: holidays[n].status})
            }
        }
    }

    setHolidaysData() {
        this.setState({showVacationDialog: false});
        let holiday = this.state.yearlyHolidays;
        console.log("yearlyHolidays-->",holiday);
        if (this.state.newYear) {
            holiday[0].status = true;
        } else {
            holiday[0].status = false;
        }

        if (this.state.valentineDay) {
            holiday[1].status = true;
        } else {
            holiday[1].status = false;
        }
        if (this.state.easterDay) {
            holiday[2].status = true;
        } else {
            holiday[2].status = false;
        }
        if (this.state.cincoDay) {
            holiday[3].status = true;
        } else {
            holiday[3].status = false;
        }
        if (this.state.july4) {
            holiday[4].status = true;
        } else {
            holiday[4].status = false;
        }
        if (this.state.memorialDay) {
            holiday[5].status = true;
        } else {
            holiday[5].status = false;
        }
        if (this.state.labourDay) {
            holiday[6].status = true;
        } else {
            holiday[6].status = false;
        }
        if (this.state.halloweenDay) {
            holiday[7].status = true;
        } else {
            holiday[7].status = false;
        }
        if (this.state.thankDay) {
            holiday[8].status = true;
        } else {
            holiday[8].status = false;
        }
        if (this.state.chrismasDay) {
            holiday[9].status = true;
        } else {
            holiday[9].status = false;
        }

        console.log("yearlyHolidays-->",holiday);

        this.setState({yearlyHolidays:holiday});

    }

    updateWorkingHours() {
        let details = {
            barber_id: Preference.get("userId"),
            working_days: this.state.workingDays,
            holidays: this.state.yearlyHolidays
        };
        console.log("OutPutData::", details);
        this.setState({showLoading: true});
        fetch(constants.UpdateWorkingHours, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseworkinghours-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    alert("Your working hours updated.");
                    if (Preference.get("newUser") === true)
                        this.props.navigation.push("Subscription")
                    else
                        this.props.navigation.goBack();

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

    setNotWorkingDay(val) {
        let workdays = this.state.workingDays;
        workdays[val].is_off = true;
        this.setState({workingDays: workdays})
        let items = [];
        for (i = 0; i < 7; i++) {
            items.push(this.renderWeekDay({k: i}));
        }
        this.setState({
            dataSource: items
        });
        console.log("SortedArray::", JSON.stringify(this.state.workingDays));
    }

    setDays() {
        console.log("WorkingDays-->--->" + this.state.workingDays.length)
        let items = [];
        for (i = 0; i < 7; i++) {
            items.push(this.renderWeekDay({k: i}));
        }
        this.setState({dataSource: items});
        this.setTimeofDay("Mon");
    }

    setTimeofDay(day) {
        this.setState({daySelected: day})
        let workingdayz = this.state.workingDays;
        for (let j = 0; j < 7; j++) {
            if (day === workingdayz[j].day) {
                let startTime = workingdayz[j].working_from;
                let startTime1 = startTime.split(":");
                console.log("SetTime Splited time:::-->" + startTime1);
                let startimeDay = this.state.startTime;
                startimeDay.setHours(startTime1[0]);
                startimeDay.setMinutes(startTime1[1]);
                this.setState({startTime: startimeDay});
                console.log("SetTime:::-->" + startTime1);

                let endTime = workingdayz[j].working_to;
                let endTime1 = endTime.split(":");
                console.log("SetTime Splited time:::-->" + endTime1);
                let endtimeDay = this.state.endTime;
                endtimeDay.setHours(endTime1[0]);
                endtimeDay.setMinutes(endTime1[1]);
                this.setState({endTime: endtimeDay})
                console.log("SetTime:::-->" + this.state.endTime);
                workingdayz[j].selected = true;
                this.setState({breakStart: workingdayz[j].break_from, breakEnd: workingdayz[j].break_to})
            } else {
                workingdayz[j].selected = false;
            }
            this.setState({workingDays: workingdayz});
            console.log("WorkingDayData", JSON.stringify(this.state.workingDays))
        }
        let items = [];
        for (i = 0; i < 7; i++) {
            items.push(this.renderWeekDay({k: i}));
        }
        this.setState({
            dataSource: items
        });
    }

    setWorkingDay(val) {
        let workdays = this.state.workingDays;
        if (workdays[val].is_off)
            workdays[val].is_off = false;
        else {
            workdays[val].is_off = true;
        }
        this.setState({workingDays: workdays})
        let items = [];
        for (i = 0; i < 7; i++) {
            items.push(this.renderWeekDay({k: i}));
        }
        this.setState({
            dataSource: items
        });
    }

    dayItemClicked(index) {
        if (index === 0) {
            this.setTimeofDay("Mon");
        }
        if (index === 1) {
            this.setTimeofDay("Tue");
        }
        if (index === 2) {
            this.setTimeofDay("Wed");
        }
        if (index === 3) {
            this.setTimeofDay("Thurs");
        }
        if (index === 4) {
            this.setTimeofDay("Fri");
        }
        if (index === 5) {
            this.setTimeofDay("Sat");
        }
        if (index === 6) {
            this.setTimeofDay("Sun");
        }
    }

    renderWeekDay(item) {
        var week = new Array("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN");
        let workingdayz = this.state.workingDays;
        console.log("workingDay--->>" + workingdayz[item.k]);
        if (workingdayz[item.k].is_off === false) {
            return (<View style={{
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                    backgroundColor: item.bg
                }}>
                    <TouchableOpacity key={item.k} onPress={() => this.setNotWorkingDay(item.k)}>
                        <Image
                            style={{
                                height: 16,
                                resizeMode: "contain",
                                alignSelf: "center",
                                marginBottom: 10
                            }}
                            source={require("../../../assets/images/ic_working.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: "column", alignItems: "center"}}
                                      onPress={() => this.dayItemClicked(item.k)}>
                        <Text
                            style={[styles.week_day_container, {fontFamily: "AvertaStd-Thin"}]}>
                            {week[item.k]}
                        </Text>
                        {workingdayz[item.k].selected &&
                        <View style={{height: 6, width: 6, backgroundColor: "white", borderRadius: 3, marginTop: 3}}/>}
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (<View style={{
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                    backgroundColor: item.bg
                }}>
                    <TouchableOpacity key={item.k} onPress={() => this.setWorkingDay(item.k)}>
                        <Image
                            style={{
                                height: 16,
                                resizeMode: "contain",
                                alignSelf: "center",
                                marginBottom: 10
                            }}
                            source={require("../../../assets/images/ic_notworking.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.dayItemClicked(item.k)}>
                        <Text
                            style={[styles.week_day_container, {fontFamily: "AvertaStd-Thin"}]}>
                            {week[item.k]}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    onTimeSelected = date => {

    };

    setTimeStart(date) {
        let workdays = this.state.workingDays;
        this.setState({startTime: date});
        for (let h = 0; h < 7; h++) {
            if (this.state.daySelected === workdays[h].day) {
                workdays[h].working_from = date.getHours() + ":" + date.getMinutes();
            }
        }
        console.log("TimeSetAfter:", JSON.stringify(this.state.workingDays));
    }

    setTimeEnd(date) {
        let workdays = this.state.workingDays;
        this.setState({endTime: date});
        for (let h = 0; h < 7; h++) {
            if (this.state.daySelected === workdays[h].day) {
                workdays[h].working_to = date.getHours() + ":" + date.getMinutes();
            }
        }
        console.log("TimeSetAfter:", JSON.stringify(this.state.workingDays));
    }

    saveBreakTime() {
        let index = this.state.daySelected;
        let workdays = this.state.workingDays;
        if (index === "Mon") {
            workdays[0].break_from = this.state.breakStart;
            workdays[0].break_to = this.state.breakEnd;
        }
        if (index === "Tue") {
            workdays[0].break_from = this.state.breakStart;
            workdays[0].break_to = this.state.breakEnd;
        }
        if (index === "Wed") {
            workdays[0].break_from = this.state.breakStart;
            workdays[0].break_to = this.state.breakEnd;
        }
        if (index === "Thurs") {
            workdays[0].break_from = this.state.breakStart;
            workdays[0].break_to = this.state.breakEnd;
        }
        if (index === "Fri") {
            workdays[0].break_from = this.state.breakStart;
            workdays[0].break_to = this.state.breakEnd;
        }
        if (index === "Sat") {
            workdays[0].break_from = this.state.breakStart;
            workdays[0].break_to = this.state.breakEnd;
        }
        if (index === "Sun") {
            workdays[0].break_from = this.state.breakStart;
            workdays[0].break_to = this.state.breakEnd;
        }
        this.setState({workingDays: workdays, showBreakTimeDialog: false});
    }



    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}>
                            <Image
                                style={{
                                    tintColor: "white",
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                                source={require("../../../assets/images/ic_back.png")}
                            />
                        </TouchableOpacity>
                    }
                    centerComponent={{
                        text: "Choose Your Working Hours",
                        style: {color: "#fff"}
                    }}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />
                <ScrollView>
                    <View>
                        <View style={[globalStyles.rowBackground, {height: 60, margin: 20}]}>
                            {this.state.dataSource}
                        </View>

                        <View style={{flexDirection: "row", width: "100%", height: 100}}>
                            <View style={{flexDirection: "column", width: "40%", marginStart: 10}}>
                                <Text style={{
                                    color: "grey",
                                    fontWeight: "bold",
                                    fontSize: 13,
                                    marginBottom: 10,
                                    marginStart: 20
                                }}>{"FROM"}</Text>
                                <DatePicker
                                    date={this.state.startTime}
                                    style={{width: 200, backgroundColor: Colors.themeBackground, height: 150}}
                                    minuteInterval={15}
                                    fadeToColor={"none"}
                                    onDateChange={date => this.setTimeStart(date)}
                                    mode={"time"}
                                    textColor={"#ffffff"}
                                />


                            </View>
                            <View style={{width: "40%", marginStart: 10}}>
                                <Text style={{
                                    color: "grey",
                                    fontWeight: "bold",
                                    fontSize: 13,
                                    marginBottom: 10,
                                    marginStart: 20
                                }}>{"TO"}</Text>

                                <DatePicker
                                    date={this.state.endTime}
                                    onDateChange={date => this.setTimeEnd(date)}
                                    minuteInterval={15}
                                    mode={"time"}
                                    style={{width: 200, backgroundColor: Colors.themeBackground, height: 150}}
                                    fadeToColor={"none"}
                                    textColor={"#ffffff"}
                                />
                            </View>


                        </View>


                        <View style={{flexDirection: 'row', height: 40, marginLeft: 20, marginTop: 130}}>
                            {/*<CheckBoxSquare onClick={() => {
                    }} isChecked={this.state.isOffToday} style={{alignSelf: 'center'}}/>
                    <Text style={{color: "white", textAlignVertical: "center", marginStart: 7}}>{"Off"}<Text style={
                        {color: "grey",}
                    }>{"  (Today Not Working)"}</Text></Text>*/}
                        </View>


                        <TouchableOpacity style={[
                            globalStyles.button,
                            {marginTop: 10, marginBottom: 10, width: "80%"}]}
                                          onPress={() => this.updateWorkingHours()}>
                            <Text style={globalStyles.buttonText}>Update Now</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            {this.renderTimingView({
                                title: "Add Break Time",
                                src: require("../../../assets/images/ic_break_time.png")
                            })}
                            {this.renderTimingView({
                                title: "Vacation Days",
                                src: require("../../../assets/images/ic_vacation_days.png")
                            })}
                            <View style={{marginBottom: 50}}/>
                        </ScrollView>

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

                <PopupDialog
                    visible={this.state.showBreakTimeDialog}
                    width={0.7}
                    onTouchOutside={() => {
                        this.setState({showBreakTimeDialog: false});
                    }}>
                    <View style={{flexDirection: "column"}}>
                        <View style={{
                            width: "100%",
                            height: 0,
                            marginTop: 3,
                            marginBottom: 3,
                            backgroundColor: "white",
                            flexDirection: "column",
                        }}/>

                        <Text style={{
                            fontSize: 18,
                            marginTop: 5,
                            marginBottom: 20,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}>Enter Break Time for {this.state.daySelected}</Text>
                        <TextInput Color={"white"}
                                   placeholder={"Enter start time"}
                                   placeholderTextColor={"grey"}
                                   value={this.state.breakStart}
                                   onChangeText={(text) => this.setState({breakStart: text})}
                                   style={{
                                       fontSize: 14,
                                       marginStart: 10
                                   }}/>


                        <TextInput Color={"white"} placeholder={"Enter end time"}
                                   placeholderTextColor={"grey"}
                                   value={this.state.breakEnd}
                                   onChangeText={(text) => this.setState({breakEnd: text})}
                                   keyboardType={'number-pad'}
                                   style={{
                                       fontSize: 14,
                                       marginStart: 10
                                   }}/>

                        <TouchableOpacity
                            onPress={() => this.saveBreakTime()}
                            style={[globalStyles.button, {
                                height: 35,
                                width: "80%",
                                backgroundColor: "red",
                                marginTop: 20,
                                marginBottom: 20,
                            }]}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "white"
                            }}>{"Save"}</Text>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>
                <PopupDialog
                    visible={this.state.showVacationDialog}
                    width={0.7}
                    onTouchOutside={() => {
                        this.setState({showVacationDialog: false});
                    }}>
                    <View style={{flexDirection: "column", backgroundColor: Colors.themeBackground}}>
                        <View style={{
                            width: "100%",
                            height: 0,
                            marginTop: 3,
                            marginBottom: 3,
                            backgroundColor: "white",
                            flexDirection: "column",
                        }}/>

                        <Text style={{
                            fontSize: 18,
                            marginTop: 5,
                            marginBottom: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "white"
                        }}>Select Vacation Holidays</Text>


                        <View style={{flexDirection: "column",}}>
                            {this.renderRowWithCheck({title: "New Years - 1/1", indx: 1, check: this.state.newYear})}
                            <View style={{height: 0, width: "100%", backgroundColor: "grey", margin: 5}}/>
                            {this.renderRowWithCheck({
                                title: "Valentines Day - 2/14",
                                indx: 2,
                                check: this.state.valentineDay
                            })}
                            <View style={{height: 0, width: "100%", backgroundColor: "grey", margin: 5}}/>
                            {this.renderRowWithCheck({title: "Easter - 4/12", indx: 3, check: this.state.easterDay})}
                            <View style={{height: 0, width: "100%", backgroundColor: "grey", margin: 5}}/>
                            {this.renderRowWithCheck({
                                title: "Cinco de Mayo - 5/5",
                                indx: 4,
                                check: this.state.cincoDay
                            })}
                            <View style={{height: 0, width: "100%", backgroundColor: "grey", margin: 5}}/>
                            {this.renderRowWithCheck({title: "4th of July - 7/4", indx: 5, check: this.state.july4})}
                            <View style={{height: 0, width: "100%", backgroundColor: "grey", margin: 5}}/>
                            {this.renderRowWithCheck({
                                title: "Memorial Day - 5/25",
                                indx: 6,
                                check: this.state.memorialDay
                            })}
                            <View style={{height: 0, width: "100%", backgroundColor: "grey", margin: 5}}/>
                            {this.renderRowWithCheck({title: "Labor Day - 9/7", indx: 7, check: this.state.labourDay})}
                            <View style={{height: 0, width: "100%", backgroundColor: "grey", margin: 5}}/>
                            {this.renderRowWithCheck({
                                title: "Halloween - 10/31",
                                indx: 8,
                                check: this.state.halloweenDay
                            })}
                            <View style={{height: 0, width: "100%", backgroundColor: "grey", margin: 5}}/>
                            {this.renderRowWithCheck({
                                title: "Thanksgiving - 11/24",
                                indx: 9,
                                check: this.state.thankDay
                            })}
                            <View style={{height: 0, width: "100%", backgroundColor: "grey", margin: 5}}/>
                            {this.renderRowWithCheck({
                                title: "Christmas - 12/25",
                                indx: 10,
                                check: this.state.chrismasDay
                            })}
                        </View>
                        <TouchableOpacity
                            onPress={() => this.setHolidaysData()}
                            style={[globalStyles.button, {
                                height: 35,
                                width: "80%",
                                backgroundColor: "red",
                                marginTop: 20,
                                marginBottom: 20,
                            }]}>

                            <Text style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "white"
                            }}>{"Save"}</Text>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>


            </View>
        );
    }

    renderRowWithCheck(item) {
        return <View style={{flexDirection: 'row', height: 20, marginLeft: 40}}>
            <CheckBoxSquare onClick={() => {
                this.setCheckBox(item.indx)
            }} isChecked={item.check} rightText={item.title} style={{width: 200}}/>
            {/*<Text style={{
                color: "black",
                marginLeft: 10,
                alignSelf: 'center',
                fontFamily: "AvertaStd-Regular"
            }}>{}</Text>*/}
        </View>;
    }


    renderTimingView(item) {
        if (item.title === "Add Break Time") {
            return (
                <TouchableOpacity onPress={() => this.setState({showBreakTimeDialog: true})}
                                  style={[globalStyles.rowBackground, {height: 80, marginTop: 16}]}>
                    <View
                        style={{
                            justifyContent: "center",
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            backgroundColor: Colors.grey,
                            width: 80
                        }}
                    >
                        <Image
                            style={{
                                position: "absolute",
                                height: 40,
                                width: 40,
                                resizeMode: "contain",
                                alignSelf: "center"
                            }}
                            source={item.src}
                        />
                    </View>
                    <Text
                        style={{
                            color: Colors.white,
                            fontFamily: "AvertaStd-Semibold",
                            alignSelf: "center",
                            marginLeft: 24,
                            fontSize: 18
                        }}
                    >
                        {item.title}
                    </Text>
                    <Image
                        style={{
                            position: "absolute",
                            right: 20,
                            height: 12,
                            width: 17,
                            resizeMode: "contain",
                            alignSelf: "center"
                        }}
                        source={require("../../../assets/images/ic_long_arrow.png")}
                    />
                </TouchableOpacity>

            );
        } else {
            return (
                <TouchableOpacity onPress={() => this.setState({showVacationDialog: true})}
                                  style={[globalStyles.rowBackground, {height: 80, marginTop: 16}]}>
                    <View
                        style={{
                            justifyContent: "center",
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            backgroundColor: Colors.grey,
                            width: 80
                        }}
                    >
                        <Image
                            style={{
                                position: "absolute",
                                height: 40,
                                width: 40,
                                resizeMode: "contain",
                                alignSelf: "center"
                            }}
                            source={item.src}
                        />
                    </View>
                    <Text
                        style={{
                            color: Colors.white,
                            fontFamily: "AvertaStd-Semibold",
                            alignSelf: "center",
                            marginLeft: 24,
                            fontSize: 18
                        }}
                    >
                        {item.title}
                    </Text>
                    <Image
                        style={{
                            position: "absolute",
                            right: 20,
                            height: 12,
                            width: 17,
                            resizeMode: "contain",
                            alignSelf: "center"
                        }}
                        source={require("../../../assets/images/ic_long_arrow.png")}
                    />
                </TouchableOpacity>

            );
        }

    }
}
