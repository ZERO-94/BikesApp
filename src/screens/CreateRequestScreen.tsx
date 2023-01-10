import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { registerUser } from "../services/firebase/firestore/userStore/userStore.operations";
import { authentication } from "../services/firebase/firebase-config";
import CreateRequestForm from "../components/CreateRequestForm/CreateRequestForm";
import { Center } from "native-base";

export type Props = {};

const CreateRequestScreen: React.FC<Props> = () => {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
      <Center w="100%" h="90%">
        <CreateRequestForm />
      </Center>
    </View>
  );
};

export default CreateRequestScreen;
