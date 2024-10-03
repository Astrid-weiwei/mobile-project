import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Alert,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";

export default function Home() {
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

  // Function to handle "Delete All" action
  function handleDeleteAll() {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => setGoals([]), // Clear all goals
        },
      ]
    );
  }

  // Component to display when the goal list is empty
  const renderEmptyComponent = () => {
    return <Text style={styles.emptyText}>No goals to show</Text>;
  };

  // Header Component for the FlatList
  const renderHeader = () => {
    if (goals.length > 0) {
      return <Text style={styles.headerText}>My Goals</Text>;
    }
    return null;
  };

  // Footer Component for the FlatList
  const renderFooter = () => {
    if (goals.length > 0) {
      return (
        <View style={styles.footer}>
          <Button title="Delete All" color="blue" onPress={handleDeleteAll} />
        </View>
      );
    }
    return null;
  };

  // Separator Component for the FlatList
  const renderSeparator = () => {
    return <View style={styles.separator} />;
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
        ListHeaderComponent={renderHeader} // Component to show when there are goals
        ListFooterComponent={renderFooter} // Component to show the footer when there are goals
        ItemSeparatorComponent={renderSeparator} // Component to show line between items
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
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "purple",
    textAlign: "center",
    marginVertical: 10,
  },
  emptyText: {
    fontSize: 18,
    color: "purple",
    textAlign: "center",
    marginVertical: 20,
  },
  footer: {
    marginVertical: 10,
    alignItems: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
});
