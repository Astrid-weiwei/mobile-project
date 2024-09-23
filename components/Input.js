import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({ textInputFocus, inputHandler, modalVisible }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);

  function updateText(changedText) {
    setText(changedText);
  }
  function handleConfirm() {
    // call the callback fn received from App.js
    // pass what user has typed
    inputHandler(text);
  }
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <View style={styles.container}>
        <TextInput
          autoFocus={textInputFocus}
          placeholder="Type something"
          keyboardType="default"
          style={styles.input}
          value={text}
          onChangeText={updateText}
          onBlur={() => {
            setBlur(true);
          }}
          onFocus={() => {
            setBlur(false);
          }}
        />
        {blur ? (
          text.length >= 3 ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type more than 3 characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    color: "blue",
  },
  buttonContainer: {
    width: "30%",
    marginVertical: 5,
  },
});