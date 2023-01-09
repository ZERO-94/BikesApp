import React from "react";
import { View, Text } from "react-native";
import { FSTripRequest } from "../types/trip";
import { ScreenComponent } from "@react-navigation";

export type Props = {
  tripData: FSTripRequest;
};

const RequestDetailScreen: ScreenComponent<Props> = (
  tripData: FSTripRequest
) => {
  const data = tripData.route.params;

  return (
    <View>
      <Text>Your current request:</Text>
      <Text>{`From: ${data.fromLocation}`}</Text>
      <Text>{`To: ${data.toLocation}`}</Text>
      <Text>{`Status: ${data.status}`}</Text>
      <Text>{`Booking time: ${data.bookingTime}`}</Text>
    </View>
  );
};

export default RequestDetailScreen;
