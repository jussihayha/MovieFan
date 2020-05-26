import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import firebase, { db } from "../config/Firebase";
import { Text, Card } from "react-native-elements";
import { MOVIE_KEY } from "react-native-dotenv";
import * as Localization from "expo-localization";
import { en, fi } from "../components/lang/Translations";
import i18n from "i18n-js";
import PopularMovies from "./PopularMovies";
import PopularPeople from "./PopularPeople";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const [loggedUser, setLoggedUser] = useState("");
  const [value, setValue] = useState(true);
  let user = firebase.auth().currentUser;
  let uid = user.uid;

  i18n.translations = { fi, en };

  useEffect(() => {
    getUser();
  }, [user]);

  const getUser = () => {
    db.ref("users")
      .child(uid)
      .child("details")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        setLoggedUser(data.firstname);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {i18n.t("welcome")} {loggedUser}!
      </Text>
      <View style={styles.toggle}>
      <Text style={styles.text}>{i18n.t("movies")}</Text>
      <Switch
        value={value}
        onValueChange={(value) => setValue(value)}
        trackColor={{ false: "#fff", true: "#F6820D" }}
      />
      <Text style={styles.text}>{i18n.t("people")}</Text>
      </View>
      <ScrollView>
        {value ? (
          <PopularPeople navigation={navigation} />
        ) : (
          <PopularMovies navigation={navigation} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282D4F",
  },

  header: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },

  text: {
    fontSize: 16,
    color: "white",
  },

  toggle: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
