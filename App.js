import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, FlatList, View, Text } from "react-native";
import Header from "./components/Header";
import React, { useState } from "react";
import Input from "./components/Input";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [goals, setGoals] = useState([]); // State to hold the list of goals
  const [isModalVisible, setIsModalVisible] = useState(false);
  const appName = "My app";
  
  // Function to handle new goal input
  function handleInputData(data) {
    const newGoal = {
      text: data,
      id: Math.random().toString(), // Generate a unique ID for each goal
    };

    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setIsModalVisible(false);
  }

  // Function to handle deletion of a goal
  function handleDeleteGoal(goalId) {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
  }

  // Component to display when the goal list is empty
  const renderEmptyComponent = () => {
    return <Text style={styles.emptyText}>No goals to show</Text>;
  };

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
        renderItem={({ item }) => (
          <GoalItem goal={item} onDelete={handleDeleteGoal} /> // Pass onDelete function to GoalItem
        )}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={renderEmptyComponent} // Component to show when the list is empty
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
    flexGrow: 1, // Make sure content is centered when empty
    justifyContent: 'center', // Center content when the list is empty
  },
  emptyText: {
    fontSize: 18,
    color: "purple",
    textAlign: "center",
    marginVertical: 20,
  },
});
