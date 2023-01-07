import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Button } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { authentication } from "../services/firebase/firebase-config";

export type Props = {};

const BikerScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Biker screen</Text>
      <Button title="Logout" onPress={() => signOut(authentication)} />
    </View>
  );
};

export default BikerScreen;
