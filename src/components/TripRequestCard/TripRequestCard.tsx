import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { FSTripRequest } from "trip";
import { styled } from "nativewind";

export type Props = {
  tripData: FSTripRequest;
};

const TextStyled = styled(Text);
const ViewStyled = styled(View);

const TripRequestCard: React.FC<Props> = ({ tripData }) => {
  return (
    <ViewStyled className="my-4 p-5 bg-blue-100 shadow rounded">
      <TextStyled className="mb-1">
        <TextStyled className="font-bold">Driver:</TextStyled> {tripData?.biker}
      </TextStyled>
      <TextStyled className="mb-1">
        <TextStyled className="font-bold">From:</TextStyled>{" "}
        {tripData?.fromLocation}
      </TextStyled>
      <TextStyled className="mb-1">
        <TextStyled className="font-bold">To:</TextStyled>{" "}
        {tripData?.toLocation}
      </TextStyled>
      <TextStyled className="mb-1">
        <TextStyled className="font-bold">Picking time:</TextStyled>{" "}
        {tripData?.bookingTime}
      </TextStyled>
      <ViewStyled>
        <Button title="Request" />
      </ViewStyled>
    </ViewStyled>
  );
};

export default TripRequestCard;
