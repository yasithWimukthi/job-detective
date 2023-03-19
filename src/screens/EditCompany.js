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

export default function EditCompany({ navigation, route }) {
  const [id, setId] = useState(route.params.company.id);
  const [name, setName] = useState(route.params.company.name);
  const [description, setDescription] = useState(
    route.params.company.description
  );
  const [ratings, setRatings] = useState(route.params.company.ratings);
  const [location, setLocation] = useState(route.params.company.location);
  const [industry, setIndustry] = useState(route.params.company.industry);

  //method to update company in firebase firestore
  const updateCompany = async () => {
    try {
      await firebase.firestore().collection("companies").doc(id).update({
        name,
        description,
        ratings,
        location,
        industry,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  //method to delete company from firebase firestore
  const deleteCompany = async () => {
    try {
      await firebase.firestore().collection("companies").doc(id).delete();
      navigation.goBack();
    } catch (error) {
      console.log(error);
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
      marginBottom: 7,
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
    },
    buttonDel: {
      backgroundColor: "#b30000",
      padding: 15,
      borderRadius: 5,
      marginBottom: 7,
    },
    buttonTextDel: {
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
          <TouchableOpacity style={styles.button} onPress={updateCompany}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDel} onPress={deleteCompany}>
            <Text style={styles.buttonTextDel}>Delete Permanently</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
