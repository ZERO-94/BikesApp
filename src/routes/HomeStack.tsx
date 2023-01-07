import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BikerScreen from "../screens/BikerScreen";
import Home from "../screens/Home";
import UserScreen from "../screens/UserScreen";

const Stack = createNativeStackNavigator();

const HomeStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
