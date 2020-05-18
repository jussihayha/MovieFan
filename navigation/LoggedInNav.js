import React from "react";
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
import MovieDetailsScreen from "../screens/Search/MovieDetailsScreen";
import ActorDetailsScreen from "../screens/Search/ActorDetailsScreen";

import { Translations } from "../components/lang/Translations"; 

export default function LoggedInNav() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  


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

            if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "Search movies") {
              iconName = "ios-search";
            } else if (route.name === "My lists") {
              iconName = "ios-list";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search movies" component={SearchScreen} />
        <Tab.Screen name="My lists" component={ListsScreen} />
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
        <Drawer.Screen name="Home" component={TabComponent} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
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
        <Stack.Screen name="Details" component={MovieDetailsScreen} />
        <Stack.Screen name="MovieList" component={MovieListScreen} />
        <Stack.Screen name="Actor" component={ActorDetailsScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StackComponent />
    </NavigationContainer>
  );
}
