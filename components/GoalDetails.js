import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import PressableButton from "./PressableButton";
import { updateDB } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseConfig"; // Ensure correct path

export default function GoalDetails({ navigation, route }) {
  const [warning, setWarning] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  function warningHandler() {
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
    updateDB(route.params.goalObj.id, { warning: true }, "goals");
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressedFunction={warningHandler}
            componentStyle={{ backgroundColor: "purple" }}
          >
            <AntDesign name="warning" size={24} color="white" />
          </PressableButton>
        );
      },
    });

    const fetchImage = async () => {
      if (route.params && route.params.goalObj.imageUri) {
        try {
          const reference = ref(storage, route.params.goalObj.imageUri);
          const url = await getDownloadURL(reference);
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
    };

    fetchImage();
  }, [navigation, route.params]);

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

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      )}

      <Button
        title="More Details"
        onPress={() => {
          navigation.push("Details");
        }}
      />
      {route.params && <GoalUsers goalId={route.params.goalObj.id} />}
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
  imageStyle: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
});
