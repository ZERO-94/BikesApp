import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";
import {
  getRequestList,
  requestTrip,
} from "../services/firebase/firestore/requestStore/requestStore.operations";
import { FSTripRequest } from "../types/trip";
import TripRequestCard from "../components/TripRequestCard/TripRequestCard";
import { Box } from "native-base";
import { UserContext } from "../App";

export type Props = {};

const BikerRequestListScreen: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const [requestList, setRequestList] = useState<FSTripRequest[] | null>([]);

  useEffect(() => {
    getRequestList().then((requestListData: FSTripRequest[]) => {
      setRequestList(requestListData);
    });
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ marginTop: 14, fontSize: 20, fontWeight: "bold" }}>
        Available trips
      </Text>
      <Box marginTop={4}>
        {requestList?.map((tripData, index) => (
          <TripRequestCard
            tripData={tripData}
            key={index}
            onPress={() => requestTrip(user?.email, tripData.id)}
          />
        ))}
      </Box>
    </View>
  );
};

export default BikerRequestListScreen;
