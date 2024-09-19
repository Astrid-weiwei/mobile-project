import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Input from './components/Input';

export default function App() {
  // State to manage the modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  
  // State to store the user's input
  const [enteredText, setEnteredText] = useState('');

  // Callback function to handle the text entered in the modal
  const handleInputData = (inputText) => {
    setEnteredText(inputText);
    setModalVisible(false);  // Close the modal after confirming input
  };

  return (
    <View style={styles.container}>
      {/* Button to open the modal */}
      <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      
      {/* Display the entered text */}
      <Text style={styles.text}>Entered Text: {enteredText}</Text>
      
      {/* Input modal - passing the modal visibility and callback function */}
      <Input visible={modalVisible} onConfirm={handleInputData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 20,
    color: 'blue',
  },
});
