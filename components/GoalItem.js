import { Pressable, StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ goalObj, handleDelete }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", { goalObj });
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#ddd' : '#aaa',
          borderRadius: 5,
        },
        styles.textContainer,
      ]}
    >
      <View style={styles.goalContent}>
        <Text style={styles.text}>{goalObj.text}</Text>
        <Button
          title="X"
          onPress={() => handleDelete(goalObj.id)}
          color="grey"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    fontSize: 35,
    padding: 5,
  },
  textContainer: {
    marginVertical: 5,
    padding: 10,
  },
  goalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
