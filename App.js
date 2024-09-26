import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import Header from "./components/Header";
import React, { useState } from "react";
import Input from "./components/Input";
import GoalItem from "./components/GoalItem"; // Import GoalItem

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

      {/* Use FlatList to render GoalItem components */}
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GoalItem goal={item} />} // Pass the goal object as a prop
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Add padding at the bottom for better spacing
  },
});

