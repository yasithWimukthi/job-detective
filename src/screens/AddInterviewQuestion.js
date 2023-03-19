import React, { useEffect, useState } from "react";
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

const AddInterviewQuestion = ({ navigation }) => {
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

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.form}>
            <Select
              selectedValue={qtype}
              placeholder="Question Type"
              onValueChange={(itemValue) => setQtype(itemValue)}
              borderRadius={8}
              height={55}
              accessibilityLabel="Select Question Type"
              _selectedItem={{
                bg: "grey.100",
                endIcon: <FontAwesome5 name="check" size={20} color="grey" />,
                borderRadius: 8,
              }}
              style={styles.inputType}
            >
              <Select.Item label="Common" value="Common" />
              <Select.Item label="Technical" value="Technical" />
            </Select>
            <TextInput
              style={styles.input}
              placeholder="Question"
              onChangeText={(text) => setQuestion(text)}
              value={question}
            />
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={200}
              style={styles.input}
              placeholder="Answer"
              onChangeText={(text) => setAnswer(text)}
              value={answer}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Interview</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  inputType: {
    flex: 1,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#1253bc",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AddInterviewQuestion;
