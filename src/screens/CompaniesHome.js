import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";

export default function CompaniesHome({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Comapnies Home</Text>
    </View>
  );
}
