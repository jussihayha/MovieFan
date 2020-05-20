import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useState } from "react";
import firebase, { db } from "../../config/Firebase";

import i18n from "i18n-js";
import { en, fi } from "../../components/lang/Translations";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Button, Text, Input } from "react-native-elements";
export default function SignupScreen({ navigation }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en");
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(true);
  const [toggle, setToggle] = useState(true);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        let uid = userCredentials.user.uid;

        db.ref("users").child(uid).child("details").set({
          firstname: firstname,
          lastname: lastname,
          mode: "light",
          language: language,
        });
      })
      .then(() => navigation.navigate("Login"))
      .catch((error) => setErrorMessage(error.message));
  };

  const changeLanguage = (value) => {
    setValue(value);

    if (value) {
      setLanguage("en");
    } else {
      setLanguage("fi");
    }
  };

  if (language == "fi") {
    i18n.locale = "fi";
  }
  if (language == "en") {
    i18n.locale = "en";
  }

  i18n.translations = { fi, en };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{i18n.t("register")}</Text>
      {errorMessage == "" ? null : Alert.alert({ errorMessage })}
      <Input
        containerStyle={styles.inputBox}
        value={firstname}
        onChangeText={(firstname) => setFirstName(firstname)}
        placeholder={i18n.t("firstname")}
        placeholderTextColor="white"
        inputStyle={{ color: "white" }}
        leftIcon={<Ionicons name="ios-person" size={24} color="white" />}
      />
      <Input
        containerStyle={styles.inputBox}
        value={lastname}
        onChangeText={(lastname) => setLastName(lastname)}
        placeholder={i18n.t("lastname")}
        placeholderTextColor="white"
        inputStyle={{ color: "white" }}
        leftIcon={<Ionicons name="ios-person" size={24} color="white" />}
      />
      <Input
        containerStyle={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder={i18n.t("email")}
        placeholderTextColor="white"
        inputStyle={{ color: "white" }}
        leftIcon={<Ionicons name="ios-mail" size={24} color="white" />}
      />
      <Input
        containerStyle={styles.inputBox}
        value={password}
        inputStyle={{ color: "white" }}
        onChangeText={(password) => setPassword(password)}
        placeholder={i18n.t("password")}
        secureTextEntry={toggle ? true : false}
        placeholderTextColor="white"
        leftIcon={<FontAwesome name="lock" size={24} color="white" />}
        rightIcon={
          toggle ? (
            <FontAwesome
              name="eye"
              size={24}
              color="white"
              onPress={() => {
                setToggle(!toggle);
                console.log(toggle);
              }}
            />
          ) : (
            <FontAwesome
              name="eye-slash"
              size={24}
              color="white"
              onPress={() => {
                setToggle(!toggle);
                console.log(toggle);
              }}
            />
          )
        }
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>{i18n.t("finnish")}</Text>
        <Switch
          value={value}
          onValueChange={changeLanguage}
          trackColor={{ false: "#fff", true: "#F6820D" }}
        />
        <Text style={styles.text}>{i18n.t("english")}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{i18n.t("signup")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282D4F",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontWeight: "bold",
    fontSize: 28,
    color: "white",
  },

  text: {
    color: "white",
  },

  inputBox: {
    width: "85%",
    padding: 10,
    fontSize: 16,

    textAlign: "center",
    color: "white",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
