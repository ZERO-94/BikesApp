import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { registerUser } from "../services/firebase/firestore/userStore/userStore.operations";
import { authentication } from "../services/firebase/firebase-config";
import SelectDropdown from "react-native-select-dropdown";

export type Props = {};

const roleList = [
  {
    label: "Biker",
    value: "biker",
  },
  {
    label: "User",
    value: "user",
  },
];

const attemptRegister = async (
  email: string,
  password: string,
  role: string
) => {
  try {
    console.log(role);
    if (role == null) {
      console.log("invalid role");
      return;
    }
    const result = await createUserWithEmailAndPassword(
      authentication,
      email,
      password
    );
    console.log(result);
    await registerUser({ email: result.user.email as string, role });
  } catch (e: any) {
    console.log(e);
  }
};

const RegisterScreen: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roleList[0].value);

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
      <SelectDropdown
        data={roleList.map(({ value }) => value as any)}
        onSelect={(item) => setRole(item)}
        onChangeSearchInputText={() => {}}
        defaultValue={roleList[0].value}
      />
      <Button
        onPress={() => attemptRegister(email, password, role)}
        title={"Register"}
      />
    </View>
  );
};

export default RegisterScreen;
