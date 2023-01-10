import React from "react";
import { View, Text, Button } from "react-native";
import { FSTripRequest } from "../types/trip";
import {
  updateTripStatus,
  rejectTrip,
} from "../services/firebase/firestore/requestStore/requestStore.operations";
export type Props = {
  navigation: any;
};

const OnGoingTripScreen: React.FC<Props> = (navigation: any) => {
  console.log(navigation.navigation);
  const data = navigation?.route.params as FSTripRequest;

  return (
    <View>
      <Text>Your current request:</Text>
      <Text>{`Request user: ${data.user}`}</Text>
      <Text>{`From: ${data.fromLocation}`}</Text>
      <Text>{`To: ${data.toLocation}`}</Text>
      <Text>{`Booking time: ${data.bookingTime}`}</Text>
      <Button
        title="FINISH TRIP"
        onPress={() => {
          updateTripStatus("FINISHED", data.id);
          navigation.navigation.navigate("BikerScreen");
        }}
      />
    </View>
  );
};

export default OnGoingTripScreen;
