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
import JobPost from "./src/screens/JobPosts";
import JobCreate from "./src/screens/JobCreate";
import JobMyPosts from "./src/screens/JobMyPosts";
<<<<<<< HEAD
import AddNewCompany from "./src/screens/AddNewCompany";
=======
import LoginScreen from "./src/screens/LoginScreen";
import JobView from "./src/screens/JobView";
import JobUpdate from "./src/screens/JobUpdate";

>>>>>>> 52c93ed8df1515e64fa761d5386c2374ebef2c5d

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
    <NativeBaseProvider>
      <Drawer.Navigator
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Companies" component={CompaniesHome} />
        <Drawer.Screen name="Homes" component={HomeScreen} />
        <Drawer.Screen name="Jobs" component={JobPost} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />

      </Drawer.Navigator>
    </NativeBaseProvider>
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
        <Stack.Screen name="Create new Job" component={JobCreate} />
        <Stack.Screen name="My Job Postings" component={JobMyPosts} />
        <Stack.Screen name="Companies" component={CompaniesHome} />
        <Stack.Screen name="Add New Company" component={AddNewCompany} />
        <Stack.Screen name="Job View" component={JobView} />
        <Stack.Screen name="Update Job Posting" component={JobUpdate} />
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
