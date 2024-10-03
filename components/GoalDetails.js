import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GoalDetails = ({ route, navigation }) => {
  const { goal } = route.params;
  const [textColor, setTextColor] = useState('black');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          title="Warning!" 
          color="red" 
          onPress={() => {
            setTextColor('red'); // Change text color to red
            navigation.setOptions({ title: 'Warning!' }); // Change header title
          }} 
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={[styles.detailText, { color: textColor }]}>Goal: {goal.text}</Text>
      <Text style={[styles.detailText, { color: textColor }]}>ID: {goal.id}</Text>
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
  detailText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default GoalDetails;
