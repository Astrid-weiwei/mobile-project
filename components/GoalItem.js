// components/GoalItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = ({ goal, onDelete }) => {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.text}>{goal.text}</Text>
      <TouchableOpacity onPress={() => onDelete(goal.id)}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: "100%",
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-between', // Space between text and button
    alignItems: 'center',
  },
  text: {
    color: "purple",
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GoalItem;
