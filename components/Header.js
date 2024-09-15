import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ appName }) => {
  return (
    <View>
      <Text>Welcome to {appName}!</Text>
    </View>
  );
}

export default Header;