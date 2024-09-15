import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from './components/Header';

export default function App() {
  const appName = 'my first react native app';
  
  return (
    <View style={styles.container}>
      {/* <Text>Welcome to {appName}!</Text> */}
      <Header appName={appName} />
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
