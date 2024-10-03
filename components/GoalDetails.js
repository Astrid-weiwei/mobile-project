// components/GoalDetails.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GoalDetails = ({ route, navigation }) => {
  // Access the passed goal details via route.params
  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Details</Text>
      <Text style={styles.detailText}>Goal: {goal.text}</Text>
      <Text style={styles.detailText}>ID: {goal.id}</Text>
      
      {/* More Details Button */}
      <Button
        title="More Details"
        onPress={() => navigation.navigate('Details', { goal })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default GoalDetails;
