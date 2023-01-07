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

export type Props = {};

type User = FirebaseAuthTypes.User | null;

export const UserContext = createContext<User>(null);

const App: React.FC<Props> = () => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      setUser(user as FirebaseAuthTypes.User);
    });
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        {user ? (
          <UserContext.Provider value={user}>
            {user.email === "test2@gmail.com" ? ( //auto biker
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
