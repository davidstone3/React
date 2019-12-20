import React, {Component} from "react";
import {View, Text, FlatList, Image} from "react-native";

import {Header, AirbnbRating} from "react-native-elements";
import {globalStyles} from "../../../themes/globalStyles";
import {Colors} from "../../../themes";

//import { globalStyles } from "../../../themes/globalStyles";
import {styles} from "./styles";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import {SafeAreaView} from "react-navigation";

export default class Reviews extends Component {
    constructor() {
        super();
        this.state = {
            showLoading:false,
            dataSource: {},
            reviews: [],
            AverageRating: "",
        };
        this.getReviews = this.getReviews.bind(this);
    }

    componentDidMount() {
        var that = this;
        let items = Array.apply(null, Array(6)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });
        that.setState({
            dataSource: items
        });
        this.getReviews();

    }

    getReviews() {
        this.setState({showLoading: true})
        fetch(constants.GetReviews + "?barber_id=" + Preference.get("userId"), {
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
                    let ratingpoints=0;
                    for(let w=0;w<response.Data.length;w++)
                    {
                        ratingpoints=ratingpoints+response.Data[w].rating;
                    }
                    let mian=ratingpoints/response.Data.length;
                    this.setState({AverageRating:parseInt(mian)})
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
        let userImage="http://ec2-3-14-204-57.us-east-2.compute.amazonaws.com:5000/images/client/"+item.client_id.client_image;
        console.log("Imageuser-->",userImage);
        return (
            <View style={styles.row_item}>
                <View style={[globalStyles.rowBackground, {marginTop: 40}]}>
                    <Text style={styles.client_name}>{item.client_id.firstname+" "+item.client_id.lastname}</Text>
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
                    source={{uri:userImage}}
                    style={styles.thumbnail}
                />
            </View>
        );
    }

    render() {
        let ratings = Math.floor(this.state.AverageRating);
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    leftComponent={{color: "#fff"}}
                    centerComponent={{text: "REVIEWS", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />

                {(this.state.reviews.length > 0) && <View style={{height: 90, justifyContent: "center"}}>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <AirbnbRating
                            isDisabled={true}
                            showRating={false}
                            count={5}
                            defaultRating={ratings}
                            size={25}
                        />
                        <Text style={[styles.rating_text, {fontSize: 16}]}>({ratings} of 5.0)</Text>
                    </View>
                </View>}
                {(this.state.reviews.length > 0) && <FlatList
                    data={this.state.reviews}
                    renderItem={({item}) => this.renderItem(item)}
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                />}
                {(this.state.reviews.length < 1) &&
                <View style={{marginTop: 30, height: 30, marginStart: 20, marginEnd: 20,alignItems:"center"}}>
                    <Text style={{color:"white",fontSize:20,}}>{"You have no reviews yet!"}</Text>
                </View>}

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
