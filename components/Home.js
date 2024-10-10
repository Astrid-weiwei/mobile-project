import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "./Header";
import { useState } from "react";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";

export default function Home({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const appName = "My app";

  // Function to handle new goal input
  function handleInputData(data) {
    let newGoal = { text: data, id: Math.random() };
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    setIsModalVisible(false);
  }

  function dismissModal() {
    setIsModalVisible(false);
  }

  // Function to handle goal deletion
  function goalDeleteHandler(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => {
        return goal.id != deletedId;
      });
    });
  }

  // Delete all goals
  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }

  // Function to render separator with color change on press
  const renderSeparator = ({ highlighted }) => (
    <View
      style={[
        styles.separator,
        highlighted ? { backgroundColor: "purple" } : { backgroundColor: "gray" },
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <PressableButton
          pressedFunction={() => {
            setIsModalVisible(true);
          }}
          componentStyle={{ backgroundColor: "purple" }}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        modalVisible={isModalVisible}
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          ListEmptyComponent={<Text style={styles.header}>No goals to show</Text>}
          ListHeaderComponent={goals.length ? <Text style={styles.header}>My Goals List</Text> : null}
          ListFooterComponent={goals.length ? <PressableButton pressedFunction={deleteAll}><Text>Delete All</Text></PressableButton> : null}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.scrollViewContent}
          data={goals}
          renderItem={({ item, separators }) => (
            <GoalItem
              goalObj={item}
              handleDelete={goalDeleteHandler}
              onPressIn={() => separators.highlight()}  // Highlight separator on press
              onPressOut={() => separators.unhighlight()}  // Unhighlight separator on release
            />
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
    justifyContent: "center",
  },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
  topView: { flex: 1, alignItems: "center", justifyContent: "space-evenly" },
  bottomView: { flex: 4, backgroundColor: "#dcd" },
  scrollViewContent: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 5,
  },
  separator: {
    height: 5,
  },
});
