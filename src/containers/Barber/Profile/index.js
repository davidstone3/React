import React, {Component} from "react";
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, Linking,
} from "react-native";
import Header from "../../../components/Header";
import {ScrollView} from "react-native-gesture-handler";
import colors from "../../../themes/colors";
import CheckBoxSquare from "../../../components/CheckBox";
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";
import {AirbnbRating} from "react-native-elements";
import {SafeAreaView} from "react-navigation";


const {height, width} = Dimensions.get("window");

export default class BarberProfile extends Component {

    rightAction() {
        this.props.navigation.navigate('BarberEditProfile');
    }

    leftAction() {
        this.props.navigation.goBack();
    }

    constructor(props) {
        super(props);
        this.state = {
            barberInsta:"",
            showLoading:false,
            barberName: Preference.get("userName"),
            barberImage: require("../../../assets/images/personImage.jpg"),
            barberShopName: Preference.get("userShopname"),
            barberRating: 0,
            barberReviews: 0,
            ListData:[],
            ListData2:[],
        }
    }

    componentDidMount(): void {
        const {navigation} = this.props;
        this.focusListener = navigation.addListener("didFocus", payload => {
            this.getBarberDetails();
        });
        //this.getBarberDetails();
    }

    getBarberDetails() {
        this.setState({showLoading:true})
        fetch(constants.ClientBarbersProfile + "/" + Preference.get("userId") + "/profile", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getBarberDetails-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading:false})
                    let barberData = response.Data;
                    this.setState({
                        barberInsta: barberData.username,
                        barberName: barberData.firstname,
                        barberShopName: barberData.shop_name,
                        ListData: barberData.portoflios,
                        ListData2: barberData.services,
                        barberRating: barberData.average_Rating,
                        barberReviews: barberData.total_Reviews,
                        barberImage: {uri: barberData.user_image},
                    });
                    let PortfolioImages = this.state.ListData;
                    for (let i = 0; i < PortfolioImages.length; i++) {
                        console.log("ImagesDataURl", PortfolioImages[i].portfolio_image);
                        PortfolioImages[i].portfolio_image = constants.portfolioImagePath + PortfolioImages[i].portfolio_image;
                    }
                    this.setState({ListData: PortfolioImages})
                    //this.setState({barberData: response.Data});
                } else {
                    this.setState({showLoading:false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            this.setState({showLoading:false})
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }



    render() {
        return (<View style={{width:"100%",height:"100%", backgroundColor: colors.themeBackground}}>
            <ScrollView>
                <View style={styles.container}>
                    <Header
                        rightAction={this.rightAction.bind(this)}
                        leftAction={this.leftAction.bind(this)}
                        bgIcon={require("../../../assets/images/bannerprofile.png")}
                        rightIcon={require("../../../assets/images/ic_navbar_edit.png")}
                        leftIcon={require("../../../assets/images/ic_back.png")}/>
                    <View style={styles.detailsContainer}>
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={this.state.barberImage}
                                style={styles.profileImage}
                            >
                            </Image>
                        </View>

                        <TouchableOpacity onPress={() =>{
                            Linking.openURL('https://www.instagram.com/' + this.state.barberInsta)
                        }} style={{position: 'absolute', top: 10, right: width / 2 - width / 2.7 / 2}}>
                            <Image source={require("../../../assets/images/insta.png")}
                                style={styles.icon}/>
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
                                    <AirbnbRating
                                        showRating={false}
                                        count={5}
                                        defaultRating={this.state.barberRating}
                                        size={10}
                                        style={{marginStart: 10, height: 30}}
                                    />
                                   {/* <Image
                                        resizeMode="contain"
                                        source={require("../../../assets/images/start.png")}
                                        style={styles.rating}
                                    />*/}
                                    <Text style={[styles.allFontStyle, styles.reviewText]}>
                                        {"("}{this.state.barberReviews}{" Reviews)"}
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
                        flexDirection: "row",
                        alignItems:"center",
                    }]}>

                        {(this.state.ListData.length>0) &&<FlatList
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
                                           source={{uri:item.portfolio_image}}/>
                                </View>}
                        />}
                        {(this.state.ListData.length<1) &&<View style={{width:"100%",height:60,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{fontSize:15,color:"white"}}>{"You don't have any Experience Images"}</Text>
                        </View>}
                        {(this.state.ListData.length>0) && <Image resizeMode={"contain"} source={require("../../../assets/images/arrow1.png")}
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
                                <View style={{width: 3, height: "100%", marginStart: 10, backgroundColor: "#686975"}}/>
                            </View>
                            <View style={[{width: "25%", right: 5, flexDirection: "row"}]}>
                                <View style={{width: 1, height: "100%", backgroundColor: "#686975"}}/>
                                <Text style={{color: "white", fontSize: 12}}>Prizes </Text>
                            </View>
                        </View>

                        {this.state.ListData2.length>0 && <FlatList
                            data={this.state.ListData2}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={true}
                            removeClippedSubviews={false}
                            initialNumToRender={5}
                            numColumns={1}
                            style={{
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12, paddingBottom: 12, backgroundColor: "#686975"
                            }}
                            renderItem={({item}) =>
                                <View style={{flexDirection: "column"}}>
                                    <View style={[{flexDirection: "row", height: 30, backgroundColor: "#686975"}]}>
                                        <View style={[{
                                            flexDirection: "row",
                                            width: "50%",
                                            marginStart: 10,
                                            alignItems: "center"
                                        }]}>
                                            {false &&
                                            <CheckBoxSquare isChecked={item.check} uncheckedCheckBoxColor={"#84858C"}/>}
                                            <Text style={{color: "white", fontSize: 12}}>   {item.name} </Text>
                                        </View>
                                        <View style={[{flexDirection: "row", width: "25%", alignItems: "center"}]}>
                                            <Text style={{color: "white", fontSize: 12}}>{item.duration+" min"}</Text>
                                        </View>
                                        <View style={[{flexDirection: "row", width: "25%", alignItems: "center"}]}>
                                            <Text style={{color: "white", fontSize: 12}}>{"$"+item.price}</Text>
                                        </View>
                                    </View>
                                    <View style={{height: 0.5, backgroundColor: "#868791"}}/>
                                </View>}
                        />}

                        {this.state.ListData2.length<1 &&<View style={{width:"100%",height:60,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{fontSize:15,color:"white"}}>{"You don't have any Services"}</Text>
                        </View>}
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
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")} style={{width:60,height:60, opacity: 1,}}/>
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
    icon: {height: 50, width: 50,},
    iconContainer: {},
    profileImage: {
        height: width / 3,
        width: width / 3,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderRadius: (width / 3)/2,
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
    rating: {height: 30, width: width / 4}
});
