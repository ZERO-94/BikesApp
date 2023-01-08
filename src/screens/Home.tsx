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
import { styled } from "nativewind";

export type Props = {};

const StyledTextInput = styled(TextInput);

const Home: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

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
      <StyledTextInput
        className="my-5"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <StyledTextInput
        className="my-5"
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={() => attemptSignIn()} title={"Sign in"} />
      <Button
        onPress={() => navigation.navigate("Register" as never)}
        title={"Register now!"}
      />
    </View>
  );
};

export default Home;
