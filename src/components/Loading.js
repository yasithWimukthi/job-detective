import { ActivityIndicator, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <ActivityIndicator size="large" color="#1253bc" style={styles.loading} />
  );
};

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    top: "40%",
    left: "47%",
  },
});

export default Loading;
