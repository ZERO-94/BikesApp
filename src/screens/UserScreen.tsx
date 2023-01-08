import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { UserContext } from "../App";
import {
  FSRequest,
  getUserCurrentRequest,
} from "../services/firebase/firestore/requestStore/requestStore.operations";
import { authentication } from "../services/firebase/firebase-config";
import RequestDetail from "../components/RequestDetail/RequestDetail";

export type Props = {};

const UserScreen: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [currentRequest, setCurrentRequest] = useState<FSRequest | null>(null);

  useEffect(() => {
    getUserCurrentRequest(user?.email as string).then((res) =>
      setCurrentRequest(res)
    );

    const willFocusSubscription = navigation.addListener("focus", () => {
      getUserCurrentRequest(user?.email as string).then((res) =>
        setCurrentRequest(res)
      );
    });

    return willFocusSubscription;
  }, []);

  console.log(currentRequest);

  return (
    <View>
      <Text>User screen</Text>
      {currentRequest ? (
        <RequestDetail data={currentRequest} />
      ) : (
        <Button
          title="Trip list"
          onPress={() => navigation.navigate("BikerRequestListScreen" as never)}
        />
      )}
      <Button title="Logout" onPress={() => signOut(authentication)} />
    </View>
  );
};

export default UserScreen;
