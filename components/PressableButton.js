import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function PressableButton({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "lightgrey" }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#ddd" : "#ccc", // Visual feedback
          opacity: pressed ? 0.5 : 1,
        },
        styles.buttonContainer,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
