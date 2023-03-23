import React, {Component, useEffect, useState} from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity, FlatList} from "react-native";
import {Button, Actionsheet, useDisclose, Box, Center, NativeBaseProvider} from "native-base";
import {firebase, storage} from "../../firebaseConfig";
import * as DocumentPicker from "expo-document-picker";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from "@react-navigation/native";
import JobCard from "../components/JobCard";
import {FloatingAction} from "react-native-floating-action";
import AppliedJobCard from "../components/AppliedJobCard";

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

    const navigation = useNavigation();

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
                    setUser({...doc.data(), id: doc.id});
                }
            })
            .catch((error) => {
                console.log(error);
            });

        getAppliedJobsOfUser(firebase.auth()?.currentUser?.uid);
    }, [firebase.auth()?.currentUser?.uid]);


    const getCurrentUser = async () => {
        try {
            firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth()?.currentUser?.uid)
                .onSnapshot((doc) => {
                    if (doc.exists) {
                        setUser({...doc.data(), id: doc.id});
                        console.log(doc.data())
                    }
                });
            // setUser(user);
            // console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    const getAppliedJobsOfUser = async (userID) => {
        const appliedJobsArr = [];
        try {
            await firebase.firestore().collection('users').doc(firebase.auth()?.currentUser?.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const appliedJobs = doc.data().appliedJobs; // get the array of applied jobs from the document data

                        // log the array of applied job document IDs
                        console.log(appliedJobs);

                        // loop through the array of applied job document IDs and retrieve the jobs where document ID matches
                        appliedJobs.forEach((jobID) => {
                            console.log(jobID);
                            firebase.firestore().collection('jobPosts').doc(jobID).get()
                                .then((doc) => {
                                    if (doc.exists) {
                                        setAppliedJobs([...appliedJobsArr, doc.data()]);
                                        appliedJobsArr.push(doc.data());
                                        console.log(doc.data())
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                        setAppliedJobs(appliedJobsArr);
                    } else {
                        console.log('No such document!');
                    }
                })
                .catch((error) => {
                    console.log('Error getting document:', error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const selectFile = async () => {

        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        }

        const result = await launchCamera(
            options, (response) => {
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
            <TouchableOpacity activeOpacity={.5} onPress={onOpen}>
                <Image
                    source={{
                        uri: user.profileImage || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
                    }}
                    resizeMode="contain"
                    style={styles.image}
                ></Image>
            </TouchableOpacity>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.description}>
                {user.description || "Associate Full Stack Engineer | Software Engineering Undergraduate at SLIIT | Developer | Blogger | Tech Enthusiast"}
            </Text>
            {/*update profile button*/}
            <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate("Update Profile")}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>

            {/*<>*/}
            {/*    <FlatList*/}
            {/*        data={appliedJobs}*/}
            {/*        renderItem={({item}) => <AppliedJobCard item={item}/>}*/}
            {/*        keyExtractor={(item) => item.id}*/}
            {/*    />*/}
            {/*</>*/}

            {
                appliedJobs.length > 0 ?
                    <Text style={{fontSize: 18, color: "rgba(39,41,50,1)", marginTop: 20,marginLeft:10}}>Applied Jobs</Text>
                    :
                    null
            }

            {
                appliedJobs.length > 0 ?
                    <FlatList
                        data={appliedJobs}
                        renderItem={({item}) => <AppliedJobCard item={item}/>}
                        keyExtractor={(item) => item.id}
                        style={{marginTop: 20}}
                    />
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#000'}}>No applied jobs</Text>
                    </View>
            }


            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <Center>
                        <Actionsheet isOpen={isOpen} onClose={onClose}>
                            <Actionsheet.Content>
                                <Box w="100%" h={60} px={4} justifyContent="center">
                                    <Text fontSize="16" color="gray.500" _dark={{
                                        color: "gray.300"
                                    }} style={{textAlign: 'center'}}>
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
        backgroundColor: "#fff",
        padding: 10
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
    },
    updateButton: {
        width: '100%',
        height: 40,
        backgroundColor: "#0A66C2",
        borderRadius: 100,
        marginTop: 20,
        padding: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
});

export default UserProfile;
