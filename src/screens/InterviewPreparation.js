// import React, { useState } from "react";
// import { View, FlatList } from "react-native";
// import { ListItem, Icon } from "react-native-elements";

// const InterviewPreparation = () => {
//   const [data, setData] = useState([
//     {
//       id: 1,
//       question: "Tell me about yourself",
//       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       isFavorite: false,
//     },
//     {
//       id: 2,
//       question: "What are your strengths?",
//       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       isFavorite: false,
//     },
//     {
//       id: 3,
//       question: "What are your weaknesses?",
//       answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       isFavorite: false,
//     },
//   ]);

//   const toggleFavorite = (id) => {
//     setData((prevData) =>
//       prevData.map((item) =>
//         item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
//       )
//     );
//   };

//   const renderItem = ({ item }) => (
//     <ListItem
//       key={item.id}
//       title={item.question}
//       subtitle={item.answer}
//       rightIcon={
//         <Icon
//           name={item.isFavorite ? "heart" : "heart-outline"}
//           type="ionicon"
//           onPress={() => toggleFavorite(item.id)}
//         />
//       }
//     />
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// export default InterviewPreparation;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from "@react-navigation/native";
import interviewsDummy from "../data/interviews";
import JobPostCard from "../components/JobCard";
import { FontAwesome5 } from "@expo/vector-icons";
import Loading from "../components/Loading";

const JobPost = () => {
  const [jobPosts, setJobPosts] = useState([interviewsDummy]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  //   useEffect(() => {
  //     setLoading(true);
  //     // Fetch job posts from Firebase Firestore
  //     const unsubscribe = firebase
  //       .firestore()
  //       .collection("jobPosts")
  //       .onSnapshot((querySnapshot) => {
  //         const posts = [];
  //         querySnapshot.forEach((doc) => {
  //           posts.push({ ...doc.data(), id: doc.id });
  //         });
  //         setJobPosts(posts);
  //         setLoading(false);
  //       });

  //     return () => unsubscribe();
  //   }, []);

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
      {loading ? (
        <Loading />
      ) : (
        <>
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5,
    paddingTop: 10,
  },
});

export default JobPost;
