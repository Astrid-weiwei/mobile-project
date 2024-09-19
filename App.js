import React, { useState } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>
      
      <View style={styles.bottomSection}>
        <Text style={styles.text}>Entered Text: {enteredText}</Text>
      </View>
      
      {/* Input modal - passing the modal visibility and callback function */}
      <Input visible={modalVisible} onConfirm={handleInputData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Optional: Background color for header
  },
  bottomSection: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Background color for bottom section
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: 'blue',
  },
});
