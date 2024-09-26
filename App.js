import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import Header from "./components/Header";
import React, { useState } from "react";
import Input from "./components/Input";

export default function App() {
  const [goals, setGoals] = useState([]); // State to hold the list of goals
  const [isModalVisible, setIsModalVisible] = useState(false);
  const appName = "My app";
  
  // Function to handle new goal input
  function handleInputData(data) {
    console.log("App ", data);
    // Create a new goal object with text and a unique id
    const newGoal = {
      text: data,
      id: Math.random().toString(), // Generate a unique ID for each goal
    };

    // Add the new goal to the array of goals using the spread operator
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setIsModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Button
          title="Add a Goal"
          onPress={() => {
            setIsModalVisible(true);
          }}
        />
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        modalVisible={isModalVisible}
      />

      {/* Replace ScrollView with FlatList */}
      <FlatList
        data={goals} // The array of goals to render
        keyExtractor={(item) => item.id} // Provide a unique key for each item
        renderItem={({ item }) => ( // Render each item in the list
          <View style={styles.goalItem}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.contentContainer} // Styling the content container
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "purple",
    marginVertical: 5,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  goalItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: "100%",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Add padding at the bottom for better spacing
  },
});
