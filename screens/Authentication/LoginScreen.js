import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import firebase from "../../config/Firebase";
import { Button, Input, Text } from "react-native-elements";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

        .catch((error) => console.log(error));
    } catch (e) {
      console.log("something went wrong");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> MovieFan </Text>
      <Input
        style={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        autoCapitalize="none"
        inputStyle={{ color: "white" }}
      />
      <Input
        style={styles.inputBox}
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        secureTextEntry={true}
        inputStyle={{ color: "white" }}
      />
      <TouchableOpacity style={styles.button} onPress={() => login()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button
        title="Don't have an account yet? Sign up"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontWeight: "bold",
    fontSize: 28,
    color: "white",
  },

  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F6820D",
    borderColor: "#F6820D",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
});
