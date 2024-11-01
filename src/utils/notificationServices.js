import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notificationRedirectionService from './notificationRedirectionService';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');

  console.log('old token 1 ====> ', fcmToken);

  if (!fcmToken) {
    try {
      const token = await messaging().getToken();

      console.log('new token ====> ', token);

      await AsyncStorage.setItem('fcmToken', token);
    } catch (error) {
      console.log('error ====> ', error);
    }
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state',
      remoteMessage.notification,
    );

    if(!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "VideoPlayer"){
      setTimeout(() => {
        notificationRedirectionService.navigate('VideoPlayer', {data : remoteMessage?.data});
      }, 300)
    }
    
    //onDisplayNotification(remoteMessage);
  });

  messaging().onMessage(async remoteMessage => {
    console.log('recieved in foreground', remoteMessage);
    const {notification, messageId} = remoteMessage;

    if (Platform.OS == 'ios') {
      PushNotificationIOS.addNotificationRequest({
        id: messageId,
        body: notification.body,
        title: notification.title,
        sound: 'default',
      });
    } else {
      PushNotification.localNotification({
        channelId: 'your-channel-id',
        id: messageId,
        body: notification.body,
        title: notification.title,
        soundName: 'default',
        vibrate: true,
        playSound: true,
        //largeIcon: "ic_stat_onesignal_default", 
        //smallIcon : "ic_stat_onesignal_default"
      });
    }
    //onDisplayNotification(remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state',
          remoteMessage.notification,
        );
        //onDisplayNotification(remoteMessage);
      }
    });
};
