import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton"; // Import the reusable button

export default function GoalItem({ goalObj, handleDelete }) {
  const navigation = useNavigation();

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      {/* Use the PressableButton for deleting */}
      <PressableButton
        title="X"
        onPress={() => handleDelete(goalObj.id)}
      />
      {/* Use the PressableButton for navigating to details */}
      <PressableButton
        title="Details"
        onPress={() => navigation.navigate("Details", { goalObj })}
      />
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
