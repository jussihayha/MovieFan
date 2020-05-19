import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import firebase, { db } from "../config/Firebase";
import { Text, Card } from "react-native-elements";
import { MOVIE_KEY } from "react-native-dotenv";
import * as Localization from "expo-localization";
import { en, fi } from "../components/lang/Translations";
import i18n from "i18n-js";
import PopularMovies from "./PopularMovies";
import PopularPeople from "./PopularPeople";

export default function HomeScreen({ navigation }) {
  const [loggedUser, setLoggedUser] = useState("");
  const [language, setLanguage] = useState("");

  let user = firebase.auth().currentUser;
  let uid = user.uid;

  i18n.translations = { fi, en };

  useEffect(() => {
    getUser();
  }, [loggedUser]);

  const getUser = () => {
    db.ref("users")
      .child(uid)
      .child("details")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        setLoggedUser(data.firstname);
        setLanguage(data.language);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {i18n.t("welcome")} {loggedUser}!
      </Text>
      <ScrollView>
        <PopularMovies navigation={navigation} />
            
        <PopularPeople navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  header: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
});
