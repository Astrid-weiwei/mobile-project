// LocationManager.js
import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationManager = () => {
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();

  // Function to check and request permission if not granted
  const verifyPermission = async () => {
    if (response?.granted) {
      return true; // Permission is already granted
    }

    // Request permission if not granted
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  };

  // Handler to locate user
  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Location permission is required to use this feature. Please grant permission in settings.'
      );
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
    } catch (err) {
      Alert.alert('Error', 'Could not fetch location. Please try again later.');
      console.error(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Locate Me" onPress={locateUserHandler} />
      {location && (
        <Text>Location: {`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`}</Text>
      )}
    </View>
  );
};

export default LocationManager;
