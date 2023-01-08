import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { Avatar, Box, Center, Flex } from "native-base";
import React, { useState } from "react";
import { useContext } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { UserContext } from "../App";
import { authentication } from "../services/firebase/firebase-config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type Props = {};

const UserScreen: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Flex
        direction="row"
        justifyContent={"space-between"}
        style={{
          backgroundColor: "white",
          marginTop: 14,
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 50,
        }}
      >
        <Flex direction="row">
          <Avatar
            size={50}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          ></Avatar>
          <Flex justifyContent={"center"} style={{ marginLeft: 14 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Welcome back!
            </Text>
            <Text style={{ fontSize: 12 }}>Hope you have a great day!</Text>
          </Flex>
        </Flex>
        <Center w="44">
          <Pressable onPress={() => signOut(authentication)}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          </Pressable>
        </Center>
      </Flex>
      <Button
        title="Trip list"
        onPress={() => navigation.navigate("BikerRequestListScreen" as never)}
      />
    </View>
  );
};

export default UserScreen;
