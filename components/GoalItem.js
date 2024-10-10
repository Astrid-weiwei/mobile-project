import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PressableButton from "./PressableButton"; // Import reusable button
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ goalObj, handleDelete }) {
  const navigation = useNavigation();

  return (
    <View style={styles.textContainer}>
      <PressableButton
        title={goalObj.text}
        onPress={() => navigation.navigate("Details", { goalObj })}
      />
      {/* Reuse PressableButton for the delete button */}
      <PressableButton
        title="Delete"
        onPress={() => handleDelete(goalObj.id)} // Pass the delete handler as the onPress callback
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Adjust layout for the text and buttons
  },
});
