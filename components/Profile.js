import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useLayoutEffect } from "react";
import { auth } from "../Firebase/firebaseSetup";
import { signOut } from "firebase/auth";

export default function Profile({ navigation }) {
  // Function to handle sign out
  const signOutHandler = async () => {
    try {
      await signOut(auth);
      Alert.alert("Signed Out", "You have successfully signed out.");
      navigation.replace("Login"); // Navigate back to Login screen
    } catch (err) {
      console.log("Sign out error:", err);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  // Add sign-out button to header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Sign Out" onPress={signOutHandler} color="#552055" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>User ID: {auth.currentUser?.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
