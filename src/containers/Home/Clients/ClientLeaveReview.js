import React, {Component} from "react";
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    Image,Alert,
    FlatList,
    TouchableOpacity, TouchableWithoutFeedback, TextInput,

} from "react-native";
import Header from "../../../components/Header/CustomHeader";
import {ScrollView} from "react-native-gesture-handler";
import colors from "../../../themes/colors";
import CheckBoxSquare from "../../../components/CheckBox";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import {AirbnbRating} from "react-native-elements";
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import {SafeAreaView} from "react-navigation";


const {height, width} = Dimensions.get("window");
let ratings = Math.floor(Math.random() * 5 + 1);

let barberId = "", barberImage = "", barberName = "", barberShopName = "",appointmentPrice=0,appointmentId;
export default class ClientLeaveReview extends Component {
    rightAction() {
        this.props.navigation.goBack();
    }


    Selected() {
        if(this.state.goodQuality===false)
        {
            this.setState({unselected: require("../../../assets/images/greenticked.png"),goodQuality:true});
        }else {
            this.setState({unselected: require("../../../assets/images/greentick.png"),goodQuality:false});
        }

    }

    Selected2() {
        if(this.state.cleanliness===false)
        {
            this.setState({unselected2: require("../../../assets/images/greenticked.png"),cleanliness:true});
        }else {
            this.setState({unselected2: require("../../../assets/images/greentick.png"),cleanliness:false});
        }
    }

    Selected3() {
        if(this.state.punctuality===false)
        {
            this.setState({unselected3: require("../../../assets/images/greenticked.png"),punctuality:true});
        }else {
            this.setState({unselected3: require("../../../assets/images/greentick.png"),punctuality:false});
        }
    }

    Selected4() {
        if(this.state.professional===false)
        {
            this.setState({unselected4: require("../../../assets/images/greenticked.png"),professional:true});
        }else {
            this.setState({unselected4: require("../../../assets/images/greentick.png"),professional:false});
        }
    }

    constructor(props) {
        super(props)
        const {navigation} = this.props;
        barberId = navigation.getParam('barber_id');
        barberImage = navigation.getParam('barberImage');
        barberName = navigation.getParam('barberName');
        barberShopName = navigation.getParam('barberShopName');
        appointmentPrice = parseInt(navigation.getParam('appointmentPrice'));
        appointmentId= navigation.getParam('appointmentId');
        this.state = {
            showLoading: false,
            addTip: false,
            DialogVisible: false,
            percentage: "0%",
            rating:0,
            goodQuality:false,
            cleanliness:false,
            punctuality:false,
            professional:false,
            addComment:"",
            percentPrice:appointmentPrice,
            unselected: require("../../../assets/images/greentick.png"),
            unselected2: require("../../../assets/images/greentick.png"),
            unselected3: require("../../../assets/images/greentick.png"),
            unselected4: require("../../../assets/images/greentick.png")
        };

    }

    setAddTip() {
        if (this.state.addTip === false) {
            this.setState({addTip: true});
            this.setPercentage(this.state.percentage)
        }
        else
            this.setState({addTip: false,percentPrice:0})
    }

    addReview() {
        this.setState({showLoading:true});
        var details = {
            barber_id: barberId,
            client_id: Preference.get("userId"),
            rating: this.state.rating,
            good_quality: this.state.goodQuality,
            cleanliness: this.state.cleanliness,
            punctuality: this.state.punctuality,
            professionol: this.state.professional,
            review_text: this.state.addComment,
            add_a_tip: this.state.addTip,
            tip_price: this.state.percentPrice,
            appointment_id:appointmentId,
        };
        console.log("Credentials",JSON.stringify(details));
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.ClientAddReview, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseAddReviews-->", "-" + JSON.stringify(response))

                this.setState({showLoading:false});
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    Alert.alert("Success!","You review saved successfully")
                    this.props.navigation.navigate("ClientTabNavigator");
                } else {
                    this.setState({showLoading: false});
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            })
            .catch(error => {

                this.setState({showLoading:false});
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: " + error);
            });
    }

    ratingCompleted=(rating)=> {
        console.log("Rating is: " + rating);
        this.setState({rating:parseInt(rating)})
    }

    setPercentage(per)
    {
        let percentprice=0;
        this.setState({percentage:per,DialogVisible:false});
        if(per=="10%")
        {
            percentprice=(appointmentPrice*10)/100;
        }
        if(per=="20%")
        {
            percentprice=(appointmentPrice*20)/100;
        }
        if(per=="25%")
        {
            percentprice=(appointmentPrice*25)/100;
        }
        if(per=="50%")
        {
            percentprice=(appointmentPrice*50)/100;
        }
        console.log("PercentPrice---->",percentprice);
        this.setState({percentPrice:percentprice})
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        <Header
                            rightAction={this.rightAction.bind(this)}
                            leftAction={this.rightAction.bind(this)}
                            bgIcon={require("../../../assets/images/Reviewimage.png")}
                            centerComponent={{text: "REVIEW", style: {color: "#fff"}}}
                            leftIcon={require("../../../assets/images/ic_back.png")}/>
                        <View style={styles.detailsContainer}>
                            <View style={styles.profileImageContainer}>
                                <Image
                                    source={barberImage}
                                    style={styles.profileImage}>
                                </Image>
                            </View>

                            <View>
                                <View style={[styles.infoContainer]}>
                                    <Text style={[styles.allFontStyle, styles.name]}>
                                        {barberName}
                                    </Text>
                                    <View style={{flexDirection: "row",}}>
                                        <Image resizeMode={"contain"}
                                               style={{height: 15, width: 15, position: "absolute", top: 10}}
                                               source={require("../../../assets/images/colonstart.png")}/>
                                        <Text style={{
                                            color: colors.white,
                                            fontFamily: 'AvertaStd-Thin',
                                            fontSize: 20,
                                            marginTop: 20,
                                            marginStart: 16,
                                            marginEnd: 17
                                        }}>
                                            {barberShopName}
                                        </Text>
                                        <Image resizeMode={"contain"}
                                               style={{
                                                   height: 15,
                                                   width: 15,
                                                   position: "absolute",
                                                   bottom: -5,
                                                   right: -3
                                               }}
                                               source={require("../../../assets/images/colonend.png")}/>
                                    </View>
                                    <View style={styles.review}>

                                        <AirbnbRating
                                            showRating={false}
                                            count={5}
                                            defaultRating={ratings}
                                            size={20}
                                            onFinishRating={this.ratingCompleted}
                                            style={{marginStart: 10, height: 30}}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",

                            }}>
                                <Text style={{color: "white", marginTop: 20, fontFamily: "AvertaStd-Thin"}}>{" What did "}
                                    {barberName} {"do well?"} </Text></View>
                            <View style={{
                                flexDirection: "row",
                                marginTop: 20,
                                width: "90%",
                                height: 100,
                                justifyContent: "center",
                                alignItems: "center",
                                marginStart: 30,
                                marginEnd: 20
                            }}>
                                <View style={{
                                    flexDirection: "column",
                                    width: "50%",
                                    marginEnd: 10
                                }}>
                                    <TouchableOpacity onPress={() => this.Selected()}>
                                        <View style={{
                                            flexDirection: "row",
                                            backgroundColor: "#474857",
                                            width: "100%",
                                            height: 40,
                                            marginBottom: 10,
                                            borderRadius: 20,
                                            borderWidth: 0.5,
                                            borderColor: "grey",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                                   source={require("../../../assets/images/goodquality.png")}/>
                                            <Text style={{
                                                color: "white", marginStart: 10,
                                                marginEnd: 10,
                                            }}>Good Quality</Text>
                                            <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                                   source={this.state.unselected}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.Selected2()}>
                                        <View style={{
                                            flexDirection: "row",
                                            backgroundColor: "#474857",
                                            width: "100%",
                                            height: 40,
                                            marginBottom: 10,
                                            borderRadius: 20,
                                            borderWidth: 0.5,
                                            borderColor: "grey",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                                   source={require("../../../assets/images/punctuality.png")}/>
                                            <Text style={{
                                                color: "white", marginStart: 10,
                                                marginEnd: 20
                                            }}>Punctuality</Text>
                                            <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                                   source={this.state.unselected2}/>
                                        </View></TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: "column",
                                    width: "50%",
                                    marginEnd: 10
                                }}>
                                    <TouchableOpacity onPress={() => this.Selected3()}>
                                        <View style={{
                                            flexDirection: "row",
                                            backgroundColor: "#474857",
                                            width: "100%",
                                            height: 40,
                                            marginBottom: 10,
                                            borderRadius: 20,
                                            borderWidth: 0.5,
                                            borderColor: "grey",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                                   source={require("../../../assets/images/cleanliness.png")}/>
                                            <Text style={{
                                                color: "white",
                                                marginStart: 10,
                                                marginEnd: 15

                                            }}>Cleanliness</Text>
                                            <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                                   source={this.state.unselected3}/>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.Selected4()}>
                                        <View style={{
                                            flexDirection: "row",
                                            backgroundColor: "#474857",
                                            width: "100%",
                                            height: 40,
                                            marginBottom: 10,
                                            borderRadius: 20,
                                            borderWidth: 0.5,
                                            borderColor: "grey",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>

                                            <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                                   source={require("../../../assets/images/professional.png")}/>
                                            <Text style={{
                                                color: "white", marginStart: 10,
                                                marginEnd: 10
                                            }}>Professional</Text>
                                            <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                                   source={this.state.unselected4}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{
                                marginTop: 20,
                                width: "90%",
                            }}>
                                <View style={{
                                    width: "100%",
                                    height: 50,
                                    borderRadius: 5,
                                    borderWidth: 0.3,
                                    borderColor: "white",
                                    backgroundColor: "#2F3041"
                                }}>
                                </View>

                                <TextInput style={{
                                    fontFamily: "AvertaStd-RegularItalic", width: "100%",
                                    color: "white", position: "absolute", bottom: 0, top: 0, left: 5, fontSize: 14
                                }}
                                           multiline={true}
                                           numberOfLines={4}
                                           onChangeText={(text) => this.setState({addComment:text})}
                                           placeholder={"Add a comment ..."}
                                           placeholderTextColor={"#9C9CA2"}
                                />


                            </View>
                            <View style={{
                                flexDirection: "row",
                                width: "90%",
                                height: 50,

                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",

                            }}>
                                <View style={{flexDirection: "column", width: "60%",}}>
                                    <View style={{flexDirection: "row", marginTop: 10}}>
                                        <CheckBoxSquare rightText={"Add a Tip"} isChecked={this.state.addTip} onClick={() => this.setAddTip()}
                                                        style={{marginTop: 4,width:140}}/>
                                        {/*<Text style={{color: "white", marginStart: 10, fontSize: 15,}}></Text>*/}
                                    </View>
                                    <Text style={{
                                        fontSize: 11,
                                        fontFamily: "AvertaStd-RegularItalic",
                                        marginStart: 20,
                                        color: "grey"
                                    }}>(100% goes to your
                                        barber)</Text>
                                </View>
                                <View style={{flexDirection: "row", width: "40%"}}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginStart: 10
                                    }}>${this.state.percentPrice}</Text>
                                    <TouchableOpacity onPress={() => this.setState({DialogVisible: true})} style={{
                                        flexDirection: "row",
                                        backgroundColor: "#474857",
                                        marginStart: 20,
                                        borderRadius: 20,
                                        height: 25,
                                        width: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 3
                                    }}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 13,
                                            marginStart: 10
                                        }}>{this.state.percentage}</Text>
                                        <Image
                                            resizeMode={"contain"}
                                            style={{
                                                height: 7,
                                                width: 7,
                                                marginStart: 5,
                                                marginEnd: 10
                                            }}
                                            source={require("../../../assets/images/arrow_down.png")}/>
                                    </TouchableOpacity>
                                </View>


                            </View>
                            <TouchableOpacity onPress={() => this.addReview()}
                                              style={[globalStyles.button, {
                                                  height: 35,
                                                  width: 250,
                                                  backgroundColor: "red",
                                                  marginTop: 20,
                                                  marginBottom: 20,
                                              }]}>
                                <Text style={{fontSize: 15, fontWeight: "bold", color: "white"}}>Submit</Text>
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
                            }}>{"Please select Percentage"}</Text>
                            <Text onPress={() =>this.setPercentage("10%")}
                                  style={{fontSize: 18, color: "black", marginBottom: 10, marginTop: 10}}>{"10%"}</Text>
                            <Text onPress={() =>this.setPercentage("20%")}
                                  style={{fontSize: 18, color: "black", marginBottom: 10, marginTop: 10}}>{"20%"}</Text>
                            <Text onPress={() => this.setPercentage("25%")}
                                  style={{fontSize: 18, color: "black", marginBottom: 10, marginTop: 10}}>{"25%"}</Text>
                            <Text onPress={() =>this.setPercentage("50%")}
                                  style={{fontSize: 18, color: "black", marginBottom: 10, marginTop: 10}}>{"50%"}</Text>
                        </DialogContent>
                    </Dialog>
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
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")} style={{width:60,height:60, opacity: 1,}}/>
                </View>}
            </View>
        )
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
        marginBottom: 40,
        bottom: 40

    },
    profileImageContainer: {
        height: width / 2.7,
        width: width / 2.7,

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
        alignItems: "flex-end",
        borderRadius: (width / 3) / 2
    },
    infoContainer: {
        height: 80,
        justifyContent: "space-around",
        width,
        alignItems: "center",
        marginTop: 10,
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
        fontSize: 15,
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
        alignItems: "center",
        marginTop: 15
    },
    reviewText: {
        fontSize: 12,
        color: colors.white
    },
    rating: {height: 50, width: width / 3},
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
