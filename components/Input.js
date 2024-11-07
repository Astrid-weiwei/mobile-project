import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View, Image, Alert } from "react-native";
import ImageManager from "./ImageManager";

export default function Input({ textInputFocus, inputHandler, modalVisible, dismissModal }) {
  const [text, setText] = useState("");
  const [imageUri, setImageUri] = useState(null); // State to store the image URI
  const [blur, setBlur] = useState(false);
  const minimumChar = 3;

  // Function to handle text input
  function updateText(changedText) {
    setText(changedText);
  }

  // Function to handle confirmation
  function handleConfirm() {
    if (text.length >= minimumChar) {
      const newGoal = { text, imageUri }; // Pass both text and imageUri
      inputHandler(newGoal); // Send object to Home.js
      setText("");
      setImageUri(null); // Reset the image URI
    } else {
      Alert.alert("Error", "Please enter more text.");
    }
  }

  // Function to receive the image URI from ImageManager
  function handleImageUri(uri) {
    setImageUri(uri);
  }

  // Handle cancellation
  function handleCancel() {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          setText("");
          setImageUri(null);
          dismissModal();
        },
      },
    ]);
  }

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <TextInput
            autoFocus={textInputFocus}
            placeholder="Type something"
            style={styles.input}
            value={text}
            onChangeText={updateText}
            onBlur={() => setBlur(true)}
            onFocus={() => setBlur(false)}
          />
          {blur && text.length < minimumChar && (
            <Text>Please type more than {minimumChar} characters</Text>
          )}
          <ImageManager receiveImageUri={handleImageUri} /> {/* Pass the handler function to ImageManager */}
          {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
          <View style={styles.buttonsRow}>
            <Button title="Cancel" onPress={handleCancel} />
            <Button title="Confirm" onPress={handleConfirm} disabled={text.length < minimumChar} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    alignItems: "center",
    padding: 20,
  },
  input: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    color: "blue",
    marginVertical: 5,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
