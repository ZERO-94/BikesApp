import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

export type Props = {};

const BikerRequestListScreen: React.FC<Props> = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>My requet list</Text>
    </View>
  );
};

export default BikerRequestListScreen;
