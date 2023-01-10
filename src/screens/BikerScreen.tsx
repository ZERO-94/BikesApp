import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Text, Pressable } from "react-native";
import { View } from "react-native";
import { Avatar, Box, Center, Flex, Image, Button } from "native-base";
import { authentication } from "../services/firebase/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../App";

export type Props = {};

const BikerScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);

  return (
    <View style={{ paddingHorizontal: 20 }}>
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
              uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            }}
          ></Avatar>
          <Flex justifyContent={"center"} style={{ marginLeft: 14 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Welcome back!
            </Text>
            <Text style={{ fontSize: 12 }}>Prepare for your trip?</Text>
          </Flex>
        </Flex>
        <Center w="44">
          <Pressable onPress={() => signOut(authentication)}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          </Pressable>
        </Center>
      </Flex>

      <Center marginTop={3}>
        <Flex direction="row">
          <Button
            w={"45%"}
            colorScheme="indigo"
            borderRadius={50}
            onPress={() => navigation.navigate("MyRequestListScreen" as never)}
          >
            My requested trip
          </Button>
          <Button
            w={"45%"}
            colorScheme="indigo"
            borderRadius={50}
            marginLeft={3}
            onPress={() =>
              navigation.navigate("AcceptedRequestListScreen" as never)
            }
          >
            My accepted trip
          </Button>
        </Flex>
      </Center>

      <Flex
        marginTop={3}
        borderRadius="10"
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
      >
        <Flex justifyContent={"center"} alignItems="center">
          <Text style={{ fontSize: 18, textAlign: "center", lineHeight: 26 }}>
            Have a free seat on your bike?
          </Text>
        </Flex>
        <Center h="58%" my={3}>
          <Image
            size={200}
            borderRadius={100}
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
            }}
            alt="Alternate Text"
          />
        </Center>
        <Button
          borderRadius={50}
          w="80%"
          colorScheme="indigo"
          onPress={() => navigation.navigate("CreateRequestScreen" as never)}
        >
          Create trip
        </Button>
      </Flex>
    </View>
  );
};

export default BikerScreen;
