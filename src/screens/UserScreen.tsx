import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserContext } from "../App";
import { authentication } from "../services/firebase/firebase-config";

export type Props = {};

const UserScreen: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View>
      <Text>User screen</Text>
      <Button
        title="Trip list"
        onPress={() => navigation.navigate("BikerRequestListScreen" as never)}
      />
      <Button title="Logout" onPress={() => signOut(authentication)} />
    </View>
  );
};

export default UserScreen;
