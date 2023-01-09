import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BikerScreen from "../screens/BikerScreen";
import CreateRequestScreen from "../screens/CreateRequestScreen";
import MyRequestListScreen from "../screens/MyRequestListScreen";
import RequestDetailScreen from "../screens/RequestDetailScreen";
import AcceptedRequestListScreen from "../screens/AcceptedRequestListScreen";
import OnGoingTripScreen from "../screens/OnGoingTripScreen";

const Stack = createNativeStackNavigator();

const BikerStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BikerScreen" component={BikerScreen} />
      <Stack.Screen
        name="CreateRequestScreen"
        component={CreateRequestScreen}
      />
      <Stack.Screen
        name="MyRequestListScreen"
        component={MyRequestListScreen}
      />
      <Stack.Screen
        name="RequestDetailScreen"
        component={RequestDetailScreen}
      />
      <Stack.Screen
        name="AcceptedRequestListScreen"
        component={AcceptedRequestListScreen}
      />
      <Stack.Screen name="OnGoingTripScreen" component={OnGoingTripScreen} />
    </Stack.Navigator>
  );
};

export default BikerStack;
