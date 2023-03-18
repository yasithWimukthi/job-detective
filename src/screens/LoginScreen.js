import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function Untitled(props) {
    return (
        <View style={styles.container}>
            <View style={styles.rectStack}>
                <View style={styles.rect}></View>
                <View style={styles.rect2}>
                    <Text style={styles.welcomeBack}>Welcome Back</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    rect: {
        top: 0,
        width: 375,
        height: 398,
        position: "absolute",
        backgroundColor: "rgba(65,63,185,1)",
        borderBottomRightRadius: 70,
        borderBottomLeftRadius: 70,
        overflow: "hidden",
        left: 0
    },
    rect2: {
        top: 110,
        left: 32,
        width: 311,
        height: 420,
        position: "absolute",
        backgroundColor: "#E6E6E6",
        borderRadius: 29
    },
    welcomeBack: {
        fontFamily: "roboto-700",
        color: "#121212",
        fontSize: 24,
        marginTop: 28,
        marginLeft: 76
    },
    rectStack: {
        width: 375,
        height: 530,
        marginTop: 32
    }
});

export default Untitled;
