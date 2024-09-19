
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Input() {
  const [text, setText] = useState("");

  // Function to handle the Confirm button press
  const handleConfirm = () => {
    console.log(text); // Logs the current input value
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          placeholder="Type something"
          keyboardType="default"
          style={{ borderBottomColor: 'purple', borderBottomWidth: 2 }}
          value={text}
          onChangeText={setText} // Update text as user types
        />
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  input: {
    borderBottomColor: "purple",
    borderBottomWidth: 2,
    marginBottom: 10
  }
});
