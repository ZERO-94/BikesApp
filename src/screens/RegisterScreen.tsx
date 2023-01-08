import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { registerUser } from "../services/firebase/firestore/userStore/userStore.operations";
import { authentication } from "../services/firebase/firebase-config";
import SelectDropdown from "react-native-select-dropdown";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  useToast,
} from "native-base";

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

const RegisterScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(roleList[0].value);

  const toast = useToast();

  const attemptRegister = async (
    email: string,
    password: string,
    role: string
  ) => {
    try {
      if (email.length <= 0) {
        toast.show({
          description: "Invalid email!",
        });
        return;
      }

      if (password.length <= 0) {
        toast.show({
          description: "Invalid password!",
        });
        return;
      }

      if (role == null) {
        toast.show({
          description: "Invalid role!",
        });
        return;
      }

      if (password != confirmPassword) {
        toast.show({
          description: "Password and confirm password should be similar!",
        });
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
      if (e?.code == "auth/invalid-email") {
        toast.show({
          description: "Invalid email!",
        });
      }

      if (e?.code == "auth/weak-password") {
        toast.show({
          description: "Weak password!",
        });
      }

      if (e?.code == "auth/email-already-in-use") {
        toast.show({
          description: "User is already existed!",
        });
      }

      console.log(JSON.stringify(e));
    }
  };

  return (
    <Center w="100%" h="100%" backgroundColor="white">
      <Box safeArea p="2" w="100%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome to BikesApp
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl.Label my={-1}>Email</FormControl.Label>
          <Input value={email} onChangeText={setEmail} />
          <FormControl.Label my={-1}>Password</FormControl.Label>
          <Input type="password" value={password} onChangeText={setPassword} />
          <FormControl.Label my={-1}>Confirm Password</FormControl.Label>
          <Input
            type="password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <FormControl.Label my={-1}>Role</FormControl.Label>
          <SelectDropdown
            buttonStyle={{ width: "100%", height: 36, borderRadius: 5 }}
            data={roleList.map(({ value }) => value as any)}
            onSelect={(item) => setRole(item)}
            onChangeSearchInputText={() => {}}
            defaultValue={roleList[0].value}
          />
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => attemptRegister(email, password, role)}
          >
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default RegisterScreen;
