//screen to add new Interview questions and save it to the firebase database
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

export default function AddInterviewQuestion({ navigation }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qtype, setQtype] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = async () => {
    if (question && answer && qtype && status) {
      // submit interview post to database

      // create a new interview post object
      const interviews = {
        //TODO: change userID to the current user's ID
        userID: firebase.auth()?.currentUser?.uid || "001",
        question,
        answer,
        qtype,
        status: false,
      };

      try {
        setSubmitting(true);
        // save the interview post object to the firestore database
        await firebase.firestore().collection("interviews").add(interviews);

        setSubmitting(false);

        // navigate back to interviews post list page
        navigation.goBack();
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Failed to save interview post");
      }
    } else {
      // display error message
      alert("Please fill out all required fields");
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
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.form}>
            <Select
              selectedValue={qtype}
              placeholder="Select Question Type"
              onValueChange={(itemValue) => setQtype(itemValue)}
              borderRadius={8}
              height={50}
              accessibilityLabel="Select Question Type"
              _selectedItem={{
                bg: "grey.100",
                endIcon: <FontAwesome5 name="check" size={20} color="grey" />,
                borderRadius: 8,
              }}
            >
              <Select.Item label="Common" value="Common" />
              <Select.Item label="Technical" value="Technical" />
            </Select>

            <View style={styles.inputContainer}>
              <FontAwesome5 name="question" size={20} color="#000" />
              <TextInput
                maxLength={20}
                style={styles.input}
                placeholder="Question"
                onChangeText={(text) => setQuestion(text)}
                value={question}
              />
            </View>
            <View style={styles.inputContainerDes}>
              <FontAwesome5 name="pen-alt" size={20} color="#000" />
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={200}
                style={styles.inputDes}
                placeholder="Answer"
                onChangeText={(text) => setAnswer(text)}
                value={answer}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Interview</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
}
