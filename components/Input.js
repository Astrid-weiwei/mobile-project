
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Input() {
  const [text, setText] = useState("");

  // Function to handle the Confirm button press
  const handleConfirm = () => {
    console.log(text); // Logs the current input value
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type something"
        keyboardType="default"
        style={styles.input}
        value={text}
        onChangeText={setText} // Updates state with typed input
      />
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
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
