import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ goal, onDelete }) => {
  const navigation = useNavigation(); // Hook to access the navigation object

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { goal })} // Navigate to 'Details' screen
    >
      <View style={styles.goalItem}>
        <Text style={styles.text}>{goal.text}</Text>
        <TouchableOpacity onPress={() => onDelete(goal.id)}>
          <Text style={styles.deleteButton}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
