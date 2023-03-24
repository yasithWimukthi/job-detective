import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "react-native-login-screen";


import { auth } from "../../firebaseConfig";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const onSignUpPressed = () => {
        // navigate to signup
        navigation.navigate("Register");
    }


    const handleLogin = () => {
        // Handle login logic here
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigation.navigate("Profile");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (

        <LoginScreen
            // logoImageSource={require('./assets/logo-example.png')}
            onLoginPress={handleLogin}
            onSignupPress={onSignUpPressed}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            enablePasswordValidation
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "rgba(244,239,243,1)",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0066cc',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    helloAgain: {
        fontFamily: "roboto-700",
        color: "rgba(42,38,51,1)",
        fontSize: 30,
        opacity: 0.84,
        marginTop:10,
        height:50,
        textAlign: "center",
    },
    welcomeBav: {
        fontFamily: "roboto-regular",
        color: "rgba(155,155,155,1)",
        textAlign: "center",
        fontSize: 24,
        marginBottom: 50,
    },
    textContainer:{
    }

});

export default LoginPage;
