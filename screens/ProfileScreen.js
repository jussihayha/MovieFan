import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";

import firebase, { db } from "../config/Firebase";
import { en, fi } from "../components/lang/Translations";
import i18n from "i18n-js";

export default function ProfileScreen({ navigation }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mode, setMode] = useState("");
  const [language, setLanguage] = useState("");

  let user = firebase.auth().currentUser;
  let uid = user.uid;
  i18n.translations = { fi, en };
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    db.ref("users")
      .child(uid)
      .child("details")
      .on("value", (snapshot) => {
        const data = snapshot.val();

        setFirstName(data.firstname);
        setLastName(data.lastname);
        setMode(data.mode);
        setLanguage(data.language);
      });
  };

  const saveChanges = () => {
    db.ref("users").child(uid).child("details").set({
      firstname: firstname,
      lastname: lastname,
      mode: mode,
      language: language,
    });

    Alert.alert(i18n.t("changes"));
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.settings}>
        <Input
          label={i18n.t("firstname")}
          value={firstname}
          onChangeText={(firstname) => setFirstName(firstname)}
          inputStyle={{ color: "white" }}
          containerStyle={styles.input}
        />
        <Input
          label={i18n.t("lastname")}
          value={lastname}
          onChangeText={(lastname) => setLastName(lastname)}
          inputStyle={{ color: "white" }}
          containerStyle={styles.input}
        />
        <Button
          buttonStyle={styles.saveChanges}
          title={i18n.t("save")}
          onPress={saveChanges}
        />
      </View>

      <Button
        buttonStyle={styles.logoutBtn}
        title={i18n.t("logout")}
        onPress={logout}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "black",
    color: "white",
  },

  header: {
    color: "white",
    fontSize: 32,
  },

  settings: {
    justifyContent: "space-evenly",
  },

  saveChanges: {
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

  logoutBtn: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#ff0000",
    borderColor: "#ff0000",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },

  input: {
    width: 200,
  },
});
