import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { firebase } from "../../firebaseConfig";
import getRandomColor from "../utils/RandomColor";
import { useNavigation } from "@react-navigation/native";
import iconMapping from "../data/iconMapping";
import jobPostsDummy from "../data/jobs";

const JobPost = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch job posts from Firebase Firestore
    const unsubscribe = firebase
      .firestore()
      .collection("jobPosts")
      .onSnapshot((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        setJobPosts(posts);
      });

    return () => unsubscribe();
  }, []);

  const handleAddPost = () => {
    // Navigate to Add Job Post screen
    // You can use a navigation library like React Navigation for this
    navigation.navigate("JobCreate");
  };

  const renderJobPost = ({ item }) => {
    // Map job titles to corresponding FontAwesome icons

    const iconName = iconMapping[item.title] || "briefcase";

    // Generate a random background color for the icon
    const iconColor = getRandomColor();

    return (
      <TouchableOpacity style={styles.card}>
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
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.salary}>LKR {item.salary}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={jobPostsDummy}
        renderItem={renderJobPost}
        keyExtractor={(item) => item.id}
      />
      <FloatingAction onPressMain={handleAddPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5,
    paddingTop: 10,
  },
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
    fontSize: 14,
    color: "#3f3f3f",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default JobPost;
