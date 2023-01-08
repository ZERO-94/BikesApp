import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "../src/routes/HomeStack";
import React, { useRef, useEffect, useState, createContext } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import "expo-dev-client";
import { authentication } from "./services/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import BikerStack from "./routes/BikerStack";
import UserStack from "./routes/UserStack";
import {
  FSUser,
  getUser,
} from "./services/firebase/firestore/userStore/userStore.operations";
import { withExpoSnack } from "nativewind";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, Alert } from "react-native";

export type Props = {};

export const UserContext = createContext<FSUser | null>(null);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App: React.FC<Props> = () => {
  const [user, setUser] = useState<FSUser | null>(null);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
  }, []);

  const handleNotification = (notification: any) => {
    setNotification(notification);
  };

  const handleNotificationResponse = (response: any) => {
    console.log(response);
  };

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      console.log(user);
      if (user) {
        getUser(user?.email as string)
          .then((res) => {
            setUser(res);
          })
          .catch((e: any) => {});
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        {user ? (
          <UserContext.Provider value={user}>
            {user.role === "biker" ? ( //auto biker
              <BikerStack />
            ) : (
              <UserStack />
            )}
          </UserContext.Provider>
        ) : (
          <HomeStack />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default withExpoSnack(App);

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }

  return token;
}
