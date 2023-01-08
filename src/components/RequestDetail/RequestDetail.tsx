import React from "react";
import { View, Text } from "react-native";
import { FSTripRequest } from "../../types/trip";

export type Props = {
  data: FSTripRequest;
};

const RequestDetail: React.FC<Props> = ({ data }) => {
  return (
    <View>
      <Text>Your current request:</Text>
      <Text>{`From: ${data.toLocation}`}</Text>
      <Text>{`To: ${data.toLocation}`}</Text>
      <Text>{`Status: ${data.status}`}</Text>
      <Text>{`Booking time: ${data.bookingTime}`}</Text>
    </View>
  );
};

export default RequestDetail;
