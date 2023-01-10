import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { FSTripRequest } from "../types/trip";
import { ScreenComponent } from "@react-navigation";
import {
  updateTripStatus,
  rejectTrip,
  requestTrip,
} from "../services/firebase/firestore/requestStore/requestStore.operations";
import { Center, Image, Button, Flex, ScrollView } from "native-base";
import { styled } from "nativewind";
import { UserContext } from "../App";
import sendPushNotification from "../services/notificationService/sendPushNotification";
import { getNotificationConnectionByEmail } from "../services/firebase/firestore/notificationConnectionStore/notificationConnectionStore.operations";

export type Props = {
  navigation: any;
};

const ViewStyled = styled(View);
const TextStyled = styled(Text);

const RequestDetailScreen: ScreenComponent<Props> = (navigation: any) => {
  const user = useContext(UserContext);
  const data = navigation?.route.params as FSTripRequest;
  const [currentStatus, setCurrentStatus] = useState<string>(data.status);

  const attemptSendNotification = async (
    email: string,
    title: string,
    message: string
  ) => {
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

      await sendPushNotification(connection.token, title, message);
    } catch (e: any) {
      console.log(e);
    }
  };

  const buttonType: { [key: string]: any } = {
    WAITING: (
      <Center>
        {user?.role === "user" ? (
          <Button
            borderRadius={50}
            w="80%"
            colorScheme="indigo"
            onPress={() => {
              requestTrip(user?.email, data.id);
              attemptSendNotification(
                data?.biker as string,
                "New request trip!",
                "A user just request you for a trip!"
              );
              navigation.navigation.navigate("UserScreen" as never);
            }}
          >
            REQUEST TRIP
          </Button>
        ) : null}
      </Center>
    ),
    REQUEST: (
      <Center>
        <Button
          mt="4"
          mb="4"
          borderRadius={50}
          w="80%"
          colorScheme="indigo"
          onPress={() => {
            updateTripStatus("ACCEPTED", data.id);
            console.log(data.user);
            attemptSendNotification(
              data.user,
              "Request trip is accepted!",
              "The biker just accepted your request!"
            );
            navigation.navigation.navigate("BikerScreen");
          }}
        >
          ACCEPT
        </Button>
        <Button
          borderRadius={50}
          w="80%"
          variant={"outline"}
          colorScheme="indigo"
          onPress={() => {
            rejectTrip(data.id);
            attemptSendNotification(
              data.user,
              "Request trip is rejected!",
              "The biker just rejected your request!"
            );
            navigation.navigation.navigate("BikerScreen");
          }}
        >
          REJECT
        </Button>
      </Center>
    ),
    ACCEPTED: (
      <Center>
        <Button
          borderRadius={50}
          w="80%"
          colorScheme="indigo"
          onPress={() => {
            updateTripStatus("ONGOING", data.id);
            setCurrentStatus("ONGOING");
          }}
        >
          START TRIP
        </Button>
      </Center>
    ),
    ONGOING: (
      <Center>
        <Button
          borderRadius={50}
          w="80%"
          colorScheme="indigo"
          onPress={() => {
            updateTripStatus("FINISHED", data.id);
            navigation.navigation.navigate("BikerScreen");
          }}
        >
          FINISH TRIP
        </Button>
      </Center>
    ),
  };

  return (
    <ScrollView h="80%">
      <Center>
        <Image
          source={{
            uri: "https://previews.123rf.com/images/sabelskaya/sabelskaya1709/sabelskaya170900824/86226052-vector-flat-cartoon-camping-scene-travelling-road-trip-funny-green-hippie-minivan-car-with-big-bags-.jpg",
          }}
          width={400}
          height={300}
        />
      </Center>
      <ViewStyled className="p-4">
        <Flex backgroundColor="white" p="4" borderRadius={5}>
          <TextStyled className="font-bold text-xl">
            Your current request
          </TextStyled>
          {data.user ? <Text>{`Request user: ${data.user}`}</Text> : null}
          <TextStyled className="mt-1">{`From: ${data.fromLocation}`}</TextStyled>
          <TextStyled className="mt-1">{`To: ${data.toLocation}`}</TextStyled>
          <TextStyled className="mt-1">{`Booking time: ${data.bookingTime}`}</TextStyled>
          <TextStyled className="mt-1 mb-10">{`Status: ${currentStatus}`}</TextStyled>
          {buttonType[currentStatus]}
        </Flex>
      </ViewStyled>
    </ScrollView>
  );
};

export default RequestDetailScreen;
