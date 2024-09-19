
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

export default function Input({ shouldFocus }) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (shouldFocus) {
      inputRef.current.focus(); // Automatically focus the TextInput
    }
  }, [shouldFocus]);

  function handleBlur() {
    setIsFocused(false);
  }

  function handleFocus() {
    setIsFocused(true);
  }
  function handleConfirm() {
    console.log(text);
  }
  function updateText() {
    setText(changeText);
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
        value={text}
        placeholder="Type something..."
        onChangeText={setText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {/* Real-time character count */}
      {isFocused && text.length > 0 && (
        <Text style={styles.charCount}>Character count: {text.length}</Text>
      )}
      
      {/* Show message after losing focus */}
      {!isFocused && text.length > 0 && (
        <Text style={styles.message}>
          {text.length >= 3 ? "Thank you" : "Please type more than 3 characters"}
        </Text>
      )}
      <Button 
        title="Confirm"  // Required prop: Button text
        onPress={handleConfirm}  // Required prop: Event handler function
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    marginBottom: 10,
    padding: 10,
  },
  charCount: {
    color: 'gray',
    marginTop: 5,
  },
  message: {
    color: 'red',
    marginTop: 5,
  },
});
