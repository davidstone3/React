import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import Routing from './routing';
import NotificationPopup from 'react-native-push-notification-popup';
import firebase from 'react-native-firebase';

StatusBar.setHidden(false);
StatusBar.setBarStyle('light-content');

class App extends Component {
    componentDidMount(): void {
        /*setTimeout(() => {
            //this.setState({splashScreen: false});
            // Alert.alert("hello");
            this.showAlert("CLYPR", "Testing message from App");
        }, 5000);*/
        this.createNotificationListeners();
    }

    //Remove listeners allocated in createNotificationListeners()
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            this.showAlert(title, body);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            this.showAlert(title, body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });
    }

    showAlert(title, body) {
        this.popup.show({
            onPress: function () {
                console.log('Pressed --->notification')
            },
            appIconSource: require('./assets/images/appleblack.png'),
            appTitle: title,
            timeText: 'Now',
            title: 'New Booking',
            body: body,
            slideOutTime: 5000
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Routing/>
                <NotificationPopup ref={ref => this.popup = ref} style={{zIndex: 999}}/>
            </View>)
    }
}

export default App;
