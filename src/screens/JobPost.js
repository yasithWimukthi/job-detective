import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { firebase } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import jobPostsDummy from "../data/jobs";
import JobPostCard from "../components/JobCard";
import { FontAwesome5 } from "@expo/vector-icons";

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
          posts.push({ ...doc.data(), id: doc.id });
        });
        setJobPosts(posts);
      });

    return () => unsubscribe();
  }, []);

  const actions = [
    {
      text: "My Posts",
      icon: <FontAwesome5 name="briefcase" size={24} color="white" />,
      name: "myPosts",
      position: 1,
    },
    {
      text: "Add Post",
      icon: <FontAwesome5 name="plus" size={24} color="white" />,
      name: "addPost",
      position: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={jobPosts}
        renderItem={JobPostCard}
        keyExtractor={(item) => item.id}
      />
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === "addPost") {
            navigation.navigate("Create new Job");
          } else if (name === "myPosts") {
            navigation.navigate("MyPosts");
          }
        }}
      />
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
});

export default JobPost;
