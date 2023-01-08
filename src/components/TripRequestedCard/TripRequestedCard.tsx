import React from "react";
import { View, Text, Pressable } from "react-native";
import { FSTripRequest } from "../../types/trip";
import { styled } from "nativewind";

export type Props = {
  tripData: FSTripRequest;
};

const TextStyled = styled(Text);
const ViewStyled = styled(View);

const TripRequestCard: React.FC<Props> = ({ tripData }) => {
  return (
    <Pressable onPress={() => console.log("a")}>
      <ViewStyled className="my-4 p-5 bg-blue-100 shadow rounded">
        <TextStyled className="mb-1">
          <TextStyled className="font-bold">User:</TextStyled> {tripData?.user}
        </TextStyled>
        <TextStyled className="mb-1">
          <TextStyled className="font-bold">From: </TextStyled>
          {tripData?.fromLocation}
        </TextStyled>
        <TextStyled className="mb-1">
          <TextStyled className="font-bold">To: </TextStyled>
          {tripData?.toLocation}
        </TextStyled>
        <TextStyled className="mb-1">
          <TextStyled className="font-bold">Picking time: </TextStyled>
          {tripData?.bookingTime}
        </TextStyled>
      </ViewStyled>
    </Pressable>
  );
};

export default TripRequestCard;
