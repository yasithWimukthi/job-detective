import React, {useEffect, useState} from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import {Input, NativeBaseProvider, Button, Stack, Center, Icon} from "native-base";
import {firebase, storage} from "../../firebaseConfig";
import * as DocumentPicker from "expo-document-picker";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { Ionicons } from "@expo/vector-icons";

const ApplyJob = ({route,navigation}) => {
    // get current user details
    const [name, setName] = useState();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [currentPosition, setCurrentPosition] = useState("");
    const [fileName, setFileName] = useState("");
    const [blobFile, setBlobFile] = useState(null);
    const [resumeUrl, setResumeUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {id} = route.params;

    useEffect(() => {
        // get current user document
        const userDoc = firebase.firestore().collection("users").doc(firebase.auth()?.currentUser?.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    console.log(doc.data())
                    setName(doc.data().name)
                    setEmail(doc.data().email)
                    setPhone(doc.data().phone)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },[firebase.auth()?.currentUser?.uid]);


    const pickDocument = async () => {
        setIsLoading(true)
        let result = await DocumentPicker.getDocumentAsync({})
        if (result != null) {
            const r = await fetch(result.uri);
            const b = await r.blob();
            setFileName(result.name)
            setBlobFile(b)
        }
        setIsLoading(false)
    }


    const isUploadCompleted = (isCompleted) => {
        console.log("isCompleted", isCompleted)
    }

    const UploadFile = (blobFile, fileName, isUploadCompleted) => {
        setIsSubmitting(true)
        if (!blobFile) return;
        const sotrageRef = ref(storage, `myDocs/${fileName}`); //LINE A
        const uploadTask = uploadBytesResumable(sotrageRef, blobFile); //LINE B
        uploadTask.on(
            "state_changed", null,
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { //LINE C
                    console.log("File available at", downloadURL);
                    isUploadCompleted(true)
                    setResumeUrl(downloadURL)
                    return downloadURL
                });
            }
        );

    }

    const handleSubmit = async () => {
        // add details to applicants field of corresponding job post
        await UploadFile(blobFile,fileName,isUploadCompleted);

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
                    resumeUrl,
                }),
            })
            .then(() => {
                console.log("Applicant added");
                setCurrentPosition("");
                setYearsOfExperience("");
                setPhone("");
                setEmail("");
                setName("");
                setIsSubmitting(false)
                navigation.goBack();
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
                        required
                    />
                    {/*<TouchableOpacity style={styles.button} onPress={pickDocument}>*/}
                    {/*    <Text style={styles.buttonText}>Choose Resume</Text>*/}
                    {/*</TouchableOpacity>*/}
                    <Button leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />} isLoading={isLoading} _loading={{
                        bg: "amber.400:alpha.70",
                        _text: {
                            color: "coolGray.700"
                        }
                    }} _spinner={{
                        color: "white"
                    }} isLoadingText="Submitting"
                    onPress={pickDocument}>
                        Pick Resume
                    </Button>
                    {/*<TouchableOpacity style={styles.button} onPress={handleSubmit}>*/}
                    {/*    <Text style={styles.buttonText}>Apply</Text>*/}
                    {/*</TouchableOpacity>*/}
                    <Button  isLoading={isSubmitting} _loading={{
                        bg: "amber.400:alpha.70",
                        _text: {
                            color: "coolGray.700"
                        }
                    }} _spinner={{
                        color: "white"
                    }} isLoadingText="Submitting"
                            onPress={handleSubmit}
                    >
                        Apply Now
                    </Button>
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
