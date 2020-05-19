import * as React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import firebase from "../../config/Firebase";
import { Button, Text } from "react-native-elements";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { en, fi } from "../../components/lang/Translations";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  i18n.locale = Localization.locale;

  if (i18n.locale = "fi-FI") {
    i18n.locale = "fi"
  }

  if (i18n.locale = "en-US") {
    i18n.locale = "en";
  }

  i18n.translations = { fi, en };

  async function login() {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

        .catch((error) => Alert.alert(error));
    } catch (e) {
     
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> MovieFan </Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder={i18n.t("email")}
        autoCapitalize="none"
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={i18n.t("password")}
        secureTextEntry={true}
        placeholderTextColor="white"
      />
      <TouchableOpacity style={styles.button} onPress={() => login()}>
        <Text style={styles.buttonText}>{i18n.t("login")}</Text>
      </TouchableOpacity>
      <Button
        title={i18n.t("register")}
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
    color: "white",
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
