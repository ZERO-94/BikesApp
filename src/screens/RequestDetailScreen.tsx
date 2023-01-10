import React, { useState } from "react";
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
  const [currentStatus, setCurrentStatus] = useState<string>(data.status);

  const buttonType: { [key: string]: any } = {
    REQUEST: (
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
    ),
    ACCEPTED: (
      <Button
        title="START TRIP"
        onPress={() => {
          updateTripStatus("ONGOING", data.id);
          setCurrentStatus("ONGOING");
        }}
      />
    ),
    ONGOING: (
      <Button
        title="FINISH TRIP"
        onPress={() => {
          updateTripStatus("FINISHED", data.id);
          navigation.navigation.navigate("BikerScreen");
        }}
      />
    ),
  };

  return (
    <View>
      <Text>Your current request:</Text>
      <Text>{`Request user: ${data.user}`}</Text>
      <Text>{`From: ${data.fromLocation}`}</Text>
      <Text>{`To: ${data.toLocation}`}</Text>
      <Text>{`Booking time: ${data.bookingTime}`}</Text>
      <Text>{`Status: ${currentStatus}`}</Text>
      {buttonType[currentStatus]}
    </View>
  );
};

export default RequestDetailScreen;
