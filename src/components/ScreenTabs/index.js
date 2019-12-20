import React, {Component} from "react";
import {
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Animated,
    Image,
    StyleSheet
} from "react-native";

const {width, height} = Dimensions.get("window");
export default class ScreenTabs extends Component {
    constructor() {
        super();
        this.state = {
            getViewIndex: 0
        };
        this.tintPosition = new Animated.Value(0);
    }

    animateTabUnderline(i) {
        Animated.timing(this.tintPosition, {
            toValue: i,
            duration: 100
        }).start();
    }

    handler(index) {
        this.flatlistRef.scrollToIndex({animated: true, index});
    }

    changeIndex = event => {
        this.animateTabUnderline(event.viewableItems[0].index);
        this.setState({getViewIndex: event.viewableItems[0].index});
    };

    render() {
        let {getViewIndex} = this.state;
        const {data} = this.props;
        const TabWidth = width / 3;
        const tintPosition = this.tintPosition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, TabWidth, TabWidth * 2]
        });
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        height: 5,
                        width: TabWidth,
                        top: 96,
                        alignItems: "center",
                        zIndex: 20,
                        position: "absolute",
                        left: tintPosition
                    }}
                >
                    {getViewIndex == 0 && <View style={styles.tabIndicator}/>}
                    {getViewIndex == 1 && <View style={styles.tabIndicator1}/>}
                    {getViewIndex == 2 && <View style={styles.tabIndicator2}/>}
                </Animated.View>

                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => this.handler(0)}
                        style={{height: "100%", width: TabWidth}}>
                        <View style={styles.iconContainer}>
                            {getViewIndex == 0 && <Image
                                source={require("../../assets/images/revenue.png")}
                                style={styles.icon}/>}
                            {!getViewIndex == 0 && <Image
                                source={require("../../assets/images/revenue_grey.png")}
                                style={styles.icon}
                            />}
                            <Text style={{
                                color: getViewIndex == 0 ? "green" : "#535361"
                            }}>Revenue
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => this.handler(1)}
                        style={{height: "100%", width: TabWidth}}>
                        <View style={styles.iconContainer}>
                            {getViewIndex == 1 && <Image
                                source={require("../../assets/images/client_green.png")}
                                style={styles.icon}
                            />}
                            {!(getViewIndex == 1) && <Image
                                source={require("../../assets/images/clientgrey.png")}
                                style={styles.icon}
                            />}
                            <Text style={{color: getViewIndex == 1 ? "green" : "#535361"}}>
                                Clients
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={() => this.handler(2)}
                        style={{height: "100%", width: TabWidth}}
                    >
                        <View style={styles.iconContainer}>
                            {(getViewIndex == 2 )&& <Image
                                source={require("../../assets/images/notification_green.png")}
                                style={styles.icon}
                            />}
                            {!(getViewIndex == 2 )&& <Image
                                source={require("../../assets/images/notification.png")}
                                style={styles.icon}
                            />}
                            <Text style={{color: getViewIndex == 2 ? "green" : "#535361"}}>
                                Notifications
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={data || []}
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={this.changeIndex}
                    ref={ref => {
                        this.flatlistRef = ref;
                    }}
                    pagingEnabled={true}
                    horizontal={true}
                    style={{}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        const Comp = item;
                        return (
                            <View key={index} style={{width}}>
                                <Comp/>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabIndicator: {
        height: 4,
        width: "70%",
        backgroundColor: "green"
    },
    tabIndicator1: {
        height: 4,
        width: "70%",
        backgroundColor: "green"
    },
    tabIndicator2: {
        height: 4,
        width: "70%",
        backgroundColor: "green"
    },
    tabsContainer: {
        height: 100,
        width: "100%",
        borderBottomWidth: 0.5,
        flexDirection: "row",
        backgroundColor: "transparent"
    },
    iconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        height: 60,
        width: 60,
        borderRadius: 30
    }
});
