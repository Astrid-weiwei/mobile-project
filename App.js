import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./components/GoalDetails";
import { Button } from "react-native";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import Profile from "./components/Profile";
import PressableButton from "./components/PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Map from "./components/Map";
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();

// Set up notification handler outside the App function
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true, 
      shouldPlaySound: true, // Play a sound when the notification is triggered
      shouldSetBadge: true, // Update the app badge (iOS only)
    };
  },
});

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => {
        return {
          title: "All My Goals",
          headerRight: () => {
            return (
              <PressableButton
                pressedFunction={() => {
                  navigation.navigate("Profile");
                }}
                componentStyle={{ backgroundColor: "purple" }}
              >
                <AntDesign name="user" size={24} color="white" />
              </PressableButton>
            );
          },
        };
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
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Map" component={Map} />
  </>
);

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Set up auth listener
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      // Update state based on user's login status
      setIsUserLoggedIn(!!user);
    });

    // Add a listener for received notifications
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification Received:", notification);
      
    });
    return () => subscription.remove();

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      >
        {
          // Show AuthStack if user is not logged in, else show AppStack
          isUserLoggedIn ? AppStack : AuthStack
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
