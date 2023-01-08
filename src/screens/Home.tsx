import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  useToast,
} from "native-base";
import { Pressable } from "react-native";
import { authentication } from "../services/firebase/firebase-config";

export type Props = {};

const Home: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const toast = useToast();

  const attemptSignIn = async () => {
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

    try {
      await signInWithEmailAndPassword(authentication, email, password);
    } catch (e: any) {
      if (e?.code == "auth/invalid-email") {
        toast.show({
          description: "Invalid email!",
        });
      }

      if (
        e?.code == "auth/user-not-found" ||
        e?.code == "auth/wrong-password"
      ) {
        toast.show({
          description: "Invalid identity!",
        });
      }
    }
  };

  return (
    <Center w="100%" h="100%" backgroundColor="white">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome to BikesApp
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl.Label my={-1}>Email</FormControl.Label>
          <Input value={email} onChangeText={setEmail} />
          <FormControl.Label my={-1}>Password</FormControl.Label>
          <Input type="password" value={password} onChangeText={setPassword} />
          <Button mt="2" colorScheme="indigo" onPress={() => attemptSignIn()}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Register" as never)}>
              <Text color="indigo.500">Sign Up</Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Home;
