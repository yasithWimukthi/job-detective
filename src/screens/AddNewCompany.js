//screen to add new company and save it to the firebase database
//a company has a name, description, ratings, location, and  industry
//the company is saved to the firebase firestore database
//the company add form should use native base components and styling

import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { firebase } from "../../firebaseConfig";
import { Select } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeBaseProvider } from "native-base";

export default function AddNewCompany({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = async () => {
    if (name && description && ratings && location && industry) {
      // submit job post to database

      // create a new job post object
      const company = {
        name,
        description,
        ratings,
        location,
        industry,
      };

      try {
        // save the job post object to the firestore database
        await firebase.firestore().collection("companies").add(company);

        // navigate back to job post list page
        navigation.goBack();
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Failed to save job post");
      }
    } else {
      Alert.alert("Error", "Please fill all the fields");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
      alignItems: "center",
      padding: 10,
    },
    form: {
      padding: 40,
      width: "98%",
      height: "98%",
      backgroundColor: "#ffffff",

      borderRadius: 10,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      borderRadius: 5,
      marginBottom: 24,
    },
    inputContainerDes: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      borderRadius: 5,
      marginBottom: 24,
    },
    input: {
      marginLeft: 10,
      flex: 1,
    },
    inputDes: {
      marginLeft: 10,
      flex: 1,
    },
    button: {
      backgroundColor: "#0891b2",
      padding: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="building" size={20} color="#000" />
            <TextInput
              maxLength={20}
              style={styles.input}
              placeholder="Company Name"
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View style={styles.inputContainerDes}>
            <FontAwesome5 name="pen-alt" size={20} color="#000" />
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={200}
              defaultValue="Company Description"
              style={styles.inputDes}
              placeholder="Company Description"
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="star-half-alt" size={20} color="#000" />
            <TextInput
              style={styles.input}
              placeholder="Company Ratings"
              onChangeText={(text) => setRatings(text)}
              value={ratings}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="map-marker-alt" size={20} color="#000" />
            <TextInput
              maxLength={20}
              style={styles.input}
              placeholder="Company Location"
              onChangeText={(text) => setLocation(text)}
              value={location}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="industry" size={20} color="#000" />
            <TextInput
              maxLength={20}
              style={styles.input}
              placeholder="Company Industry"
              onChangeText={(text) => setIndustry(text)}
              value={industry}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add Company</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
