import { Alert, Button, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ receiveImageUri }) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);

  async function verifyPermission() {
    if (response.granted) return true;
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("Camera permission required", "You need to give permission to use the camera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      receiveImageUri(uri); // Send URI back to Input.js
    }
  }

  return (
    <View>
      <Button title="Take An Image" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
