import React, {Component, useEffect, useState} from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";
import { Button, Actionsheet, useDisclose, Box, Center, NativeBaseProvider } from "native-base";
import {firebase, storage} from "../../firebaseConfig";
import * as DocumentPicker from "expo-document-picker";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
function BottomSelector() {

    return <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                <Box w="100%" h={60} px={4} justifyContent="center">
                    <Text fontSize="16" color="gray.500" _dark={{
                        color: "gray.300"
                    }}>
                        Albums
                    </Text>
                </Box>
                <Actionsheet.Item>Delete</Actionsheet.Item>
                <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
                <Actionsheet.Item>Play</Actionsheet.Item>
                <Actionsheet.Item>Favourite</Actionsheet.Item>
                <Actionsheet.Item>Cancel</Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    </Center>;
}

function UserProfile(props) {

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    // get applied jobs details of current user
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [fileName, setFileName] = useState("");
    const [blobFile, setBlobFile] = useState(null);
    const [resumeUrl, setResumeUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // get current user document
        const userDoc = firebase.firestore().collection("users").doc(firebase.auth()?.currentUser?.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    setUser({ ...doc.data(), id: doc.id });
                    console.log(doc.data())
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [firebase.auth()?.currentUser?.uid]);

    const getCurrentUser = async () => {
        try {
            firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth()?.currentUser?.uid)
                .onSnapshot((doc) => {
                    if (doc.exists) {
                        setUser({ ...doc.data(), id: doc.id });
                        console.log(doc.data())
                    }
                });
            // setUser(user);
            // console.log(user);
        }catch (error) {
            console.log(error);
        }
    }

    const getAppliedJobsOfUser = async (userID) => {
        const appliedJobsArr = [];
        try {
            const querySnapshot = await firebase.firestore().collection("users").doc(userID);
            const appliedJobs = querySnapshot.get("appliedJobs");
            console.log(appliedJobs);
        }catch (error) {
            console.log(error);
        }
    }

    const selectFile = async () => {
        const result = await launchCamera(
            (response) => {
            console.log(response);
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.errorCode) {
                console.log("ImagePicker Error: ", response.errorCode);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                // const source = { uri: response.uri };
                // setFileName(response.fileName);
                // setBlobFile(response);
            }
        });
    };

    const isUploadCompleted = (isCompleted) => {
        console.log("isCompleted", isCompleted)
    }

    const UploadFile = (blobFile, fileName, isUploadCompleted) => {
        if (!blobFile) return;
        const sotrageRef = ref(storage, `profileImages/${fileName}`); //LINE A
        const uploadTask = uploadBytesResumable(sotrageRef, blobFile); //LINE B
        uploadTask.on(
            "state_changed", null,
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { //LINE C
                    console.log("File available at", downloadURL);
                    isUploadCompleted(true)
                    setResumeUrl(downloadURL)
                    //update current user document with profile image url
                    firebase.firestore().collection("users").doc(firebase.auth()?.currentUser?.uid).update({
                        profileImage: downloadURL
                    }).then(() => {
                        console.log("Profile image updated successfully")
                    }).catch((error) => {
                        console.log(error)
                    });
                    setUser({...user, profileImage: downloadURL})
                    return downloadURL
                });
            }
        );

    }

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({})
        if (result != null) {
            const r = await fetch(result.uri);
            const b = await r.blob();
            setFileName(result.name)
            setBlobFile(b)
        }
        setIsLoading(false)

        await UploadFile(blobFile, fileName, isUploadCompleted);
    }




    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity = { .5 } onPress={onOpen }>
            <Image
                source={{
                    uri: user.profileImage|| 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
                }}
                resizeMode="contain"
                style={styles.image}
            ></Image>
            </TouchableOpacity>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.description}>
                {user.description || "Associate Full Stack Engineer | Software Engineering Undergraduate at SLIIT | Developer | Blogger | Tech Enthusiast"}
            </Text>


            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <Center>
                        <Actionsheet isOpen={isOpen} onClose={onClose}>
                            <Actionsheet.Content>
                                <Box w="100%" h={60} px={4} justifyContent="center">
                                    <Text fontSize="16" color="gray.500" _dark={{
                                        color: "gray.300"
                                    }} style={{textAlign:'center'}}>
                                        Choose a method
                                    </Text>
                                </Box>
                                <Actionsheet.Item onPress={selectFile}>Open Camera</Actionsheet.Item>
                                <Actionsheet.Item onPress={pickDocument}>Select from gallery</Actionsheet.Item>
                            </Actionsheet.Content>
                        </Actionsheet>
                    </Center>
                </Center>
            </NativeBaseProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 50,
        marginTop: 20,
        marginLeft: 19
    },
    name: {
        // fontFamily: "roboto-700",
        color: "rgba(39,41,50,1)",
        fontSize: 30,
        letterSpacing: 2,
        marginTop: 22,
        marginLeft: 19
    },
    description: {
        // fontFamily: "roboto-regular",
        color: "rgba(157,163,167,1)",
        marginLeft: 19
    }
});

export default UserProfile;
