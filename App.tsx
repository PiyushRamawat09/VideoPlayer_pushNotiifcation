import React, {useEffect} from 'react';
import VideoPlayer from './src/components/VideoPlayer';
import {
  requestUserPermission,
  notificationListener,
} from './src/utils/notificationServices';
import {PermissionsAndroid, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import notificationRedirectionService from './src/utils/notificationRedirectionService';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = () => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(res => {
        console.log('res ===> ', res);
        if (!!res && res == 'granted') {
          requestUserPermission();
          notificationListener();
        }
      });
    }
  };

  return (
    <NavigationContainer
      ref={ref => notificationRedirectionService.setTopLevelNavigator(ref)}>
      <Stack.Navigator>
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
