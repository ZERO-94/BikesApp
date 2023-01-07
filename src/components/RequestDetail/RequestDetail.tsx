import React from "react";
import { View, Text } from "react-native";
import { FSRequest } from "../../services/firebase/firestore/requestStore/requestStore.operations";

export type Props = {
  data: FSRequest;
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
