import { View } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Text } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../App";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { createRequest } from "../../services/firebase/firestore/requestStore/requestStore.operations";
import { useNavigation } from "@react-navigation/native";
import { Box, FormControl, Button, Flex } from "native-base";

const locations = ["Đại học FPT", "Vinhome Grand Park", "KTX Làng Đại học"];

export type Props = {};

const CreateRequestForm: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [fromLocation, setFromLocation] = useState(locations[0]);
  const [toLocation, setToLocation] = useState(locations[1]);
  const [bookingTime, setBookingTime] = useState<Date>(new Date());

  const attemptCreateRequest = async () => {
    try {
      await createRequest({
        user: "",
        biker: user?.email as string,
        fromLocation: fromLocation,
        toLocation: toLocation,
        createdAt: new Date(Date.now()).toUTCString(),
        status: "WAITING",
        bookingTime: bookingTime.toUTCString(),
        id: "",
      });
      navigation.navigate("MyRequestListScreen" as never);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingTop: 25,
        paddingBottom: 35,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Create request form
      </Text>
      <Box marginTop={4}>
        <FormControl.Label>From:</FormControl.Label>
        <SelectDropdown
          buttonStyle={{ width: "100%", height: 36, borderRadius: 5 }}
          data={locations.filter((location) => location !== toLocation)}
          onSelect={(item: string) => setFromLocation(item as string)}
          onChangeSearchInputText={() => {}}
          defaultValue={locations[0]}
        />
      </Box>
      <Box marginTop={4}>
        <FormControl.Label>To:</FormControl.Label>
        <SelectDropdown
          buttonStyle={{ width: "100%", height: 36, borderRadius: 5 }}
          data={locations.filter((location) => location !== fromLocation)}
          onSelect={(item: string) => setToLocation(item as string)}
          onChangeSearchInputText={() => {}}
          defaultValue={locations[1]}
        />
      </Box>
      <Flex marginTop={7} direction="row" alignItems={"center"}>
        <Text style={{ fontSize: 18, marginRight: 10 }}>Picking at:</Text>
        <RNDateTimePicker
          mode="datetime"
          value={bookingTime}
          onChange={(event, date) => setBookingTime(date as Date)}
        />
      </Flex>
      <Button
        onPress={() => attemptCreateRequest()}
        marginTop={7}
        borderRadius={50}
        colorScheme="indigo"
      >
        Submit
      </Button>
    </View>
  );
};

export default CreateRequestForm;
