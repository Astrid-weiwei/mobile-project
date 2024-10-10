import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function PressableButton({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "lightgrey" }} // Ripple effect for Android
      style={({ pressed }) => [
        styles.buttonContainer,
        { backgroundColor: pressed ? "#ddd" : "#ccc", opacity: pressed ? 0.7 : 1 }, // Feedback for iOS
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
