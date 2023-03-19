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
import { NativeBaseProvider } from "native-base";
import {firebase} from "../../firebaseConfig";


const ApplyJob = ({ route }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [currentPosition, setCurrentPosition] = useState("");
    const { id } = route.params;

    const handleSubmit = async () => {
        // add details to applicants field of corresponding job post
        firebase
            .firestore()
            .collection("jobPosts")
            .doc(id)
            .update({
                applicants: firebase.firestore.FieldValue.arrayUnion({
                    name,
                    email,
                    phone,
                    yearsOfExperience,
                    currentPosition,
                }),
            })
            .then(() => {
                console.log("Applicant added");
                setCurrentPosition("");
                setYearsOfExperience("");
                setPhone("");
                setEmail("");
                setName("");
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={(value) => setName(value)}
                        keyboardType="text"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        keyboardType="email-address"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
                        keyboardType="phone-pad"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Years of Experience"
                        value={yearsOfExperience}
                        onChangeText={(value) => setYearsOfExperience(value)}
                        keyboardType="numeric"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Current Position"
                        value={currentPosition}
                        onValueChange={(value) => setCurrentPosition(value)}
                        keyboardType="text"
                        required
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
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

export default ApplyJob;
