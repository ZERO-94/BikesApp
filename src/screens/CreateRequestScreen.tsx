import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { registerUser } from "../services/firebase/firestore/userStore/userStore.operations";
import { authentication } from "../services/firebase/firebase-config";
import CreateRequestForm from "../components/CreateRequestForm/CreateRequestForm";

export type Props = {};

const CreateRequestScreen: React.FC<Props> = () => {
  return (
    <View>
      <CreateRequestForm />
    </View>
  );
};

export default CreateRequestScreen;
