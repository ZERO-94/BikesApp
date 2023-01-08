import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getRequestList } from "../services/firebase/firestore/requestStore/requestStore.operations";
import { FSTripRequest } from "../types/trip";
import TripRequestCard from "../components/TripRequestCard/TripRequestCard";

export type Props = {};

const BikerRequestListScreen: React.FC<Props> = () => {
  const [requestList, setRequestList] = useState<FSTripRequest[] | null>([]);

  useEffect(() => {
    getRequestList().then((requestListData: FSTripRequest[] | null) => {
      setRequestList(requestListData);
    });
  }, []);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {requestList?.map((tripData, index) => (
        <TripRequestCard tripData={tripData} key={index} />
      ))}
    </View>
  );
};

export default BikerRequestListScreen;
