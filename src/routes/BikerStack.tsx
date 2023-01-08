import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BikerScreen from "../screens/BikerScreen";
import CreateRequestScreen from "../screens/CreateRequestScreen";

const Stack = createNativeStackNavigator();

const BikerStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BikerScreen" component={BikerScreen} />
      <Stack.Screen
        name="CreateRequestScreen"
        component={CreateRequestScreen}
      />
    </Stack.Navigator>
  );
};

export default BikerStack;
