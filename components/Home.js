import { View, FlatList, SafeAreaView, Text, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton"; // Import reusable button

export default function Home({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app";

  function handleInputData(data) {
    let newGoal = { text: data, id: Math.random() };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setIsModalVisible(false);
  }

  function goalDeleteHandler(deletedId) {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== deletedId));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Header name={appName} />
        {/* Replace the button for adding a goal with PressableButton */}
        <PressableButton
          title="Add a Goal"
          onPress={() => setIsModalVisible(true)}
        />
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        modalVisible={isModalVisible}
        dismissModal={() => setIsModalVisible(false)}
      />
      <FlatList
        data={goals}
        renderItem={({ item }) => (
          <GoalItem goalObj={item} handleDelete={goalDeleteHandler} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: { flex: 1, alignItems: "center", justifyContent: "space-evenly" },
});
