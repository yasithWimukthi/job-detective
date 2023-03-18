import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const InterviewCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.question} numberOfLines={1} ellipsizeMode="tail">
            {item.question}
          </Text>
        </View>

        <Text style={styles.answer} ellipsizeMode="tail">
          {item.answer}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  question: {
    fontSize: 18,
    marginBottom: 5,
    color: "#3f3f3f",
  },
  answer: {
    fontSize: 16,
    color: "#3f3f3f",
  },
});

export default InterviewCard;
