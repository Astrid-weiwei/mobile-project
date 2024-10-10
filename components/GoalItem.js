import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function GoalItem({ goalObj, handleDelete }) {
  const navigation = useNavigation();

  // Function to handle long press and show the delete confirmation
  function handleLongPress() {
    Alert.alert(
      "Delete Goal",
      `Are you sure you want to delete "${goalObj.text}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(goalObj.id),
          style: "destructive",
        },
      ]
    );
  }

  return (
    <View style={styles.textContainer}>
      <Pressable
        android_ripple={{ color: "white", radius: 20 }}
        style={({ pressed }) => {
          return [styles.horizontalContainer, pressed && styles.pressedStyle];
        }}
        onPress={() => {
          navigation.navigate("Details", { goalObj });
        }}
        onLongPress={handleLongPress} // Handle long press to delete
      >
        <Text style={styles.text}>{goalObj.text}</Text>
        <PressableButton
          pressedFunction={() => {
            handleDelete(goalObj.id);
          }}
          componentStyle={styles.deleteContainer}
          pressedStyle={styles.pressedStyle}
        >
          <AntDesign name="delete" size={24} color="white" />
        </PressableButton>
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
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  pressedStyle: {
    backgroundColor: "red",
    opacity: 0.5,
  },
  deleteContainer: {
    backgroundColor: "grey",
  },
});
