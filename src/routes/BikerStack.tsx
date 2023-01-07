import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BikerScreen from "../screens/BikerScreen";
import Home from "../screens/Home";
import UserScreen from "../screens/UserScreen";

const Stack = createNativeStackNavigator();

const BikerStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BikerScreen" component={BikerScreen} />
    </Stack.Navigator>
  );
};

export default BikerStack;
