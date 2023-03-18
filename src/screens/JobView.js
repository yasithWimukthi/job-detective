import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../../firebaseConfig";
import Loading from "../components/Loading";
import iconMapping from "../data/iconMapping";
import getRandomColor from "../utils/RandomColor";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";

const JobView = ({ route }) => {
  const [jobPost, setJobPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [iconName, seticonName] = useState("");
  const [iconColor, seticonColor] = useState("");

  const { id } = route.params;

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firebase
      .firestore()
      .collection("jobPosts")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setJobPost({ ...doc.data(), id: doc.id });

          // Map job titles to corresponding FontAwesome icons
          seticonName(iconMapping[doc.data().title] || "briefcase");

          // Generate a random background color for the icon
          seticonColor(getRandomColor());

          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  const actions = [
    {
      text: "Update",
      icon: (
        <MaterialIcons name="published-with-changes" size={24} color="white" />
      ),
      name: "update",
      position: 1,
    },
    {
      text: "Delete",
      icon: <MaterialIcons name="delete-forever" size={24} color="white" />,
      name: "delte",
      color: "#cb0019",
      position: 2,
    },
  ];

  const onApplyPress = () => {
    // Handle apply button press
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              paddingVertical: 35,
              paddingHorizontal: 25,
              marginRight: 10,
              borderRadius: 10,
              backgroundColor: iconColor,
              marginBottom: 20,
            }}
          >
            <FontAwesome5
              style={styles.icon}
              name={iconName}
              size={20}
              color="#666666"
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{jobPost.title}</Text>
          </View>
          <Text style={styles.salary}>LKR {jobPost.salary}</Text>
          <Text style={styles.description}>{jobPost.description}</Text>
          <Text style={styles.date}>
            {" "}
            {new Date(jobPost.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <TouchableOpacity style={styles.applyButton} onPress={onApplyPress}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
          <FloatingAction
            actions={actions}
            onPressItem={(name) => {
              if (name === "addPost") {
                navigation.navigate("Create new Job");
              } else if (name === "myPosts") {
                navigation.navigate("My Job Postings");
              }
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  salary: {
    fontSize: 18,
    color: "gray",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: "#1253bc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 18,
  },
  icon: {
    textAlign: "center",
    fontSize: 20,
    color: "#FFFFFF",
  },
});

export default JobView;
