import React, { useState } from 'react';
import { View, TextInput, Button, Modal, StyleSheet } from 'react-native';

const Input = ({ visible, onConfirm }) => {
  const [enteredText, setEnteredText] = useState('');

  const handleConfirm = () => {
    onConfirm(enteredText);  // Call the callback and pass the input text
    setEnteredText('');  // Clear the input after confirming
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}  // Makes the modal's background transparent
    >
      {/* Outer transparent container */}
      <View style={styles.modalContainer}>
        {/* Inner container with background color and rounded corners */}
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="Type your goal"
            style={styles.input}
            value={enteredText}
            onChangeText={setEnteredText}
          />
          <Button title="Confirm" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
  },
  innerContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',  // Add background color to the inner view
    borderRadius: 10,  // Rounded corners
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,  // Shadow effect
  },
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
  },
});

export default Input;
