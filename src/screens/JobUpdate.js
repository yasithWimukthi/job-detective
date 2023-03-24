import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import JobCard from "../components/JobCard";
import { firebase } from "../../firebaseConfig";
import { Select } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { NativeBaseProvider } from "native-base";
import jobPostsDummy from "../data/jobs";
import Loading from "../components/Loading";

const JobUpdate = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setdate] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { id, iconColor } = route.params;

  let userId = firebase.auth()?.currentUser?.uid || "001";

  const getJobPost = async () => {
    try {
      setLoading(true);

      await firebase
        .firestore()
        .collection("jobPosts")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setTitle(doc.data().title);
            setDescription(doc.data().description);
            setSalary(doc.data().salary);
            setdate(doc.data().date);
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get the job post from the firestore database
    getJobPost();
  }, []);

  const handleUpdate = async () => {
    if (title && salary && description) {
      // update job post in database

      // create a new job post object
      const updatedJobPost = {
        //TODO: change userID to the current user's ID
        userID: userId,
        title,
        description,
        salary: salary,
        date: date,
      };

      try {
        setSubmitting(true);
        // update the job post object in the firestore database
        await firebase
          .firestore()
          .collection("jobPosts")
          .doc(id)
          .update(updatedJobPost);

        setSubmitting(false);

        // navigate back to job post list page
        navigation.goBack();
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Failed to update job post");
      }
    } else {
      // display error message
      alert("Please fill out all required fields");
    }
  };

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Text style={styles.previewText}>Preview</Text>
              <View style={styles.jobPreview}>
                <JobCard
                  item={{
                    title: title ? title : "Job Title",
                    description: description
                      ? description
                      : "This is a job description, it should be at least 100 characters long.",
                    salary: salary ? salary : "150000",
                    date: new Date().toLocaleString().split(",")[0],
                  }}
                  disableCard={true}
                  iconBG={iconColor}
                />
              </View>
              <Select
                selectedValue={title}
                placeholder="Select Job Title"
                onValueChange={(itemValue) => setTitle(itemValue)}
                borderRadius={8}
                height={50}
                accessibilityLabel="Select Job Title"
                _selectedItem={{
                  bg: "grey.100",
                  endIcon: <FontAwesome5 name="check" size={20} color="grey" />,
                  borderRadius: 8,
                }}
              >
                {jobPostsDummy.map((item, key) => (
                  <Select.Item
                    label={item.title}
                    value={item.title}
                    key={key}
                  />
                ))}
              </Select>
              <TextInput
                style={styles.inputDescription}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                // maxLength={1000}
                multiline
                required
              />
              <TextInput
                style={styles.input}
                placeholder="Salary"
                value={salary}
                onChangeText={(text) => setSalary(text)}
                keyboardType="numeric"
                required
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleUpdate}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  jobPreview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  previewText: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    color: "#666",
  },
  jobImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  jobText: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  jobSalary: {
    fontSize: 16,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  inputDescription: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    height: 200,
  },
  inputSelect: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#1253bc",
    padding: 10,
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

export default JobUpdate;
