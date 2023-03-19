import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { firebase } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import InterviewCard from "../components/InterviewCard";
import { FontAwesome5 } from "@expo/vector-icons";
import Loading from "../components/Loading";

const InterviewPreparation = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    // Fetch interviews question from Firebase Firestore
    const unsubscribe = firebase
      .firestore()
      .collection("interviews")
      .onSnapshot((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setInterviews(posts);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const actions = [
    {
      text: "My Posts",
      icon: <FontAwesome5 name="briefcase" size={24} color="white" />,
      name: "myQposts",
      position: 1,
    },
    {
      text: "Add Interview",
      icon: <FontAwesome5 name="plus" size={24} color="white" />,
      name: "addInterview",
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
            data={interviews}
            renderItem={InterviewCard}
            keyExtractor={(item) => item.id}
          />
          <FloatingAction
            actions={actions}
            onPressItem={(name) => {
              if (name === "addInterview") {
                navigation.navigate("Add new Interview");
              } else if (name === "myQposts") {
                navigation.navigate("My Interview Postings");
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
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 5,
    padding: 10,
  },
});

export default InterviewPreparation;
