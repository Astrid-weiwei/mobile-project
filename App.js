import React from "react";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./components/GoalDetails";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "All My Goals",
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ navigation, route }) => {
            return {
              title: route.params ? route.params.goalObj.text : "More Details",
          
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}