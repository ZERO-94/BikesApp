import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { registerUser } from "../services/firebase/firestore/userStore/userStore.operations";
import { authentication } from "../services/firebase/firebase-config";
import SelectDropdown from "react-native-select-dropdown";
import sendPushNotification from "../services/notificationService/sendPushNotification";
import { getNotificationConnectionByEmail } from "../services/firebase/firestore/notificationConnectionStore/notificationConnectionStore.operations";

export type Props = {};

const attemptSendNotification = async (email: string) => {
  try {
    const connection = await getNotificationConnectionByEmail(email);

    console.log(connection);

    if (connection == null) {
      console.log("invalid email!");
      return;
    }

    if (connection?.token.length <= 0) {
      console.log("invalid token!");
      return;
    }

    await sendPushNotification(connection.token);
  } catch (e: any) {
    console.log(e);
  }
};

const TestNotificationScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState("");

  return (
    <View>
      <TextInput
        style={{ margin: 5 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        onPress={() => attemptSendNotification(email)}
        title={"Register"}
      />
    </View>
  );
};

export default TestNotificationScreen;
