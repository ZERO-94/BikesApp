import React, { useContext } from "react";
import { View, Button, Text } from "react-native";
import { FSTripRequest } from "../../types/trip";
import { styled } from "nativewind";
import { UserContext } from "../../App";
import { requestTrip } from "../../services/firebase/firestore/requestStore/requestStore.operations";

export type Props = {
  tripData: FSTripRequest;
};

const TextStyled = styled(Text);
const ViewStyled = styled(View);

const TripRequestCard: React.FC<Props> = ({ tripData }) => {
  const user = useContext(UserContext);
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
        <Button
          title="Request"
          onPress={() => requestTrip(user?.email, tripData.id)}
        />
      </ViewStyled>
    </ViewStyled>
  );
};

export default TripRequestCard;
