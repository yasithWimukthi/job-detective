import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { firebase } from "../../firebaseConfig";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

const JobView = ({ route }) => {
  const [jobPost, setJobPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [UsersPost, setUsersPost] = useState(false);

  const navigation = useNavigation();

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Congratulations!",
      text2: "You have successfully applied 👋",
    });
  };

  const bounceValue = useRef(new Animated.Value(1)).current;

  const { id, iconName, iconColor } = route.params;

  const startBouncing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startBouncing();
    setLoading(true);
    const unsubscribe = firebase
      .firestore()
      .collection("jobPosts")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setJobPost({ ...doc.data(), id: doc.id });

          // check if the current user is the owner of the job post
          //TODO: change userID to the current user's ID
          if (doc.data().userID === "001") {
            setUsersPost(true);
          }

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
      name: "delete",
      color: "#cb0019",
      position: 2,
    },
  ];

  const onDeletePress = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this job posting?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          onPress: async () => {
            // delete the job post from the database
            await firebase
              .firestore()
              .collection("jobPosts")
              .doc(id)
              .delete()
              .then(() => {
                navigation.goBack();
              });
          },
          style: "destructive",
        },
      ]
    );
  };

  const onApplyPress = () => {
    // Handle apply button press
    console.log(firebase.auth()?.currentUser?.uid);
    // add applied jobs to the current user document
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth()?.currentUser?.uid)
      .update({
        appliedJobs: firebase.firestore.FieldValue.arrayUnion(id),
      })
      .then(() => {
        // display alert message
        showSuccessToast();
        console.log("Applied successfully");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Failed to apply for this job");
      });

    //get user document match UID field to current user id
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
            <Animated.View
              style={{
                transform: [{ scale: bounceValue }],
              }}
            >
              <FontAwesome5
                style={styles.icon}
                name={iconName}
                size={20}
                color="#666666"
              />
            </Animated.View>
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
          {UsersPost && (
            <FloatingAction
              actions={actions}
              onPressItem={(name) => {
                if (name === "update") {
                  navigation.navigate("Update Job Posting", {
                    id: jobPost.id,
                    iconColor: iconColor,
                  });
                } else if (name === "delete") {
                  onDeletePress();
                }
              }}
            />
          )}
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
