import React from "react";
import {StyleSheet, Image} from "react-native";

import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import {
    SelectScreen,
    ConfirmSMSScreen,
    InitialScreen,
    SignInScreen,
    SignUpScreen,
    SMSScreen,
    ForgetPasswordScreen
} from './containers';

import Home from "./containers/Home";
import Calendar from "./containers/Barber/Calendar";
import ChooseTimings from "./containers/Barber/ChooseTimings";
import Reviews from "./containers/Barber/Reviews";
import Settings from "./containers/Settings";
import Profile from "./containers/Barber/Profile";
import QRCheckIn from "./containers/Barber/QRCheckIn";
import Cancellations from "./containers/Settings/Cancellations";
import BookingPreferences from "./containers/Settings/BookingPreferences";
import ClientQR from "./containers/Settings/ClientQR";
import Receipt from "./containers/Settings/Receipt";
import DiscoverMe from "./containers/Settings/DiscoverMe";
import SurgePricing from "./containers/Settings/SurgePricing";
import MobilePay from "./containers/Settings/MobilePay";
import MobilePaySettings from "./containers/Settings/MobilePay/MobilePaySettings"
import Appointments from "./containers/Barber/Appointments"
import SurgePricingRate from "./containers/Settings/SurgePricing/SurgePricingRate"
import PaymentMethod from "./containers/Settings/MobilePay/PaymentMethod"
import PaymentMethodClient from "./containers/Settings/MobilePay/PaymentMethodClient"
import BarberEditProfile from "./containers/Barber/Profile/BarberEditProfile"
import Subscription from "./containers/Settings/Subscription"
import ClientBlast from "./containers/Settings/ClientBlast"
import ClientHome from "./containers/Home/Clients"
import ClientBarberProfile from "./containers/Home/Clients/ClientBarberProfile"
import ClientSettings from "./containers/Settings/ClientSettings"
import ClientEditProfile from "./containers/Home/Clients/ClientEditProfile"
import ClientLeaveReview from "./containers/Home/Clients/ClientLeaveReview"
import ClientSupremeReview from "./containers/Home/Clients/ClientSupremeReview"
import ReceiptCancelled from "./containers/Settings/Receipt/ReceiptCancelled"
import ClientBarberSearch from "./containers/Home/Clients/ClientBarberSearch"
import ClientFilter from "./containers/Home/Clients/ClientFilter"
import ClientHaircuts from "./containers/Home/Clients/ClientHaircuts"
import Share from "./containers/Settings/Share Screen/index";
import SplashScreen from "./containers/AuthScreens/SplashScreen";


import colors from "./themes/colors";

const TabNavigator = createBottomTabNavigator(
    {
        Calendar: {
            screen: Calendar,
            navigationOptions: {
                tabBarLabel: "Calendar"
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: "Home"
            }
        },
        Reviews: {
            screen: Reviews,
            navigationOptions: {
                tabBarLabel: "Reviews"
            },
            headerTitleStyle: {
                fontWeight: "bold",
                color: "#fff",
            },
            headerTintColor: "#fff"
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                tabBarLabel: "Settings"
            },
        }
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;

                if (routeName === "Calendar") {
                    if (focused) {
                        return <Image source={require('./assets/images/calendar.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/calendagreyr.png')} style={styles.icon}/>
                    }
                } else if (routeName === "Home") {
                    if (focused) {
                        return <Image source={require('./assets/images/home.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/homgreye.png')} style={styles.icon}/>
                    }
                } else if (routeName === "Reviews") {
                    if (focused) {
                        return <Image source={require('./assets/images/reviews.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/reviewgreys.png')} style={styles.icon}/>
                    }
                } else if (routeName === "Settings") {
                    if (focused) {
                        return <Image source={require('./assets/images/settings.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/settingsgrey.png')} style={styles.icon}/>
                    }
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: colors.bottomTabTintColor
        }
    }
);

const ClientTabNavigator = createBottomTabNavigator(
    {
        Calendar: {
            screen: ClientHaircuts,
            navigationOptions: {
                tabBarLabel: "Haircuts"
            }
        },
        Home: {
            screen: ClientHome,
            navigationOptions: {
                tabBarLabel: "Bookings"
            }
        },
        Reviews: {
            screen: ClientBarberSearch,
            navigationOptions: {
                tabBarLabel: "Search"
            },
            headerTitleStyle: {
                fontWeight: "bold",
                color: "#fff",
            },
            headerTintColor: "#fff"
        },
        Settings: {
            screen: ClientSettings,
            navigationOptions: {
                tabBarLabel: "Settings"
            },
        }
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;

                if (routeName === "Calendar") {
                    if (focused) {
                        return <Image source={require('./assets/images/haircut.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/haircutgrey.png')} style={styles.icon}/>
                    }
                } else if (routeName === "Home") {
                    if (focused) {
                        return <Image source={require('./assets/images/booking.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/bookingsgrey.png')} style={styles.icon}/>
                    }
                } else if (routeName === "Reviews") {
                    if (focused) {
                        return <Image source={require('./assets/images/search.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/searchgrey.png')} style={styles.icon}/>
                    }
                } else if (routeName === "Settings") {
                    if (focused) {
                        return <Image source={require('./assets/images/settings.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/settinggreys.png')} style={styles.icon}/>
                    }
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: colors.bottomTabTintColor
        }
    }
);


const AuthStack = createStackNavigator({
    SplashScreen: SplashScreen,
    SelectScreen: SelectScreen,
    ConfirmSMSScreen: ConfirmSMSScreen,
    InitialScreen: InitialScreen,
    SignInScreen: SignInScreen,
    SignUpScreen: SignUpScreen,
    SMSScreen: SMSScreen,
    ForgetPasswordScreen: ForgetPasswordScreen,
    Profile: Profile,
    QRCheckIn: QRCheckIn,
    ClientQR: ClientQR,
    Cancellations: Cancellations,
    BookingPreferences: BookingPreferences,
    Receipt: Receipt,
    ChooseTimings: ChooseTimings,
    TabNavigator: TabNavigator,
    DiscoverMe: DiscoverMe,
    SurgePricing: SurgePricing,
    MobilePay: MobilePay,
    MobilePaySettings: MobilePaySettings,
    Appointments: Appointments,
    SurgePricingRate: SurgePricingRate,
    PaymentMethod: PaymentMethod,
    PaymentMethodClient: PaymentMethodClient,
    BarberEditProfile: BarberEditProfile,
    Subscription: Subscription,
    ClientBlast: ClientBlast,
    Settings: Settings,
    ClientHome: ClientHome,
    ClientTabNavigator: ClientTabNavigator,
    ClientBarberProfile: ClientBarberProfile,
    ClientSettings: ClientSettings,
    ClientEditProfile: ClientEditProfile,
    ClientLeaveReview: ClientLeaveReview,
    ClientSupremeReview: ClientSupremeReview,
    ReceiptCancelled: ReceiptCancelled,
    ClientBarberSearch: ClientBarberSearch,
    ClientFilter: ClientFilter,
    ClientHaircuts: ClientHaircuts,
    Share: Share
}, {
    initialRouteName: 'SplashScreen',
    //initialRouteName: 'TabNavigator',
    //initialRouteName: 'ClientTabNavigator',
    headerMode: 'none'
});

const routing = createSwitchNavigator({
    AuthStack: AuthStack
}, {
    initialRouteName: 'AuthStack',
    headerMode: 'none'
});

export default createAppContainer(AuthStack);

const styles = StyleSheet.create({
    icon: {height: 23, width: 23, justifyContent: "center", alignContent: "center", resizeMode: "contain"}
});

