// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';

// export default function GoalUsers() {
//   const [users, setUsers] = useState([]);  

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//         const data = await response.json();  
//         setUsers(data); 
//       } catch (error) {
//         console.log("Error fetching users:", error);
//       }
//     };

//     fetchUsers(); 
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Users</Text>
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.userContainer}>
//             <Text style={styles.userName}>{item.name}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   userContainer: {
//     padding: 10,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   userName: {
//     fontSize: 18,
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

export default function GoalUsers({ goalId }) {
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

    fetchUsers();
  }, []);

  const handlePostUser = async () => {
    const newUser = {
      name: "John Doe", // Fake user object
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser), // Convert the user object to JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User added:', data);
        // Optionally, you can update the users list here
        setUsers([...users, data]);
      } else {
        console.log('Failed to add user');
      }
    } catch (error) {
      console.log("Error posting user:", error);
    }
  };

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
      <Button title="Add Fake User" onPress={handlePostUser} />
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
