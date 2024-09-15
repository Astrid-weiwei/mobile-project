
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function Input() {
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        value={text}
        onChangeText={(newText) => setText(newText)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    marginBottom: 20,
    padding: 10,
  },
});
