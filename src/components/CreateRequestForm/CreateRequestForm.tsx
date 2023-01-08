import { View, Button } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Text } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../App";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { createRequest } from "../../services/firebase/firestore/requestStore/requestStore.operations";
import { useNavigation } from "@react-navigation/native";

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
        biker: user?.email as string,
        fromLocation: fromLocation,
        toLocation: toLocation,
        createdAt: new Date(Date.now()).toUTCString(),
        status: "WAITING",
        bookingTime: bookingTime.toUTCString(),
      });
      navigation.goBack();
    } catch (e: any) {}
  };

  return (
    <View>
      <Text>From: </Text>
      <SelectDropdown
        data={locations.filter((location) => location !== toLocation)}
        onSelect={(item: string) => setFromLocation(item as string)}
        onChangeSearchInputText={() => {}}
        defaultValue={locations[0]}
      />
      <Text>To: </Text>
      <SelectDropdown
        data={locations.filter((location) => location !== fromLocation)}
        onSelect={(item: string) => setToLocation(item as string)}
        onChangeSearchInputText={() => {}}
        defaultValue={locations[1]}
      />
      <Text>Picking time: </Text>
      <RNDateTimePicker
        mode="datetime"
        value={bookingTime}
        onChange={(event, date) => setBookingTime(date as Date)}
      />
      <Button onPress={() => attemptCreateRequest()} title={"Create"} />
    </View>
  );
};

export default CreateRequestForm;
