import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  FlatList,
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { auth, database, storage } from "../Firebase/firebaseSetup";
import {
  writeToDB,
  deleteFromDB,
  deleteAllFromDB,
} from "../Firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { Platform } from "react-native";

export default function Home({ navigation }) {
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchPushToken = async () => {
      try {
        // Verify notification permissions
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert(
            "Permission Required",
            "Notifications permission is required to receive notifications."
          );
          return;
        }

        // Android-specific notification channel setup
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
          });
        }

        // Fetch the push token
        const tokenResponse = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        const pushToken = tokenResponse.data;

        console.log("Push Token:", pushToken);
        // Optional: Save this token to your backend for push notification delivery
      } catch (err) {
        console.error("Error fetching push token:", err);
      }
    };

    const unsubscribe = onSnapshot(
      query(
        collection(database, "goals"),
        where("owner", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setGoals(newArray);
      },
      (error) => {
        console.log(error);
        Alert.alert(error.message);
      }
    );

    fetchPushToken();

    return () => unsubscribe();
  }, []);

  async function fetchAndUploadImage(uri) {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`An error happened with status: ${response.status}`);
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log("fetch and upload image ", err);
    }
  }

  async function handleInputData(data) {
    let uri = "";
    if (data.imageUri) {
      uri = await fetchAndUploadImage(data.imageUri);
    }
    let newGoal = { text: data.text, owner: auth.currentUser.uid };
    if (uri) {
      newGoal = { ...newGoal, imageUri: uri };
    }
    writeToDB(newGoal, "goals");
    setModalVisible(false);
  }

  function dismissModal() {
    setModalVisible(false);
  }

  function handleGoalDelete(deletedId) {
    deleteFromDB(deletedId, "goals");
  }

  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => deleteAllFromDB("goals"),
      },
      { text: "No", style: "cancel" },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={"My app!"}></Header>
        <PressableButton
          pressedHandler={() => setModalVisible(true)}
          componentStyle={{ backgroundColor: "purple" }}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
      </View>
      <Input
        textInputFocus={true}
        inputHandler={handleInputData}
        isModalVisible={modalVisible}
        dismissModal={dismissModal}
      />
      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={{
                height: 5,
                backgroundColor: highlighted ? "purple" : "gray",
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length ? <Text style={styles.header}>My Goals List</Text> : null
          }
          ListFooterComponent={
            goals.length ? <Button title="Delete all" onPress={deleteAll} /> : null
          }
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item, separators }) => (
            <GoalItem
              separators={separators}
              deleteHandler={handleGoalDelete}
              goalObj={item}
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
  scrollViewContainer: {
    alignItems: "center",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#dcd",
  },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
