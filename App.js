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
  DrawerItem,
} from "@react-navigation/drawer";
import { NativeBaseProvider, Text, Box } from "native-base";
import JobPost from "./src/screens/JobPosts";
import JobCreate from "./src/screens/JobCreate";
import JobMyPosts from "./src/screens/JobMyPosts";
import LoginScreen from "./src/screens/LoginScreen";
import JobView from "./src/screens/JobView";
import JobUpdate from "./src/screens/JobUpdate";
import { FontAwesome5 } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            margin: 20,
          }}
        >
          <FontAwesome5 name="briefcase" size={20} color="#4b4b4b" />
          <Text
            color="#4b4b4b"
            fontSize="xl"
            fontWeight="bold"
            style={styles.drawerHeaderText}
          >
            Job Portal
          </Text>
        </View>

        <DrawerItemList {...props} />
        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Logout"
            onPress={() => {
              // handle logout

              props.navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MyDrawer() {
  return (
    <NativeBaseProvider>
      <Drawer.Navigator
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Homes" component={HomeScreen} />
        <Drawer.Screen name="Companies" component={CompaniesHome} />
        <Drawer.Screen name="Jobs" component={JobPost} />
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
        <Stack.Screen name="Job View" component={JobView} />
        <Stack.Screen name="Update Job Posting" component={JobUpdate} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  bottomDrawerSection: {
    borderWidth: 1,
    borderColor: "#f4f4f4",
    marginBottom: 15,
    borderRadius: 4,
    top: 300,
  },
});
