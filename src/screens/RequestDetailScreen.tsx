import React, { useState } from "react";
import { View, Text } from "react-native";
import { FSTripRequest } from "../types/trip";
import { ScreenComponent } from "@react-navigation";
import {
  updateTripStatus,
  rejectTrip,
} from "../services/firebase/firestore/requestStore/requestStore.operations";
import { Center, Image, Button } from "native-base";
import { styled } from "nativewind";

export type Props = {
  navigation: any;
};

const ViewStyled = styled(View);
const TextStyled = styled(Text);

const RequestDetailScreen: ScreenComponent<Props> = (navigation: any) => {
  const data = navigation?.route.params as FSTripRequest;
  const [currentStatus, setCurrentStatus] = useState<string>(data.status);

  const buttonType: { [key: string]: any } = {
    REQUEST: (
      <Center>
        <Button
          borderRadius={50}
          w="80%"
          colorScheme="indigo"
          onPress={() => {
            updateTripStatus("ACCEPTED", data.id);
            navigation.navigation.navigate("BikerScreen");
          }}
        >
          ACCEPT
        </Button>
        <Button
          borderRadius={50}
          w="80%"
          colorScheme="indigo"
          onPress={() => {
            rejectTrip(data.id);
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
    <View>
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
        <TextStyled className="font-bold text-xl">
          Your current request
        </TextStyled>
        {data.user ? <Text>{`Request user: ${data.user}`}</Text> : null}
        <TextStyled className="mt-1">{`From: ${data.fromLocation}`}</TextStyled>
        <TextStyled className="mt-1">{`To: ${data.toLocation}`}</TextStyled>
        <TextStyled className="mt-1">{`Booking time: ${data.bookingTime}`}</TextStyled>
        <TextStyled className="mt-1 mb-10">{`Status: ${currentStatus}`}</TextStyled>
        {buttonType[currentStatus]}
      </ViewStyled>
    </View>
  );
};

export default RequestDetailScreen;
