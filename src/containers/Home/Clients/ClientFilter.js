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
    Switch, TextInput,

} from "react-native";

import {Header, Slider} from "react-native-elements";
import hello from "../../../assets/images/arrow_down.png"
import {Colors} from "../../../themes";
import {styles} from "./styles";
import {globalStyles} from "../../../themes/globalStyles";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Preference from "react-native-preference";
import colors from "../../../themes/colors";


export default class ClientBarberSearch extends Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        let val_latitude = navigation.getParam('latitude');
        let val_longitude = navigation.getParam('longitude');
        let val_filterLocation = navigation.getParam('filterLocation');
        let val_filterDistance= navigation.getParam('filterDistance');
        let val_filterCost = navigation.getParam('filterCost');
        let val_blendQuality = navigation.getParam('blendQuality');
        let val_shapeUpAbility = navigation.getParam('shapeUpAbility');
        let val_scissorTechnique= navigation.getParam('scissorTecnique');
        let val_comboverSkill = navigation.getParam('comboverSkill');
        let val_address = navigation.getParam('address');
        this.state = {
            optionOne: "white",
            optionTwo: "white",
            optionThree: "white",
            CheckBox1: require("../../../assets/images/tic_grey.png"),
            CheckBox2: require("../../../assets/images/tic_grey.png"),
            CheckBox3: require("../../../assets/images/tic_grey.png"),
            value: 0,
            unselected: require("../../../assets/images/greentick.png"),
            unselected2: require("../../../assets/images/greentick.png"),
            unselected3: require("../../../assets/images/greentick.png"),
            unselected4: require("../../../assets/images/greentick.png"),

            Address:val_address,
            latitude:val_latitude,
            longitude:val_longitude,

            filterLocation:val_filterLocation,
            filterDistance:val_filterDistance,
            filterCost:val_filterCost,
            blendQuality:val_blendQuality,
            shapeUpAbility:val_shapeUpAbility,
            scissorTechnique:val_scissorTechnique,
            comboverSkill:val_comboverSkill,
        };

        if(val_blendQuality===0)
            this.setState({unselected: require("../../../assets/images/greentick.png")})
        else
            this.setState({unselected: require("../../../assets/images/greenticked.png")})

        if(val_shapeUpAbility===0)
            this.setState({unselected2: require("../../../assets/images/greentick.png")})
        else
            this.setState({unselected2: require("../../../assets/images/greenticked.png")})


        if(val_scissorTechnique===0)
            this.setState({unselected3: require("../../../assets/images/greentick.png")})
        else
            this.setState({unselected3: require("../../../assets/images/greenticked.png")})

        if(val_comboverSkill===0)
            this.setState({unselected3: require("../../../assets/images/greentick.png")})
        else
            this.setState({unselected3: require("../../../assets/images/greenticked.png")})
    }

    Selected() {
        if (this.state.unselected === require("../../../assets/images/greenticked.png")) {
            this.setState({unselected: require("../../../assets/images/greentick.png"),blendQuality:0})
        } else {
            this.setState({unselected: require("../../../assets/images/greenticked.png"),blendQuality:1})
        }
    }

    Selected2() {
        if (this.state.unselected2 === require("../../../assets/images/greenticked.png")) {
            this.setState({unselected2: require("../../../assets/images/greentick.png"),shapeUpAbility:0})
        } else {

            this.setState({unselected2: require("../../../assets/images/greenticked.png"),shapeUpAbility:1})
        }
    }

    Selected3() {
        if (this.state.unselected3 === require("../../../assets/images/greenticked.png")) {
            this.setState({unselected3: require("../../../assets/images/greentick.png"),scissorTechnique:0})
        } else {

            this.setState({unselected3: require("../../../assets/images/greenticked.png"),scissorTechnique:1})
        }
    }

    Selected4() {
        if (this.state.unselected4 === require("../../../assets/images/greenticked.png")) {
            this.setState({unselected4: require("../../../assets/images/greentick.png"),comboverSkill:0})
        } else {

            this.setState({unselected4: require("../../../assets/images/greenticked.png"),comboverSkill:1})
        }
    }


    checkbox1() {
        if (this.state.CheckBox1 === require("../../../assets/images/tic_green.png")) {
            this.setState({CheckBox1: require("../../../assets/images/tic_grey.png"), optionOne: "white"})
        } else {
            this.setState({CheckBox1: require("../../../assets/images/tic_green.png"), optionOne: "green",filterCost:"5"});
            this.setState({CheckBox2: require("../../../assets/images/tic_grey.png"), optionTwo: "white"});
            this.setState({CheckBox3: require("../../../assets/images/tic_grey.png"), optionThree: "white"});

        }
    }

    checkbox2() {
        if (this.state.CheckBox2 === require("../../../assets/images/tic_green.png")) {
            this.setState({CheckBox2: require("../../../assets/images/tic_grey.png"), optionTwo: "white"})
        } else {
            this.setState({CheckBox2: require("../../../assets/images/tic_green.png"), optionTwo: "green",filterCost:"12.1"});
            this.setState({CheckBox1: require("../../../assets/images/tic_grey.png"), optionOne: "white"});
            this.setState({CheckBox3: require("../../../assets/images/tic_grey.png"), optionThree: "white"});
        }
    }

    checkbox3() {
        if (this.state.CheckBox23 === require("../../../assets/images/tic_green.png")) {
            this.setState({CheckBox3: require("../../../assets/images/tic_grey.png"), optionThree: "white"})
        } else {
            this.setState({CheckBox3: require("../../../assets/images/tic_green.png"), optionThree: "green",filterCost:"20.1"});
            this.setState({CheckBox1: require("../../../assets/images/tic_grey.png"), optionOne: "white"});
            this.setState({CheckBox2: require("../../../assets/images/tic_grey.png"), optionTwo: "white"});
        }
    }


    renderRowInput() {
        return <View style={{width: "100%"}}>
            <View style={{height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Image resizeMode={"contain"} source={require("../../../assets/images/searchicon.png")}
                       style={{
                           width: 16,
                           height: 16,
                       }}/>
                <View style={{marginStart: 7}}>
                    <TextInput
                        style={{
                            color: "white",
                            fontSize: 15,
                            fontFamily: "AvertaStd-RegularItalic",
                        }}
                        onChange={(text) => (text)}
                        placeholder={"Search by Instagram, Name, or Barbershop"}
                        placeholderTextColor={"grey"}
                    />
                </View>

            </View>
        </View>
    }


    renderGooglePlacesInput = () => {
        return (
            <GooglePlacesAutocomplete
                placeholder="Enter City,State or Zip Code"
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='false'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null,) => { // 'details' is provided when fetchDetails = true
                    console.log("GooglePlacesAutocomplete" + JSON.stringify(data));
                    console.log("GooglePlacesAutocomplete" + JSON.stringify(details));
                    this.setState({places: []});
                    this.state.places.push(details);
                    this.setState({places: this.state.places});
                    if (this.state.places.length > 0) {
                        this.setState({Address: this.state.places[0].formatted_address,
                            latitude: this.state.places[0].geometry.location.lat,
                            longitude: this.state.places[0].geometry.location.lng});
                        console.log("GooglePlacesAutocomplete lat ", JSON.stringify(this.state.places[0].geometry.location.lng));
                        console.log("GooglePlacesAutocomplete lng ",  this.state.places[0].geometry.location.lng);
                        //Preference.set("userAddress", this.state.places[0].formatted_address);
                    } else {
                        Preference.set("userAddress", "");
                    }
                    //console.log("hello2" + JSON.stringify(this.state.places[0].formatted_address));
                }}
                getDefaultValue={() => this.state.Address}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyD5YuagFFL0m0IcjCIvbThN25l0m2jMm2w',
                    language: 'en', // language of the results
                    types: '(cities)' // default: 'geocode'
                }}

                styles={{
                    textInput: {
                        backgroundColor: colors.gray,
                        color: 'white'
                    },

                    textInputContainer: {
                        backgroundColor: Colors.gray,
                        borderWidth: 0.5,
                        borderColor: Colors.border,
                        borderRadius: 5,
                        flexDirection: "row",
                        margin: 1
                    },
                    description: {
                        color: "white",
                        backgroundColor: "transparent"
                    },
                    predefinedPlacesDescription: {
                        color: 'red'
                    },
                    poweredContainer: {color: "red"},

                }}
                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                }}
                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: ["name", 'formatted_address']
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderLeftButton={() =>
                    <View style={{justifyContent: "center", alignItems: "center",marginStart:10}}>
                        <Image source={require('../../../assets/images/searchicon.png')}
                               style={{resizeMode: "contain", width: 20, height: 20, marginEnd: 15}}/>
                    </View>
                }
                enablePoweredByContainer={false}
            />
        );
    };

    gotoSearchResult()
    {
        this.props.navigation.state.params.onFilter(
            this.state.filterLocation,
            this.state.filterDistance,
            this.state.filterCost,
            this.state.blendQuality,
            this.state.shapeUpAbility,
            this.state.scissorTecnique,
            this.state.comboverSkill,
            this.state.latitude,
            this.state.longitude,
            this.state.Address);
        this.props.navigation.goBack();
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
                                this.gotoSearchResult()
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
                    centerComponent={{text: "FILTER", style: {color: "#fff"}}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />
                <ScrollView>
                    <View style={{marginBottom:100,}}>
                        <View style={{
                            marginTop: 20,
                            marginStart: 20, marginEnd: 20,
                            backgroundColor: "#474857",
                            borderWidth: 0.5,
                            borderColor: "grey",
                            borderRadius: 6,
                        }}>
                           {/* {this.renderRowInput({})}*/}
                            {this.renderGooglePlacesInput()}
                        </View>
                        <View>
                            <Text style={{
                                color: "white",
                                fontWeight: 'bold',
                                marginStart: 20,
                                marginTop: 20,
                                fontSize: 17
                            }}>{"Distance"} </Text>
                        </View>
                        <View style={{
                            marginTop: 0,
                            marginStart: 20,
                            marginEnd: 20,
                            marginBottom: 20,
                            alignItems: 'stretch',
                            justifyContent: 'center'
                        }}>
                            <Slider
                                value={this.state.filterDistance}
                                onValueChange={value => this.setState({filterDistance:value})}
                                minimumTrackTintColor='red'
                                maximumTrackTintColor="#3D3E4D"
                                minimumValue={1}
                                maximumValue={100000}
                                trackStyle={{height: 2}}
                                thumbStyle={{borderWidth: 0.5, borderColor: "white"}}
                            />
                            <View style={{
                                alignItems: 'stretch',
                                flexDirection: "row"
                            }}>
                                <Text style={{color: "#686F77", fontSize: 10}}>10 MILES</Text>
                                <Text style={{color: "#686F77", marginStart: 45, fontSize: 10}}>25 MILES</Text>
                                <Text style={{color: "#686F77", marginStart: 45, fontSize: 10}}>50 MILES</Text>
                                <Text style={{color: "#686F77", marginStart: 45, fontSize: 10}}>100 MILES</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{
                                color: "white",
                                fontWeight: 'bold',
                                marginStart: 20,
                                marginTop: 20,
                                fontSize: 17

                            }}>{"Cost"} </Text>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginStart: 20,
                            marginEnd: 20,
                            marginBottom: 20,
                            flexDirection: "row",
                        }}>
                            <TouchableOpacity onPress={() => this.checkbox1()}>

                                <Image resizeMode={"contain"} source={this.state.CheckBox1}
                                       style={{width: 20, height: 20}}

                                /></TouchableOpacity>
                            <Text style={{
                                color: this.state.optionOne,
                                marginStart: 10,
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>$</Text>

                            <TouchableOpacity onPress={() => this.checkbox2()}>
                                <Image style={{width: 20, height: 20, marginStart: 100}}
                                       resizeMode={"contain"} source={this.state.CheckBox2}/>
                            </TouchableOpacity>
                            <Text style={{
                                color: this.state.optionTwo,
                                marginStart: 10,
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>$$</Text>

                            <TouchableOpacity onPress={() => this.checkbox3()}>
                                <Image resizeMode={"contain"} source={this.state.CheckBox3}
                                       style={{width: 20, height: 20, marginStart: 85}}/>
                            </TouchableOpacity>
                            <Text style={{
                                color: this.state.optionThree,
                                marginStart: 10,
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>$$$</Text>


                        </View>
                        <View>
                            <Text style={{
                                color: "white",
                                fontWeight: 'bold',
                                marginStart: 20,
                                marginTop: 20,
                                marginBottom: 10,
                                fontSize: 17

                            }}>{"Skill"} </Text>
                        </View>
                        <View style={{
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
                                        alignItems: "center",
                                    }}>
                                        <Image style={{height: 20, width: 20, position: "absolute", top: 10, left: 5}}
                                               resizeMode={"contain"}
                                               source={require("../../../assets/images/blend.png")}/>
                                        <Text style={{color: "white", marginStart: 30, fontSize: 10}}>Blend
                                            Quality</Text>
                                        <Image style={{height: 20, width: 20, position: "absolute", top: 10, right: 5}}
                                               resizeMode={"contain"}
                                               source={this.state.unselected}/>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.Selected2()}>
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
                                        alignItems: "center",
                                    }}>
                                        <Image style={{height: 20, width: 20, position: "absolute", top: 10, left: 5}}
                                               resizeMode={"contain"}
                                               source={require("../../../assets/images/scissor.png")}/>
                                        <Text style={{color: "white", marginStart: 30, fontSize: 10}}>Scissor
                                            Technique</Text>
                                        <Image style={{height: 20, width: 20, position: "absolute", top: 10, right: 5}}
                                               resizeMode={"contain"}
                                               source={this.state.unselected2}/>

                                    </View></TouchableOpacity>
                            </View>

                            <View style={{
                                flexDirection: "column",
                                width: "50%",
                                marginEnd: 2, marginStart: 10
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
                                        alignItems: "center",
                                    }}>
                                        <Image style={{height: 20, width: 20, position: "absolute", top: 10, left: 5}}
                                               resizeMode={"contain"}
                                               source={require("../../../assets/images/shapeblade.png")}/>
                                        <Text style={{color: "white", marginStart: 30, fontSize: 10}}>Shape Up
                                            Ability</Text>
                                        <Image style={{height: 20, width: 20, position: "absolute", top: 10, right: 5}}
                                               resizeMode={"contain"}
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
                                        alignItems: "center", marginTop: 7
                                    }}>

                                        <Image style={{height: 20, width: 20, position: "absolute", top: 10, left: 5}}
                                               resizeMode={"contain"}
                                               source={require("../../../assets/images/hair.png")}/>
                                        <Text style={{color: "white", marginStart: 30, fontSize: 10}}>Combover
                                            Skills</Text>
                                        <Image style={{height: 20, width: 20, position: "absolute", top: 10, right: 5}}
                                               resizeMode={"contain"}
                                               source={this.state.unselected4}/>


                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.gotoSearchResult() } style={[globalStyles.button, {
                        marginTop: 70,
                        height: 40,
                        width: 260,
                        position: "absolute",
                        bottom: 40
                    }]}>
                        <Text style={globalStyles.buttonText}>See Results</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        )
    }


}
