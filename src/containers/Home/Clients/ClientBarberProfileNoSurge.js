import React, {Component} from "react";
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, TouchableWithoutFeedback,

} from "react-native";
import Header from "../../../components/Header";
import {ScrollView} from "react-native-gesture-handler";
import colors from "../../../themes/colors";
import CheckBoxSquare from "../../../components/CheckBox";
import {Colors} from "../../../themes";


const {height, width} = Dimensions.get("window");
var moment = require("moment");

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

export default class ClientBarberProfileNoSurge extends Component {

    rightAction() {
        this.props.navigation.goBack();
    }
    leftAction() {
        this.props.navigation.goBack();
    }

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            dayData: [],
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
                    check: true,
                    title: "Haircut",
                    duration: "30 mins",
                    prize: "$20"
                },
                {
                    id: 2,
                    check: true,
                    title: "Beard Trim",
                    duration: "15 mins",
                    prize: "$15"
                },
                {
                    id: 3,
                    check: false,
                    title: "Design",
                    duration: "30 mins",
                    prize: "$20"
                },
                {
                    id: 4,
                    check: false,
                    title: "Hot Towel Shape",
                    duration: "45 mins",
                    prize: "$40"
                },
                {
                    id: 5,
                    check: false,
                    title: "Housecall",
                    duration: "1 hr",
                    prize: "$100"
                }

            ]
        }
    }

    startOfWeek(date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    itemSelect() {

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
        this.setState({
            dayData: hours,
            dataSource: items
        });
    }

    renderItem(item) {

        var m = moment(new Date(2011, 2, 12, 0, 0, 0));
        m.add(item.id * 30, "minutes");
        if (item.id == 2) {
            return (<View>
                <TouchableWithoutFeedback onPress={() => this.itemSelect(item.id)}>
                    <View style={{
                        height: 20,
                        flexDirection: "row",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: Colors.green,
                        marginStart: 10,
                    }} cellKey={item.id}>
                        <Text style={{
                            textAlignVertical: "top",
                            height: 40,
                            marginBottom: 30,
                            marginStart: 10,
                            marginEnd: 10,
                            width: 50,
                            fontFamily: "AvertaStd-Regular",
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 2
                        }}>
                            {m.format("hh:mm A")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>)
        } else if (item.id === 3 || item.id === 4 || item.id === 5) {
            return (<View>
                <TouchableWithoutFeedback onPress={() => this.itemSelect(item.id)}>
                    <View style={{height: 20, flexDirection: "row", marginStart: 10}} cellKey={item.id}>
                        <Image resizeMode={"contain"} source={require("../../../assets/images/dollar_surge.png")}
                               style={{width: 12, height: 12,marginTop:3}}/>
                        <Text style={{
                            textAlignVertical: "top",
                            height: 40,
                            marginBottom: 30,
                            marginStart: 4,
                            marginEnd: 5,
                            width: 50,
                            fontFamily: "AvertaStd-Regular",
                            color: "#01E8F1",
                            fontSize: 11,
                            fontWeight: "bold",
                            marginTop: 2
                        }}>
                            {m.format("hh:mm A")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>)
        } else {
            return (<View>
                <TouchableWithoutFeedback onPress={() => this.itemSelect(item.id)}>
                    <View style={{height: 70, flexDirection: "row"}} cellKey={item.id}>
                        <Text style={{
                            textAlignVertical: "top",
                            height: 40,
                            marginLeft: 10,
                            marginBottom: 30,
                            width: 50,
                            fontFamily: "AvertaStd-Regular",
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: "bold",
                            marginTop: 4
                        }}>
                            {m.format("hh:mm A")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>)
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Header
                        leftAction={this.leftAction.bind(this)}
                        rightAction={this.rightAction.bind(this)}
                        bgIcon={require("../../../assets/images/bannerprofile.png")}
                        rightIcon={require("../../../assets/images/share.png")}
                        leftIcon={require("../../../assets/images/ic_back.png")}/>
                    <View style={styles.detailsContainer}>
                        <View style={styles.profileImageContainer}>
                            <ImageBackground
                                source={require("../../../assets/images/personface.png")}
                                style={styles.profileImage}
                            >
                            </ImageBackground>
                        </View>

                        <Image
                            source={require("../../../assets/images/insta.png")}
                            style={styles.icon}
                        />

                        <View>
                            <View style={[styles.infoContainer]}>
                                <Text style={[styles.allFontStyle, styles.name]}>
                                    Anthony Martial
                                </Text>
                                <View style={{flexDirection: "row",}}>
                                    <Text style={{color: colors.white, fontSize: 12}}>
                                        CLYPR Barbershop
                                    </Text>

                                    <Image resizeMode={"contain"}
                                           style={{height: 8, width: 8, marginStart: 10, marginTop: 5}}
                                           source={require("../../../assets/images/arrow_down.png")}/>


                                </View>

                                <View style={styles.review}>
                                    <TouchableOpacity  onPress={()=>{
                                        this.props.navigation.navigate('ClientSupremeReview');
                                    }}  >
                                    <Image
                                        resizeMode="contain"
                                        source={require("../../../assets/images/start.png")}
                                        style={styles.rating}
                                    />
                                    </TouchableOpacity>
                                    <Text style={[styles.allFontStyle, styles.reviewText]}>
                                        (17 Reviews)
                                    </Text>

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

                        <FlatList renderItem={({item}) =>
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
                               style={{position: "absolute", width: 35, height: 35, right: 10, top: 50}}/>

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
                                <View style={{width: 3, height: "100%", marginStart: 10, backgroundColor: "#686975"}}/>
                            </View>
                            <View style={[{width: "25%", right: 5, flexDirection: "row"}]}>
                                <View style={{width: 1, height: "100%", backgroundColor: "#686975"}}/>
                                <Text style={{color: "white", fontSize: 12}}>Prices</Text>
                            </View>
                        </View>

                        <FlatList
                            renderItem={({item}) =>
                                <View style={{flexDirection: "column"}}>
                                    <View style={[{flexDirection: "row", height: 30, backgroundColor: "#686975"}]}>
                                        <View style={[{
                                            flexDirection: "row",
                                            width: "50%",
                                            marginStart: 10,
                                            alignItems: "center"
                                        }]}>
                                            <CheckBoxSquare isChecked={item.check} uncheckedCheckBoxColor={"#84858C"}  />
                                            <Text style={{color: "white", fontSize: 12}}>   {item.title} </Text>
                                        </View>
                                        <View style={[{flexDirection: "row", width: "25%", alignItems: "center"}]}>
                                            <Text style={{color: "white", fontSize: 12}}>{item.duration}</Text>
                                        </View>
                                        <View style={[{flexDirection: "row", width: "25%", alignItems: "center"}]}>
                                            <Text style={{color: "white", fontSize: 12}}>{item.prize}</Text>
                                        </View>
                                    </View>
                                    <View style={{height: 0.5, backgroundColor: "#868791"}}/>
                                </View>}
                            data={this.state.ListData2}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={true}
                            removeClippedSubviews={false}
                            initialNumToRender={5}
                            numColumns={1}
                            style={{
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12, paddingBottom: 12, backgroundColor: "#686975"
                            }}/>


                    </View>
                    <View Style={{flexDirection: "column"}}>
                        <Text
                            style={{
                                fontFamily: "AvertaStd-Semibold",
                                alignSelf: "center",
                                marginTop: 12,
                                color: Colors.red1
                            }}
                        >{"April 2019"}</Text>
                        <View style={styles.calendar_weekly_header}>
                            {this.state.dataSource}
                        </View>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.dayData}
                            /* data={this.state.listData}*/
                            renderItem={({item}) => this.renderItem(item)}
                            numColumns={1}
                            showsVerticalScrollIndicator={true}
                            keyExtractor={(item, index) => index}
                            horizontal={true}/>
                    </View>
                    <View style={{flexDirection: "column", height: 100, width: "100%", marginBottom: 30}}>
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
                                        marginTop:10

                                    }}>Subtotal:</Text>
                                    <Text
                                        style={{
                                            fontSize: 35,
                                            fontWeight: "bold",
                                            textAlign: "left",
                                            color: "white",
                                           }}
                                    >$36.25</Text>
                                    <Text style={{color: "white", fontFamily: "AvertaStd-Thin", fontSize: 12}}>Service
                                        Fee:
                                        <Text style={{fontWeight: "bold", color: "white"}}>$1.25</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                width: "40%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>

                                <Text style={{
                                    textAlign: "center",
                                    fontSize: 17,
                                    marginStart: 5,
                                    fontFamily: "AvertaStd-RegularItalic",
                                    color: "white"

                                }}>Pay in Store</Text>

                            </View>
                            <TouchableOpacity onPress={()=>{
                                this.props.navigation.navigate('SurgePricingRate');
                            }}   style={{
                                backgroundColor: "red",
                                width: "20%",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{fontSize: 16, color: "white", fontWeight: "bold"}}>Reserve</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </ScrollView>
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
