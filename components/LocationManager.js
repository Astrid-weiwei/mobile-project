import React, { useEffect, useState } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { saveUserLocation, getUserLocation } from './firestoreHelper'; // Import helper functions
import { auth } from './firebaseSetup'; // Ensure Firebase auth is imported

const LocationManager = () => {
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();

  const verifyPermission = async () => {
    if (response?.granted) {
      return true;
    }
    const permissionResponse = await requestPermission();
    return permissionResponse.granted;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Location permission is required to use this feature. Please grant permission in settings.');
      return;
    }
    try {
      const locationData = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
    } catch (err) {
      Alert.alert('Error', 'Could not fetch location. Please try again later.');
      console.error(err);
    }
  };

  const saveLocationHandler = async () => {
    if (!location) {
      Alert.alert('No Location Found', 'Please locate your position first.');
      return;
    }
    try {
      const uid = auth.currentUser.uid; // Get current user ID
      await saveUserLocation(uid, location); // Save location to Firestore
      Alert.alert('Success', 'Location saved successfully!');
    } catch (err) {
      console.log('Error saving location:', err);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const uid = auth.currentUser.uid; // Get current user ID
      const savedLocation = await getUserLocation(uid); // Fetch location from Firestore
      if (savedLocation) {
        setLocation(savedLocation);
        console.log("Location loaded from Firestore:", savedLocation);
      }
    };
    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Find My Location" onPress={locateUserHandler} />
      {location && (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}
      <Button title="Save Location" onPress={saveLocationHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});

export default LocationManager;
