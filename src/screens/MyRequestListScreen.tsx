import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FSTripRequest } from "../types/trip";
import { getRequestedTripsByStatus } from "../services/firebase/firestore/requestStore/requestStore.operations";
import { UserContext } from "../App";
import TripRequestedCard from "../components/TripRequestedCard/TripRequestedCard";

export type Props = {};

const MyRequestListScreen: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const [requestList, setRequestList] = useState<FSTripRequest[] | null>([]);

  useEffect(() => {
    getRequestedTripsByStatus(user?.email, "REQUEST").then(
      (requestListData: FSTripRequest[]) => {
        setRequestList(requestListData);
      }
    );
  }, []);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {requestList?.map((tripData, index) => (
        <TripRequestedCard tripData={tripData} key={index} />
      ))}
    </View>
  );
};

export default MyRequestListScreen;
