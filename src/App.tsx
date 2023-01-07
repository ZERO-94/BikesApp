import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "../src/routes/HomeStack";
import React, { useCallback, useEffect, useState, createContext } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import "expo-dev-client";
import { authentication } from "./services/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import * as FirebaseAuthTypes from "@firebase/auth-types";
import BikerStack from "./routes/BikerStack";
import UserStack from "./routes/UserStack";
import {
  FSUser,
  getUser,
} from "./services/firebase/firestore/userStore/userStore.operations";

export type Props = {};

type User = FirebaseAuthTypes.User | null;

export const UserContext = createContext<FSUser | null>(null);

const App: React.FC<Props> = () => {
  const [user, setUser] = useState<FSUser | null>(null);

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

  console.log(user);

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

export default App;
