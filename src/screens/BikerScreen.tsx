import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Button } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { authentication } from "../services/firebase/firebase-config";
import { useNavigation } from "@react-navigation/native";

export type Props = {};

const BikerScreen: React.FC<Props> = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Biker screen</Text>
      <Button
        title="Create trip"
        onPress={() => navigation.navigate("CreateRequestScreen" as never)}
      />
      <Button
        title="My requested trip"
        onPress={() => navigation.navigate("MyRequestListScreen" as never)}
      />
      <Button
        title="My accepted trip"
        onPress={() =>
          navigation.navigate("AcceptedRequestListScreen" as never)
        }
      />
      <Button title="Logout" onPress={() => signOut(authentication)} />
    </View>
  );
};

export default BikerScreen;
