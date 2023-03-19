// import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons";

// const InterviewCard = ({ item }) => {
//   return (
//     <TouchableOpacity style={styles.card}>
//       <View style={styles.textContainer}>
//         <View>
//           <Text style={styles.question} numberOfLines={1} ellipsizeMode="tail">
//             {item.question}
//           </Text>
//         </View>

//         <Text style={styles.answer} ellipsizeMode="tail">
//           {item.answer}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     // backgroundColor: "#f6f6f6",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#f6f6f6",
//     padding: 10,
//     marginBottom: 10,
//     elevation: 5,
//   },
//   icon: {
//     textAlign: "center",
//     fontSize: 20,
//     color: "#FFFFFF",
//   },
//   textContainer: {
//     flex: 1,
//   },
//   question: {
//     fontSize: 18,
//     marginBottom: 5,
//     color: "#3f3f3f",
//   },
//   answer: {
//     fontSize: 16,
//     color: "#3f3f3f",
//   },
// });

// export default InterviewCard;

import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const InterviewCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={styles.question} numberOfLines={1} ellipsizeMode="tail">
            {item.question}
          </Text>
          <TouchableOpacity style={styles.heartIcon}>
            <FontAwesome5
              name="heart"
              style={[styles.icon, item.isFavorite && { color: "red" }]}
              //   style={[styles.icon, item.isFavorite && styles.iconFavorite]}
            />
          </TouchableOpacity>
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f6f6f6",
    padding: 10,
    marginBottom: 10,
    elevation: 5,
  },
  icon: {
    fontSize: 20,
    color: "#3f3f3f",
  },
  iconFavorite: {
    color: "red",
  },
  textContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
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

export default InterviewCard;
