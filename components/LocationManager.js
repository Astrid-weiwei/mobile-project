// LocationManager.js
import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationManager = () => {
  const [location, setLocation] = useState(null);

  const locateUserHandler = async () => {
    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Allow location access in settings to use this feature.');
        return;
      }

      // Get current location
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
