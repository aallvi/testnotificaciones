import React from 'react'
import { View, Button,Text } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {


   const onDisplayRemoteNotification = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      await  messaging()
        .getToken()
        .then((fcmToken) => {
          console.log('FCM Token -> ', fcmToken);
        });
    } else console.log('Not Authorization status:', authStatus);
      
    


   }

    const  onDisplayLocalNotification = async() => {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
  
      // Display a notification
      await notifee.displayNotification({
        title: 'Notification ALvi',
        body: 'Main body content of the notification',
        android: {
          channelId,
           // optional, defaults to 'ic_launcher'.
        },
      });
    }


  return (
    <>

    <View>
      <Button title="Display Notification" onPress={() => onDisplayLocalNotification()} />
    </View>



    <View>


      <Button title="Display Remote Notification" onPress={() => onDisplayRemoteNotification()} />
    </View>
    </>
  )
}


export default App