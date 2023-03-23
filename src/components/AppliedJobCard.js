import React, {useState, useEffect} from "react";
import iconMapping from "../data/iconMapping";
import getRandomColor from "../utils/RandomColor";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

const AppliedJobCard = ({item, iconBG}) => {
    const [iconColor, sectionColor] = useState("");

    // Map job titles to corresponding FontAwesome icons
    const iconName = iconMapping[item.title] || "briefcase";

    useEffect(() => {
        if (iconBG) {
            sectionColor(iconBG);
        } else {
            // Generate a random background color for the icon
            sectionColor(getRandomColor());
        }
    }, []);

    return (
        <view style={{display:'flex',marginBottom:10}}>
            <View
                style={{
                    paddingVertical: 35,
                    paddingHorizontal: 25,
                    width: 80,
                    marginRight: 10,
                    borderRadius: 10,
                    backgroundColor: iconColor,
                }}
            >
                <FontAwesome5
                    style={styles.icon}
                    name={iconName}
                    size={20}
                    color="#666666"
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {item.title}
                </Text>
                <Text style={styles.salary}>
                    {item.salary ? "LKR " : ""}
                    {item.salary}
                </Text>
                <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
                    {item.description}
                </Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.date}>
                        {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </Text>
                </View>
            </View>
        </view>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "#f6f6f6",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#f6f6f6",
        padding: 10,
        marginBottom: 10,
        elevation: 5,
    },
    icon: {
        textAlign: "center",
        fontSize: 20,
        color: "#FFFFFF",
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#3f3f3f",
    },
    salary: {
        fontSize: 12,
        fontWeight: "bold",
        color: "grey",
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
        color: "#3f3f3f",
    },
    date: {
        fontSize: 12,
        color: "#b6b6b6",
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default AppliedJobCard;