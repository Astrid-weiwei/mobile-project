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
const Stack = createNativeStackNavigator();
import AntDesign from "@expo/vector-icons/AntDesign";
import Map from "./components/Map";

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
          // headerRight: () => {
          //   return (
          //     <Button
          //       title="Warning"
          //       onPress={() => {
          //         console.log("warning");
          //       }}
          //     />
          //   );
          // },
        };
      }}
    />
    <Stack.Screen name="Profile" component={Profile} />
  </>
);
export default function App() {
  const [isUserLoggedIn, SetIsUserLoggedIn] = useState(false);
  useEffect(() => {
    //set up auth listener
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      // if user is not logged in we receive null
      // else we receive user data
      if (user) {
        SetIsUserLoggedIn(true);
      } else {
        SetIsUserLoggedIn(false);
      }
    });
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
          // if user is not logged in show them AuthStack else show them AppStack
          isUserLoggedIn ? AppStack : AuthStack
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}