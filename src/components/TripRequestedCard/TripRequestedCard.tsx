import React from "react";
import { View, Text, Pressable } from "react-native";
import { FSTripRequest } from "../../types/trip";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";

export type Props = {
  tripData: FSTripRequest;
};

const TextStyled = styled(Text);
const ViewStyled = styled(View);

const TripRequestCard: React.FC<Props> = ({ tripData }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("RequestDetail" as never)}>
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
