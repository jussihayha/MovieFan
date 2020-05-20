import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/Authentication/LoginScreen";
import SignupScreen from "../screens/Authentication/SignupScreen";
import ForgotPasswordScreen from "../screens/Authentication/ForgotPasswordScreen";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
