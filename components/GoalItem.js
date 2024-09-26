// components/GoalItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalItem = ({ goal }) => {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.text}>{goal.text}</Text>
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
  },
  text: {
    color: "purple",
  },
});

export default GoalItem;
