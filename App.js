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
      {/* Display the list of goals */}
      <View style={styles.bottomView}>
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.text}>{item.text}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "purple",
    marginVertical: 5,
  },
  topView: { flex: 1, alignItems: "center", justifyContent: "space-evenly" },
  bottomView: { flex: 4, backgroundColor: "#dcd", alignItems: "center" },
});