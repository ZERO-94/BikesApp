import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BikerScreen from "../screens/BikerScreen";
import Home from "../screens/Home";
import UserScreen from "../screens/UserScreen";
import BikerRequestListScreen from "../screens/BikerRequestListScreen";

const Stack = createNativeStackNavigator();

const BikerStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BikerScreen" component={BikerScreen} />
      <Stack.Screen
        name="BikerRequestListScreen"
        component={BikerRequestListScreen}
      />
    </Stack.Navigator>
  );
};

export default BikerStack;
