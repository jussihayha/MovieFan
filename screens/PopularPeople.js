import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase, { db } from "../config/Firebase";
import { Text, Card } from "react-native-elements";
import { MOVIE_KEY } from "react-native-dotenv";
import * as Localization from "expo-localization";
import { en, fi } from "../components/lang/Translations";
import i18n from "i18n-js";

export default function PopularPeople({ navigation }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      const url = `https://api.themoviedb.org/3/trending/person/week?api_key=${MOVIE_KEY}`;
      let response = await fetch(url);
      response = await response.json();

      setPeople(response.results);
      setLoading(false);
    };
    fetchPeople();
  }, []);
  console.log(people);
  return (
    <View style={{ backgroundColor: "#282D4F" }}>
      <Text style={styles.header}>{i18n.t("popular_people")}</Text>
      <ScrollView horizontal={true}>
        {loading
          ? null
          : people.map((actor, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Actor details", {
                      actor: actor.id,
                      profile: actor.profile_path,
                      known: actor.known_for,
                      overview: actor.overview,
                    })
                  }
                  key={index}
                >
                  <Card containerStyle={styles.cards}>
                    <View key={index}>
                      <Image
                        style={styles.movies}
                        resizeMode="contain"
                        source={{
                          uri: `http://image.tmdb.org/t/p/original${actor.profile_path}`,
                          height: undefined,
                          width: undefined,
                        }}
                      />
                      <Text style={styles.title}>{actor.name}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
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

  list: {
    color: "white",
  },

  images: {
    flex: 1,
    width: undefined,
    height: undefined,
  },

  movies: {
    width: 300,
    height: 300,
    backgroundColor: "#000",
  },

  title: {
    fontSize: 24,
    justifyContent: "center",
    backgroundColor: "#000",
    color: "white",
    alignSelf: "center",
  },

  cards: {
    borderWidth: 0,
    backgroundColor: "black",
  },
});
