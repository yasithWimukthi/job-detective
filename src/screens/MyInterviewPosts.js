import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { Alert } from "react-native";
import { firebase } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Loading from "../components/Loading";

const MyInterviewPosts = () => {
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
          //TODO: change userID to the current user's ID
          if (doc.data().userID === "001") {
            posts.push({ ...doc.data(), id: doc.id });
          }
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
      text: "My Favourites",
      icon: <FontAwesome5 name="heart" solid size={24} color="white" />,
      name: "myFavourites",
      position: 2,
    },
    {
      text: "Add Interview",
      icon: <FontAwesome5 name="plus" size={24} color="white" />,
      name: "addInterview",
      position: 3,
    },
  ];

  //function to navigate to edit interview page with interview details
  const editInterview = (item) => {
    navigation.navigate("Edit Interview", { item });
  };

  const onDeletePress = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this interview question and answer?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          onPress: async () => {
            // delete the interviews post from the database
            await firebase
              .firestore()
              .collection("interviews")
              .doc(id)
              .delete()
              .then(() => {
                navigation.navigate("My Interview Postings");
              });
          },
          //   style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FlatList
            data={interviews}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <View style={styles.textContainer}>
                  <View style={styles.header}>
                    <Text
                      style={styles.question}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.question}
                    </Text>
                  </View>
                  <Text style={styles.answer} ellipsizeMode="tail">
                    {item.answer}
                  </Text>
                  <View style={styles.footer}>
                    <TouchableOpacity style={styles.Icon1}>
                      <FontAwesome5
                        name="edit"
                        solid
                        style={styles.updateicon}
                        onPress={() => editInterview(item)}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.Icon1}>
                      <FontAwesome5
                        name="trash"
                        solid
                        style={styles.deleteicon}
                        onPress={onDeletePress}
                      />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.Icon1}
                      onPress={() => onDeletePress(item.id)}
                    >
                      <FontAwesome5
                        name="trash"
                        solid
                        style={styles.deleteicon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
          <FloatingAction
            actions={actions}
            onPressItem={(name) => {
              if (name === "addInterview") {
                navigation.navigate("Add new Interview");
              } else if (name === "myFavourites") {
                navigation.navigate("My Favourites");
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
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 5,
  },
  activeButton: {
    backgroundColor: "#1253bc",
  },
  buttonText: {
    fontSize: 16,
    color: "#3f3f3f",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextActive: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    elevation: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 5,
  },
  updateicon: {
    fontSize: 20,
    color: "#1253bc",
  },
  deleteicon: {
    fontSize: 20,
    color: "red",
  },
  textContainer: {
    flex: 1,
  },
  question: {
    fontSize: 18,
    color: "#3f3f3f",
    flex: 1,
  },
  answer: {
    fontSize: 16,
    color: "#3f3f3f",
  },
  Icon1: {
    width: 30,
    height: 30,
    alignItems: "flex-end",
  },
});

export default MyInterviewPosts;
