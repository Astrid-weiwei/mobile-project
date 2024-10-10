import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ goalObj, handleDelete }) {
  const navigation = useNavigation();

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button
        title="X"
        onPress={() => {
          handleDelete(goalObj.id);
        }}
        color="grey"
      />
      <Button
        title="i"
        onPress={() => {
          // handlePress(goalObj);
          navigation.navigate("Details", { goalObj });
        }}
        color="grey"
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