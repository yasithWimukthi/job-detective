import React, {Component, useEffect, useState} from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";
import { Button, Actionsheet, useDisclose, Box, Center, NativeBaseProvider } from "native-base";
import {firebase} from "../../firebaseConfig";

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

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity = { .5 } onPress={onOpen }>
            <Image
                source={{
                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
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
                                <Actionsheet.Item>Open Camera</Actionsheet.Item>
                                <Actionsheet.Item >Select from gallery</Actionsheet.Item>
                            </Actionsheet.Content>
                        </Actionsheet>
                    </Center>;
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
