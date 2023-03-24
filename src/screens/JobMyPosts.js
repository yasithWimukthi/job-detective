import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { firebase } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import jobPostsDummy from "../data/jobs";
import JobCard from "../components/JobCard";
import { FontAwesome5 } from "@expo/vector-icons";
import Loading from "../components/Loading";

const JobMyPosts = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  let userId = firebase.auth()?.currentUser?.uid || "001";

  const fetchJobPosts = async () => {
    try {
      setLoading(true);
      // Fetch job posts from Firebase Firestore
      const unsubscribe = firebase
        .firestore()
        .collection("jobPosts")
        .onSnapshot((querySnapshot) => {
          const posts = [];
          querySnapshot.forEach((doc) => {
            //TODO: change userID to the current user's ID
            if (doc.data().userID === userId) {
              posts.push({ ...doc.data(), id: doc.id });
            }
          });
          setJobPosts(posts);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch job posts from Firebase Firestore
    fetchJobPosts();
  }, []);

  const actions = [
    {
      text: "All Posts",
      icon: <FontAwesome5 name="briefcase" size={24} color="white" />,
      name: "allPosts",
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <FlatList
            data={jobPosts}
            renderItem={({ item }) => <JobCard item={item} />}
            keyExtractor={(item) => item.id}
          />
          <FloatingAction
            actions={actions}
            onPressItem={(name) => {
              if (name === "addPost") {
                navigation.navigate("Create new Job");
              } else if (name === "allPosts") {
                navigation.navigate("Jobs");
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5,
    paddingTop: 10,
  },
});

export default JobMyPosts;
