import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);

  function confirmCoordinateHandler() {
    navigation.navigate("Profile", { selectedLocation });
  }
  useEffect(() => {
    if (route.params && route.params.initialLocation) {
      console.log("use effect ", route.params.initialLocation);

      setInitialLocation(route.params.initialLocation);
    }
  }, []);
  return (
    <>
      <MapView
        initialRegion={{
          latitude: initialLocation ? initialLocation.latitude : 37.78825,
          longitude: initialLocation ? initialLocation.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        onPress={(e) => {
          setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <Button
        disabled={!selectedLocation}
        title="Confirm Selected Coordinate"
        onPress={confirmCoordinateHandler}
      />
    </>
  );
}

const styles = StyleSheet.create({ map: { flex: 1 } });