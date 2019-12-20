import React, {Component} from "react";
import {View, Text, FlatList, Image, TouchableOpacity} from "react-native";

import {Header, AirbnbRating} from "react-native-elements";
import {globalStyles} from "../../../themes/globalStyles";
import {Colors} from "../../../themes";

//import { globalStyles } from "../../../themes/globalStyles";
import {Dimensions} from "react-native";
import {constants} from "../../../utils/constants";

const {width} = Dimensions.get("window");
let ratings = Math.floor(Math.random() * 5 + 1);
let barberId = "";
export default class ClientSupremeReview extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        barberId = navigation.getParam('barberId');
        this.state = {
            showLoading: false,
            reviews: [],
            supremeReviewBlock: false,
            mainRating: 0,
        };
    }

    componentDidMount(): void {
        this.getRattingofBarber()
    }

    getRattingofBarber() {
        this.setState({showLoading: true})
        fetch(constants.GetReviews + "?barber_id=" + barberId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => response.json())
            .then(response => {
                console.log("ClientBarbersReviews-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false, reviews: response.Data});
                    console.log("dataSource:::", JSON.stringify(response.Data))
                    let ratingpoints = 0;
                    for (let w = 0; w < response.Data.length; w++) {
                        ratingpoints = ratingpoints + response.Data[w].rating;
                    }
                    let mian = ratingpoints / response.Data.length;
                    this.setState({mainRating: mian})

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


    renderItem(item) {
        let ratings = Math.floor(Math.random() * 5 + 1);
        let userImage = "http://ec2-3-14-204-57.us-east-2.compute.amazonaws.com:5000/images/client/" + item.client_id.client_image;
        console.log("Imageuser-->", userImage);
        return (
            <View style={styles.row_item}>
                <View style={[globalStyles.rowBackground, {marginTop: 40}]}>
                    <Text style={styles.client_name}>{item.client_id.firstname + " " + item.client_id.lastname}</Text>
                    <View style={styles.rating_container}>
                        <AirbnbRating
                            showRating={false}
                            count={5}
                            defaultRating={item.rating}
                            size={10}
                        />
                        <Text style={styles.rating_text}>{item.rating} of 5.0</Text>
                    </View>
                    <Text style={styles.comments}>
                        {item.review_text}
                    </Text>
                </View>
                <Image
                    source={{uri: userImage}}
                    style={styles.thumbnail}
                />
            </View>
        );
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
                            }}
                        >
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
                    centerComponent={{text: "REVIEWS", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10}}>
                    <Text style={{color: "white", fontWeight: "bold"}}>CLYPR Rating</Text>
                </View>
                <View style={{justifyContent: "center", marginTop: 5, marginBottom: 20}}>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <AirbnbRating
                            showRating={false}
                            count={5}
                            defaultRating={this.state.mainRating}
                            size={18}
                        />
                        <Text style={[styles.rating_text, {fontSize: 16}]}>({this.state.mainRating} of 5.0)</Text>
                    </View>
                </View>

                {this.state.supremeReviewBlock && <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginStart: 20,
                    marginEnd: 20,
                }}>
                    <View style={{
                        flexDirection: "column",
                        width: "50%",
                        marginEnd: 4,
                    }}>
                        <TouchableOpacity>
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
                                       source={require("../../../assets/images/blend.png")}/>
                                <Text style={{
                                    color: "white", marginStart: 5,
                                    marginEnd: 30, fontSize: 12
                                }}>Blend Quality</Text>
                                <View style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 13,
                                    position: "absolute",
                                    right: 0,
                                    top: -10,
                                    backgroundColor: "#1CCCFF",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{color: "white", fontSize: 10, fontWeight: "bold"}}>{"3"}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{
                                flexDirection: "row",
                                backgroundColor: "#474857",
                                width: "100%",
                                height: 40,
                                marginTop: 7,
                                marginBottom: 10,
                                borderRadius: 20,
                                borderWidth: 0.5,
                                borderColor: "grey",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Image style={{height: 20, width: 20, marginStart: 20}} resizeMode={"contain"}
                                       source={require("../../../assets/images/scissor.png")}/>
                                <Text style={{
                                    color: "white", marginStart: 5,
                                    marginEnd: 30, fontSize: 12
                                }}>Scissor Technique</Text>
                                <View style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 13,
                                    position: "absolute",
                                    right: 0,
                                    top: -10,
                                    backgroundColor: "#1CCCFF",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{color: "white", fontSize: 10, fontWeight: "bold"}}>{"3"}</Text>
                                </View>
                            </View></TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: "column",
                        width: "50%",
                        marginEnd: 2, marginStart: 10
                    }}>
                        <TouchableOpacity>
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
                                <Image style={{height: 20, width: 20, marginStart: 15}} resizeMode={"contain"}
                                       source={require("../../../assets/images/shapeblade.png")}/>
                                <Text style={{
                                    color: "white", marginStart: 5,
                                    marginEnd: 30, fontSize: 12
                                }}>Shape Up Ability</Text>
                                <View style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 13,
                                    position: "absolute",
                                    right: 0,
                                    top: -10,
                                    backgroundColor: "#1CCCFF",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{color: "white", fontSize: 10, fontWeight: "bold"}}>{"5"}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
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
                                alignItems: "center", marginTop: 7
                            }}>

                                <Image style={{height: 20, width: 20, marginStart: 15}} resizeMode={"contain"}
                                       source={require("../../../assets/images/hair.png")}/>
                                <Text style={{
                                    color: "white", marginStart: 5,
                                    marginEnd: 30, fontSize: 12

                                }}>Combover Skills</Text>
                                <View style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 13,
                                    position: "absolute",
                                    right: 0,
                                    top: -10,
                                    backgroundColor: "#1CCCFF",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{color: "white", fontSize: 10, fontWeight: "bold"}}>{"5"}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}

                {(this.state.reviews.length > 0) && <FlatList
                    data={this.state.reviews}
                    extraData={this.state}
                    renderItem={({item}) => this.renderItem(item)}
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                />}

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

export const styles = {
    tip_price_container: {
        backgroundColor: Colors.border,
        marginTop: 8,
        width: 80,
        height: 24,
        borderWidth: 0.5,
        borderColor: Colors.border,
        borderRadius: 12
    },
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: Colors.themeBackground
    },
    MainContainer: {
        justifyContent: "center",
        flex: 1,
        paddingTop: 30
    },
    avatar_container: {
        alignSelf: "center",
        marginLeft: 10,
        height: 60,
        width: 60
    },
    row_item: {
        height: 130,
        marginTop: 10
    },
    thumbnail: {
        position: "absolute",
        left: 22,
        top: 12,
        resizeMode: "cover",
        borderRadius: 6,
        borderWidth: 0,
        borderColor: "transparent",
        alignSelf: "center",
        height: 66,
        width: 86
    },
    client_name: {
        marginLeft: 110,
        marginTop: 5,
        fontSize: 16,
        color: Colors.white
    },
    ratings: {},
    rating_container: {
        flexDirection: "row",
        height: 20,
        justifyContent: "center",
        position: "absolute",
        top: 4,
        right: 6
    },
    rating_text: {
        color: Colors.lightGrey,
        marginLeft: 4,
        alignSelf: "center",
        fontSize: 10
    },
    comments: {
        position: "absolute",
        top: 48,
        color: Colors.white,
        left: 10,
        right: 2,
        fontSize: 12,
        bottom: 0
    }
};
