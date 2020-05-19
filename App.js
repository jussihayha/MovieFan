import * as React from "react";
import AuthNavigator from "./navigation/AuthNavigator";
import { useKeepAwake } from 'expo-keep-awake';

console.disableYellowBox = true;

export default function App() {

  // used for testing purposes
  useKeepAwake();
  return <AuthNavigator />;
}
