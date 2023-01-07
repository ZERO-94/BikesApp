import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button } from "react-native";
import { TextInput } from "react-native";
import { authentication } from "../services/firebase/firebase-config";

export type Props = {};

const Home: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const attemptSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      console.log(result);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <View>
      <TextInput
        style={{ margin: 5 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ margin: 5 }}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={() => attemptSignIn()} title={"Sign in"} />
    </View>
  );
};

export default Home;
