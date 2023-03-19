import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const InterviewMyCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={styles.question} numberOfLines={1} ellipsizeMode="tail">
            {item.question}
          </Text>
          <TouchableOpacity style={styles.Icon}>
            <FontAwesome5
              name="heart"
              solid
              style={[styles.icon, item.status && styles.iconFavorite]}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.answer} ellipsizeMode="tail">
          {item.answer}
        </Text>
        <View style={styles.header}>
          <TouchableOpacity style={styles.Icon}>
            <FontAwesome5
              name="edit"
              solid
              style={[styles.updateicon, item.status && styles.iconFavorite]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Icon}>
            <FontAwesome5
              name="trash"
              solid
              style={[styles.deleteicon, item.status && styles.iconFavorite]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  updateicon: {
    fontSize: 20,
    color: "#ccc",
  },
  deleteicon: {
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
  Icon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InterviewMyCard;
