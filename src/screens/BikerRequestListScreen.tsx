import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import {
  getRequestList,
  requestTrip,
  updateTripStatus,
} from "../services/firebase/firestore/requestStore/requestStore.operations";
import { FSTripRequest } from "../types/trip";
import TripRequestCard from "../components/TripRequestCard/TripRequestCard";
import { Box } from "native-base";
import { UserContext } from "../App";

export type Props = {};

const BikerRequestListScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const [requestList, setRequestList] = useState<FSTripRequest[] | null>([]);

  useEffect(() => {
    getRequestList().then((requestListData: FSTripRequest[] | null) => {
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
      <Box style={{ marginTop: 28 }} w="100%">
        <FlatList
          w="100%"
          data={requestList}
          renderItem={({ item, index }) => {
            return (
              <Box marginBottom={5}>
                <TripRequestCard
                  tripData={item}
                  key={index}
                  onPress={() => {
                    updateTripStatus("ACCEPTED", item.id);
                    navigation.navigate("UserScreen" as never);
                  }}
                />
              </Box>
            );
          }}
        />
      </Box>
    </View>
  );
};

export default BikerRequestListScreen;
