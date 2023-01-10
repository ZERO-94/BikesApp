import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";
import {
  getRequestList,
  getUserRequestedTripsByStatus,
  requestTrip,
  updateTripStatus,
} from "../services/firebase/firestore/requestStore/requestStore.operations";
import { FSTripRequest } from "../types/trip";
import TripRequestCard from "../components/TripRequestCard/TripRequestCard";
import { Box, FlatList } from "native-base";
import { UserContext } from "../App";

export type Props = {};

const UserRequestListScreen: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [requestList, setRequestList] = useState<FSTripRequest[] | null>([]);

  useEffect(() => {
    getUserRequestedTripsByStatus(user?.email, [
      "REQUEST",
      "ACCEPTED",
      "REJECTED",
      "START",
      "ONGOING",
      "FINISHED",
    ]).then((requestListData: FSTripRequest[] | null) => {
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
        My trips
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
                    navigation.navigate(
                      "RequestDetailScreen" as never,
                      item as never
                    );
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

export default UserRequestListScreen;
