import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../screens/UserScreen";
import BikerRequestListScreen from "../screens/BikerRequestListScreen";
import TestNotificationScreen from "../screens/TestNotificationScreen";
import RequestDetailScreen from "../screens/RequestDetailScreen";
import UserRequestListScreen from "../screens/UserRequestListScreen";

const Stack = createNativeStackNavigator();

const UserStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen
        name="BikerRequestListScreen"
        component={BikerRequestListScreen}
      />
      <Stack.Screen
        name="UserRequestListScreen"
        component={UserRequestListScreen}
      />
      <Stack.Screen
        name="TestNotificationScreen"
        component={TestNotificationScreen}
      />
      <Stack.Screen
        name="RequestDetailScreen"
        component={RequestDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
