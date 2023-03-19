import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { firebase } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Loading from "../components/Loading";

const MyFavouriteInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    // Fetch interviews question from Firebase Firestore
    const unsubscribe = firebase
      .firestore()
      .collection("interviews")
      .where("status", "==", true) // only show interviews where status is true
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

  const handleIconPress = (id) => {
    const updatedStatus = false;
    firebase
      .firestore()
      .collection("interviews")
      .doc(id)
      .update({ status: updatedStatus });
    // navigate back to interviews post list page
    navigation.navigate("My Favourites");
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
                    {/* <TouchableOpacity style={styles.heartIcon} >
                      <FontAwesome5
                        name="heart"
                        solid
                        style={[
                          styles.icon,
                          item.status && styles.iconFavorite,
                        ]}
                      />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.heartIcon}
                      onPress={() => handleIconPress(item.id)}
                    >
                      <FontAwesome5
                        name="heart"
                        solid={item.status}
                        style={[
                          styles.icon,
                          item.status && styles.iconFavorite,
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.answer} ellipsizeMode="tail">
                    {item.answer}
                  </Text>
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
  icon: {
    fontSize: 20,
    color: "#e3e3e3",
  },
  iconFavorite: {
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
  heartIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyFavouriteInterviews;
