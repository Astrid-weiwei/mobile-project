import { Alert, Button, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ receiveImageUri }) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null); // Use `null` instead of an empty string for clarity

  // Function to check and request camera permission
  async function verifyPermission() {
    try {
      if (response.granted) {
        return true;
      }
      
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log("Permission verification error: ", err);
      return false;
    }
  }


  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("Camera permission required", "You need to give permission for the camera to take an image.");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5, // Adjust image quality to save storage
      });

      // Access the first element of the assets array and get the URI
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri } = result.assets[0];
        setImageUri(uri); // Set the image URI for preview
        receiveImageUri(uri); // Pass the URI back to the parent component
      }
    } catch (err) {
      console.log("Error taking image: ", err);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Take An Image" onPress={takeImageHandler} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          alt="preview of the image taken"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
