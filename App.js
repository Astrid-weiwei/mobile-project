import React, { useState } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, Alert } from 'react-native';
import Input from './components/Input';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [enteredText, setEnteredText] = useState('');

  // Callback for confirming input
  const handleInputData = (inputText) => {
    setEnteredText(inputText);
    setModalVisible(false);
  };

  // Callback for canceling input
  const handleCancelInput = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel?",
      [
        { text: "No" },
        { text: "Yes", onPress: () => setModalVisible(false) }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.text}>Entered Text: {enteredText}</Text>
      </View>

      {/* Pass the handleInputData and handleCancelInput as callbacks */}
      <Input 
        visible={modalVisible} 
        onConfirm={handleInputData} 
        onCancel={handleCancelInput}
      />
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
    backgroundColor: '#f8f8f8',
  },
  bottomSection: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: 'blue',
  },
});
