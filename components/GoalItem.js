// components/GoalItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ goal, onDelete }) => {
  const navigation = useNavigation(); // Hook to access the navigation object

  return (
    <View style={styles.goalItem}>
      <Text style={styles.text}>{goal.text}</Text>
      <View style={styles.buttonContainer}>
        {/* "X" button to delete the goal */}
        <TouchableOpacity onPress={() => onDelete(goal.id)}>
          <Text style={styles.deleteButton}>X</Text>
        </TouchableOpacity>

        {/* "i" button to navigate to the details */}
        <TouchableOpacity onPress={() => navigation.navigate('Details', { goal })}>
          <Text style={styles.infoButton}>i</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  text: {
    color: "purple",
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },
  infoButton: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GoalItem;
