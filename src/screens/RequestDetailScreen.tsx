import React from "react";
import { View, Text, Button } from "react-native";
import { FSTripRequest } from "../types/trip";
import { ScreenComponent } from "@react-navigation";
import {
  updateTripStatus,
  rejectTrip,
} from "../services/firebase/firestore/requestStore/requestStore.operations";
export type Props = {
  navigation: any;
};

const RequestDetailScreen: ScreenComponent<Props> = (navigation: any) => {
  console.log(navigation.navigation);
  const data = navigation?.route.params as FSTripRequest;

  return (
    <View>
      <Text>Your current request:</Text>
      <Text>{`Request user: ${data.user}`}</Text>
      <Text>{`From: ${data.fromLocation}`}</Text>
      <Text>{`To: ${data.toLocation}`}</Text>
      <Text>{`Booking time: ${data.bookingTime}`}</Text>
      {data.status === "REQUEST" ? (
        <View>
          <Button
            title="ACCEPT"
            onPress={() => {
              updateTripStatus("ACCEPTED", data.id);
              navigation.navigation.navigate("BikerScreen");
            }}
          />
          <Button
            title="REJECT"
            onPress={() => {
              rejectTrip(data.id);
              navigation.navigation.navigate("BikerScreen");
            }}
          />
        </View>
      ) : (
        <View>
          <Button
            title="START TRIP"
            onPress={() => {
              updateTripStatus("ON-GOING", data.id);
              navigation.navigation.navigate("OnGoingTripScreen", data);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default RequestDetailScreen;
