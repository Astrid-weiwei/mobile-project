import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';

export default function Input({ visible, onConfirm, onCancel }) {
  const [inputText, setInputText] = useState('');

  // Handler for Confirm button
  const handleConfirm = () => {
    onConfirm(inputText);
    setInputText('');  // Clear input on confirm
  };

  // Handler for Cancel button
  const handleCancel = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel?",
      [
        { text: "No" },
        { text: "Yes", onPress: () => {
          onCancel();
          setInputText('');  // Clear input on cancel
        }}
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter a goal"
          value={inputText}
          onChangeText={setInputText}
        />

        {/* Display two buttons horizontally with space between */}
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={handleCancel}
            style={styles.button}
          />
          <Button
            title="Confirm"
            onPress={handleConfirm}
            disabled={inputText.length < 3} 
            style={styles.button}
          />
        </View>

        {/* Adding two Image components */}
        <Image
          style={styles.image}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}  // Network image
          alt="network image"
        />
        <Image
          style={styles.image}
          source={require('../assets/local-image.png')}  // Local image
          alt="local image"
        />
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
    width: '80%',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
