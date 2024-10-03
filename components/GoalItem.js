import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const GoalItem = ({ goal, onDelete }) => {
  const navigation = useNavigation(); // Get access to the navigation prop

  return (
    <View style={styles.goalItem}>
      <Text style={styles.text}>{goal.text}</Text>
      <TouchableOpacity onPress={() => onDelete(goal.id)}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { goal })}>
        <Text style={styles.infoButton}>i</Text>
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
  infoButton: {
    color: "blue",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default GoalItem;
