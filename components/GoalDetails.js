import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button title="Warning" color="white" onPress={warningHandler} />
        );
      },
    });
  }, []);
  return (
    <View>
      {route.params ? (
        <Text style={warning && styles.warningStyle}>
          Details of {route.params.goalObj.text} goal with
          {route.params.goalObj.id}
        </Text>
      ) : (
        <Text>More Details</Text>
      )}
      <Button
        title="More Details"
        onPress={() => {
          navigation.push("Details");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
});