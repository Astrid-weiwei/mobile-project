import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Modal } from 'react-native';

export default function Input({ visible, onConfirm }) {
  const [text, setText] = useState('');

  const handleConfirm = () => {
    onConfirm(text); // Pass input data back to the parent
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {/* TextInput with updated styling */}
        <TextInput
          placeholder="Type something"
          keyboardType="default"
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
        {/* Button wrapped in a View for styling */}
        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} />
        </View>
        {/* Text component styling */}
        <Text style={styles.text}>Your text will appear here after you submit.</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',  // Input field takes 80% of the available width
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
    marginBottom: 10,
    fontSize: 18,  // Adjust font size
    padding: 5,  // Add some padding
  },
  buttonContainer: {
    width: '30%',  // Button takes 30% of available width
    margin: 10,  // Margin around the button
  },
  text: {
    fontSize: 16,  // Adjust font size
    color: 'grey',
    marginTop: 10,  // Add margin to top
  },
});
