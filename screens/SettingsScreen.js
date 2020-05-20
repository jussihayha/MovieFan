import * as React from "react";
import { View, Switch, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useState, useEffect } from "react";
import firebase, { db } from "../config/Firebase";

import { en, fi } from "../components/lang/Translations";
import i18n from "i18n-js";
import * as Localization from "expo-localization";

export default function SettingsScreen({}) {
  const [value, setValue] = useState(null);
  const [language, setLanguage] = useState("");

  let user = firebase.auth().currentUser;
  let uid = user.uid;

  useEffect(() => {
    getUser();
  }, [user]);

  i18n.translations = { fi, en };

  const getUser = () => {
    db.ref("users")
      .child(uid)
      .child("details")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        setLanguage(data.language);
        if (data.language == "fi") {
          setValue(false);
        } else {
          setValue(true);
        }
      });
  };

  const saveChanges = () => {
    db.ref("users").child(uid).child("details").child("language").set(language);

    Alert.alert(`${i18n.t("changes")}`);
  };

  const changeLanguage = (value) => {
    setValue(value);
    if (value) {
      setLanguage("en");
      i18n.locale = "en";
    } else {
      setLanguage("fi");
      i18n.locale = "fi";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{i18n.t("settings")}</Text>

      <View style={styles.settings}>
        <Text style={styles.text}>{i18n.t("finnish")}</Text>
        <Switch
          value={value}
          onValueChange={changeLanguage}
          trackColor={{ false: "#765777", true: "#F6820D" }}
        />
        <Text style={styles.text}>{i18n.t("english")}</Text>
      </View>
      <Button
        buttonStyle={styles.button}
        onPress={saveChanges}
        title={i18n.t("save")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#282D4F",
    color: "white",
  },

  header: {
    color: "white",
    fontSize: 32,
  },

  text: {
    color: "white",
    fontSize: 16,
  },

  settings: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
});
