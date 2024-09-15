import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';

export default function App() {
  const appName = 'my first react native app';
  
  const [inputText, setInputText] = useState('');
  const handleInputChange = (text) => {
    setInputText(text);
  };
  return (
    <View style={styles.container}>
      {/* <Text>Welcome to {appName}!</Text> */}
      <Header appName={appName} />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        placeholder='Type here!'
        onChangeText={handleInputChange}
        value={inputText}
      />
     <Text style={styles.output}>
        You entered: {inputText}
      </Text>

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
