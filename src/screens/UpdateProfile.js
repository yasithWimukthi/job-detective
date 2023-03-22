import React, {useEffect, useState} from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Image,
} from "react-native";
import { NativeBaseProvider, Button, Icon, VStack} from "native-base";
import {Ionicons} from "@expo/vector-icons";

const ApplyJob = ({route, navigation}) => {
    // get current user details
    const [name, setName] = useState();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
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
                    setDescription(doc.data().description)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [firebase.auth()?.currentUser?.uid]);



    const handleSubmit = async () => {
        // add details to applicants field of corresponding job post
        await UploadFile(blobFile, fileName, isUploadCompleted);

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
            <Image source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/job-detective-b2b72.appspot.com/o/myDocs%2FTiny%20people%20searching%20for%20business%20opportunities.jpg?alt=media&token=df08c090-4fa8-4c78-8a2d-5f004ce959fb',
            }} style={{width: '100%', height: 200, alignSelf: 'center'}}/>
            <ScrollView style={styles.scrollView}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{overflow: "scroll"}}>

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
                        <VStack space={4}>
                            <Button isLoading={isSubmitting} _loading={{
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
                        </VStack>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
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
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
});

export default ApplyJob;
