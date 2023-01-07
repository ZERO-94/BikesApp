import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const HomeStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
