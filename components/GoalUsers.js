import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GoalUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    
    fetchUsers();  // Call the async function inside useEffect
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users</Text>
      {users.map((user) => (
        <View key={user.id}>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
