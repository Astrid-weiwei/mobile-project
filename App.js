import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home"; // Import Home screen

// Create a Stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: 'Home', // Custom title text
            headerStyle: {
              backgroundColor: '#f4511e', // Custom header background color
            },
            headerTintColor: '#fff', // Custom color for the title text
            headerTitleStyle: {
              fontWeight: 'bold', // Custom font style
            },
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
