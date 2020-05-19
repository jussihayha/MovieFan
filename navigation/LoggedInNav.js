import React from "react";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import { View } from "react-native";
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

// Needed for bottom tab
import SearchScreen from "../screens/Search/SearchScreen";
import ListsScreen from "../screens/List/ListsScreen";
import HomeScreen from "../screens/HomeScreen";

// Drawer Imports
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Stack imports
import MovieListScreen from "../screens/List/MovieListScreen";
import MovieDetailsScreen from "../screens/Details/MovieDetailsScreen";
import ActorDetailsScreen from "../screens/Details/ActorDetailsScreen";
import PopularPeople from "../screens/PopularPeople";
import PopularMovies from "../screens/PopularMovies";
import { en, fi } from "../components/lang/Translations";
import firebase, { db } from "../config/Firebase";
import i18n from "i18n-js";
import * as Localization from "expo-localization";
i18n.translations = { fi, en };
export default function LoggedInNav() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  const [language, setLanguage] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    let user = firebase.auth().currentUser;
    let uid = user.uid;
    db.ref("users")
      .child(uid)
      .child("details")
      .on("value", (snapshot) => {
        const data = snapshot.val();

        setLanguage(data.language);
      });
  };

  const TabComponent = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          inactiveTintColor: "black",
          activeBackgroundColor: "black",
          activeTintColor: "#0092CC",
          allowFontScaling: true,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 34;

            if (route.name === "Start") {
              iconName = "ios-film";
            } else if (route.name === "Search movies") {
              iconName = "ios-search";
            } else if (route.name === "My lists") {
              iconName = "ios-list";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Start"
          options={{ title: i18n.t("start") }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Search movies"
          options={{ title: i18n.t("search") }}
          component={SearchScreen}
        />
        <Tab.Screen
          name="My lists"
          options={{ title: i18n.t("lists") }}
          component={ListsScreen}
        />
      </Tab.Navigator>
    );
  };

  const DrawerComponent = () => {
    return (
      <Drawer.Navigator
        drawerStyle={{ backgroundColor: "#000" }}
        drawerContentOptions={{
          activeTintColor: "#FFF",
          inactiveTintColor: "#000",
          inactiveBackgroundColor: "#FFF",
        }}
        screenOptions={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => {
            let iconName;
            size = 34;

            if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "Settings") {
              iconName = "ios-settings";
            } else if (route.name === "Profile") {
              iconName = "ios-person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          options={{ title: i18n.t("home") }}
          component={TabComponent}
        />
        <Drawer.Screen
          name="Settings"
          options={{ title: i18n.t("settings") }}
          component={SettingsScreen}
        />
        <Drawer.Screen
          name="Profile"
          options={{ title: i18n.t("profile") }}
          component={ProfileScreen}
        />
      </Drawer.Navigator>
    );
  };

  const HeaderLeft = () => {
    const navigation = useNavigation();
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        >
          <Ionicons
            name="md-menu"
            size={32}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const StackComponent = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerLeft: ({}) => <HeaderLeft />,
          }}
          component={DrawerComponent}
          name="MovieFan"
        />
        <Stack.Screen name="TabComponent" component={TabComponent} />
        <Stack.Screen name="Movie details" component={MovieDetailsScreen} />
        <Stack.Screen name="MovieList" component={MovieListScreen} />
        <Stack.Screen name="Actor details" component={ActorDetailsScreen} />
        <Stack.Screen name="PopularMovies" component={PopularMovies} />
        <Stack.Screen name="PopularPeople" component={PopularPeople} />
      </Stack.Navigator>
    );
  };

  if (language == "en") {
    i18n.locale = "en";
  } else {
    i18n.locale = "fi";
  }

  return (
    <NavigationContainer>
      <StackComponent />
    </NavigationContainer>
  );
}
