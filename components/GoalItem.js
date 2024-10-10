import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";  // Import the icon library
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ goalObj, handleDelete }) {
  const navigation = useNavigation();

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Pressable
        onPress={() => {
          handleDelete(goalObj.id);
        }}
        android_ripple={{ color: "#ddd" }} // Visual feedback for Android
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,  // Visual feedback for iOS
          },
        ]}
      >
        <Ionicons name="trash-outline" size={24} color="black" />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Details", { goalObj });
        }}
        android_ripple={{ color: "#ddd" }} // Visual feedback for Android
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,  // Visual feedback for iOS
          },
        ]}
      >
        <Ionicons name="information-circle-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    fontSize: 35,
    padding: 5,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
