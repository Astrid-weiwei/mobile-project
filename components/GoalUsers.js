import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function GoalUsers() {
  const [users, setUsers] = useState([]);  // Step 1: Define state variable

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();  // Step 2: Parse response to JSON
        setUsers(data);  // Set the users state with fetched data
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();  // Call the async function inside useEffect
  }, []);

  // Step 3: Render users using FlatList
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
          </View>
        )}
      />
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
  userContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  userName: {
    fontSize: 18,
  },
});



