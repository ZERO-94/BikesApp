import React from "react";
import { View, Text } from "react-native";
import { FSTripRequest } from "../types/trip";

export type Props = {
  route: never;
};

const RequestDetail: React.FC<Props> = ({ route }) => {
  const { tripData } = route as FSTripRequest;
  return (
    <View>
      <Text>Your current request:</Text>
      <Text>{`From: ${tripData.fromLocation}`}</Text>
      <Text>{`To: ${tripData.toLocation}`}</Text>
      <Text>{`Status: ${tripData.status}`}</Text>
      <Text>{`Booking time: ${tripData.bookingTime}`}</Text>
    </View>
  );
};

export default RequestDetail;
