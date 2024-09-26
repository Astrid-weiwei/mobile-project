import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
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
      id: Math.random().toString(), // Generate a unique ID for the new goal
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

      {/* Wrapping the list rendering in a ScrollView */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer} // Use contentContainerStyle for layout properties
      >
        {goals.map((goal) => (
          <View key={goal.id} style={styles.goalItem}>
            <Text style={styles.text}>{goal.text}</Text>
          </View>
        ))}
      </ScrollView>
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
  scrollView: {
    flex: 3, // Allow ScrollView to take up the remaining space
    width: "100%",
  },
  contentContainer: {
    alignItems: "center", // Align children in the center
    paddingHorizontal: 20,
    paddingBottom: 20, // Add some padding at the bottom
  },
});
