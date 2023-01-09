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
import { createNotificationConnection } from "./services/firebase/firestore/notificationConnectionStore/notificationConnectionStore.operations";
import { withExpoSnack } from "nativewind";
import * as Notifications from "expo-notifications";
import registerForPushNotificationsAsync from "./services/notificationService/registerForPushNotifcation";

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
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token as string);
    });
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
            registerForPushNotificationsAsync()
              .then((token) => {
                createNotificationConnection({
                  owner: user?.email as string,
                  updatedAt: new Date(Date.now()).toUTCString(),
                  token: token as string,
                }).catch((e) => {
                  console.log(e);
                });
              })
              .finally(() => {
                setUser(res);
              });
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
