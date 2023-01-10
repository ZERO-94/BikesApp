import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BikerScreen from "../screens/BikerScreen";
import CreateRequestScreen from "../screens/CreateRequestScreen";
import MyRequestListScreen from "../screens/MyRequestListScreen";
import RequestDetailScreen from "../screens/RequestDetailScreen";
import AcceptedRequestListScreen from "../screens/AcceptedRequestListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BikerStack: React.FC<{}> = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="BikerScreen"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
        component={BikerScreen}
      />
      <Tab.Screen
        name="CreateRequestScreen"
        options={{
          title: "Create request",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-document"
              size={size}
              color={color}
            />
          ),
        }}
        component={CreateRequestScreen}
      />
      <Tab.Screen
        name="MyRequestListScreen"
        options={{
          title: "My requests",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-document-multiple-outline"
              size={size}
              color={color}
            />
          ),
        }}
        component={() => (
          <Stack.Navigator>
            <Stack.Screen
              name="MyRequestListScreen"
              options={{ headerShown: false }}
              component={MyRequestListScreen}
            />
            <Stack.Screen
              name="RequestDetailScreen"
              options={{ title: "Request detail" }}
              component={RequestDetailScreen}
            />
          </Stack.Navigator>
        )}
      />
      <Tab.Screen
        name="AcceptedRequestListScreen"
        options={{
          title: "Accept requests",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="sticker-check-outline"
              size={size}
              color={color}
            />
          ),
        }}
        component={() => (
          <Stack.Navigator>
            <Stack.Screen
              name="AcceptedRequestListScreen"
              options={{ headerShown: false }}
              component={AcceptedRequestListScreen}
            />
            <Stack.Screen
              name="RequestDetailScreen"
              options={{ title: "Request detail" }}
              component={RequestDetailScreen}
            />
          </Stack.Navigator>
        )}
      />
    </Tab.Navigator>
  );
};

export default BikerStack;
