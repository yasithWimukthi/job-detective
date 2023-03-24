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
import Toast from "react-native-toast-message";

const InterviewEditScreen = ({ navigation, route }) => {
  const [id, setId] = useState(route.params.item.id);
  const [question, setQuestion] = useState(route.params.item.question);
  const [answer, setAnswer] = useState(route.params.item.answer);
  const [qtype, setQtype] = useState(route.params.item.qtype);
  const [status, setStatus] = useState(route.params.item.status);

  const handleUpdate = async () => {
    if (question && answer && qtype) {
      const updatedInterview = {
        userID: firebase.auth()?.currentUser?.uid || "001",
        question,
        answer,
        qtype,
        status,
      };

      try {
        // update the interview post object in the firestore database
        await firebase
          .firestore()
          .collection("interviews")
          .doc(id)
          .update(updatedInterview);

        // show a success toast message
        Toast.show({
          type: "success",
          text1: "Interview updated",
          text2: "Your interview post has been successfully updated",
        });

        // navigate back to interviews post list page
        navigation.goBack();
      } catch (error) {
        console.log(error);
        // show an error toast message
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to update interview post",
        });
        alert("Error", "Failed to update interviews post");
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
              value={qtype}
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
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update Interview</Text>
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

export default InterviewEditScreen;
