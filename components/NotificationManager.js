import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationManager = () => {
  const scheduleNotificationHandler = async () => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder!",
          body: "This is your scheduled notification.",
          data: { extraData: "Some additional data" },
        },
        trigger: {
          seconds: 10, // Notification will be triggered 10 seconds from now
        },
      });
      Alert.alert("Success", `Notification scheduled with ID: ${notificationId}`);
    } catch (err) {
      console.error("Error scheduling notification:", err);
      Alert.alert("Error", "Failed to schedule notification.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Set Reminder" onPress={scheduleNotificationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});

export default NotificationManager;
