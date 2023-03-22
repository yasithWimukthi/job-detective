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
import {firebase} from "../../firebaseConfig";

const ApplyJob = ({navigation}) => {
    // get current user details
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


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
        // update user details
        setIsSubmitting(true);
        const userDoc = firebase.firestore().collection("users").doc(firebase.auth()?.currentUser?.uid).update({
            name: name,
            email: email,
            phone: phone,
            description: description,
        })
        .then(() => {
            console.log("User updated successfully");
            setIsSubmitting(false);
            navigation.navigate("Profile");
        }).catch((error) => {
            console.log(error);
            setIsSubmitting(false);
        });
    };

    return (
        <NativeBaseProvider>
            <Image source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/job-detective-b2b72.appspot.com/o/myDocs%2FTiny%20people%20searching%20for%20business%20opportunities.jpg?alt=media&token=df08c090-4fa8-4c78-8a2d-5f004ce959fb',
            }} style={{width: '100%', height: 200, alignSelf: 'center'}}/>
            <ScrollView style={styles.scrollView}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}  style={{overflow: "scroll"}}>

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
                            style={styles.inputDescription}
                            placeholder="Description"
                            value={description}
                            onChangeText={(value) => setDescription(value)}
                            maxLength={500}
                            multiline
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
                                Update Profile
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
        marginHorizontal: 20,
    },
});

export default ApplyJob;
