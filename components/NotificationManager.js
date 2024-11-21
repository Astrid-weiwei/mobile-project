import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationManager = () => {
  // Function to verify notification permissions
  const verifyPermission = async () => {
    try {
      const permissionStatus = await Notifications.getPermissionsAsync();
      if (permissionStatus.granted) {
        return true; // Permission is already granted
      }

      // Request permissions if not granted
      const requestStatus = await Notifications.requestPermissionsAsync();
      return requestStatus.granted; // Return whether the user granted permissions
    } catch (err) {
      console.error("Error checking permissions:", err);
      return false; // In case of an error, assume permission not granted
    }
  };

  // Function to schedule a notification
  const scheduleNotificationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permission Required",
        "Notifications permission is required to set reminders."
      );
      return;
    }

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
