import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";
import RegisterScreen from "./src/screens/RegisterScreen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import CompaniesHome from "./src/screens/CompaniesHome";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NativeBaseProvider, Text, Box } from "native-base";
import JobPost from "./src/screens/JobPost";
import JobCreate from "./src/screens/JobCreate";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Companies" component={CompaniesHome} />
      <Drawer.Screen name="Jobs" component={JobPost} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="JobCreate" component={JobCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
