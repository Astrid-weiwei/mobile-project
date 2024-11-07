import { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, database, storage } from "../Firebase/firebaseSetup";
import GoalItem from "./GoalItem";

export default function Home( {navigation} ) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const goalsRef = collection(database, "goals");
    const userGoalsQuery = query(goalsRef, where("owner", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(userGoalsQuery, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setGoals(newArray);
    });
    return () => unsubscribe();
  }, []);
  async function handleImageData(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const imageName = url.substring(url.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      const imageDownloadURL = await getDownloadURL(uploadResult.ref);
      return imageDownloadURL;
    } catch (error) {
      console.error("Error saving image:", error);
    }
  }
  async function inputHandler(newGoal) {
    try {
      let imageDownloadURL = null;

      // Check if the goal has an imageUri
      if (newGoal.imageUri) {
        const response = await fetch(newGoal.imageUri);
        const blob = await response.blob();

        // Create a unique image name and a reference in Firebase Storage
        const imageName = newGoal.imageUri.substring(newGoal.imageUri.lastIndexOf('/') + 1);
        const imageRef = ref(storage, `images/${imageName}`);

        // Upload the blob to Firebase Storage
        const uploadResult = await uploadBytesResumable(imageRef, blob);

        // Get the download URL for the uploaded image
        imageDownloadURL = await getDownloadURL(uploadResult.ref);
      }

      // Add goal to Firestore with the download URL if it exists
      await addDoc(collection(database, "goals"), {
        text: newGoal.text,
        owner: auth.currentUser.uid,
        imageUri: imageDownloadURL, // Save download URL in Firestore
      });
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  }

  return (
    <View>
      <FlatList
        data={goals}
        renderItem={({ item }) => <GoalItem goal={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
