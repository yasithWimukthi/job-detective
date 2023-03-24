import React, {useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";


import {auth, firebase} from "../../firebaseConfig";
import {Alert} from "native-base";
import LoginScreen from "react-native-login-screen";

const SignupScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();


    // const auth = getAuth();

    const onSignUpPressed = () => {
        // navigate to signup
        navigation.navigate("Login");
    }

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                const registeredUser = {
                    name,
                    email,
                    uid: user.uid,
                    profileImage: "",
                    resumeUrl: "",
                    phone: "",
                    description: "",
                }
                try {
                    // save the job post object to the firestore database by uid
                    await firebase.firestore().collection("users").doc(user.uid).set(registeredUser);

                    // navigate to user profile page
                    navigation.navigate("Profile");
                } catch (error) {
                    console.log(error);
                    Alert.alert("Error", "Failed to save job post");
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    return (
            <LoginScreen
                // logoImageSource={require('./assets/logo-example.png')}
                onLoginPress={handleSignup}
                onSignupPress={onSignUpPressed}
                onEmailChange={setEmail}
                loginButtonText={'Create an account'}
                signupText="Do you have an account ?"
                onPasswordChange={setPassword}
                textInputChildren={
                    <View style={{marginTop: 16}}>
                        <TextInput
                            style={styles.nameInput}
                            placeholder="Name"
                            placeholderTextColor="rgba(117, 117, 117, 1)"
                            onChangeText={setName}
                        />
                    </View>
                }
            />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },
    input: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#0066cc",
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    nameInput:{
        height:50,
        width:337.5,
        borderRadius:8,
        paddingRight:16,
        paddingLeft:16,
        borderColor:"#000",
        backgroundColor:"rgb(236, 238, 245)",
        color:"#000"
    },
});

export default SignupScreen;