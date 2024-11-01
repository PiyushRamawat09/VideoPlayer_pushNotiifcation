import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotification from "react-native-push-notification";

const ForegroundHandler = () => {
    useEffect(() => {
        // console.log("fkkkfkffkfkfkfkfkfkkffk")
        // PushNotification.createChannel(
        //     {
        //       channelId: "specialid", // (required)
        //       channelName: "Special messasge", // (required)
             
        //        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        //         vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        //       },
        //       (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        //    )

        const unsubscribe = messaging().onMessage((remoteMessage) => {
            console.log("handle in foreground", remoteMessage)
            const {notification,messageId} = remoteMessage

            if(Platform.OS == 'ios'){
            PushNotificationIOS.addNotificationRequest({
                id: messageId,
                body: notification.body,
                title: notification.title,
                sound: 'default'
            });
        }else {
            PushNotification.localNotification({
                channelId: "your-channel-id",
                id: messageId,
                body: notification.body,
                title: notification.title,
                soundName: 'default',
                vibrate: true,
                playSound: true
            })
        }
        })
        return unsubscribe
    }, [])
    return null
}

export default ForegroundHandler