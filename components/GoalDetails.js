import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";

export default function GoalDetails({ goal }) {
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  useEffect(() => {
    async function fetchImageURL() {
      if (goal.imageUri) {
        try {
          // Create a reference to the image in Firebase Storage
          const imageRef = ref(storage, goal.imageUri);
          
          // Get the download URL for the image
          const url = await getDownloadURL(imageRef);
          setImageDownloadURL(url);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
    }

    fetchImageURL();
  }, [goal.imageUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{goal.text}</Text>
      
      {/* Display the image if the download URL is available */}
      {imageDownloadURL && (
        <Image source={{ uri: imageDownloadURL }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
