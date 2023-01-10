import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FSTripRequest } from "../types/trip";
import {
  getRequestedTripsByStatus,
  updateTripStatus,
} from "../services/firebase/firestore/requestStore/requestStore.operations";
import { UserContext } from "../App";
import { Box, FlatList } from "native-base";
import TripRequestCard from "../components/TripRequestCard/TripRequestCard";
import { useNavigation } from "@react-navigation/native";

export type Props = {};

const MyRequestListScreen: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [requestList, setRequestList] = useState<FSTripRequest[] | null>([]);

  useEffect(() => {
    getRequestedTripsByStatus(user?.email, ["REQUEST", "WAITING"]).then(
      (requestListData: FSTripRequest[]) => {
        setRequestList(requestListData);
      }
    );
  }, []);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Box style={{ marginTop: 28 }} w="100%">
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          My Request List
        </Text>
        <FlatList
          w="100%"
          data={requestList}
          renderItem={({ item, index }) => {
            return (
              <Box marginBottom={5}>
                <TripRequestCard
                  tripData={item}
                  key={index}
                  onPress={() => {}}
                />
              </Box>
            );
          }}
        />
      </Box>
    </View>
  );
};

export default MyRequestListScreen;
