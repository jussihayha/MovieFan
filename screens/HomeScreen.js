import * as React from "react";
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

export default function HomeScreen({ navigation }) {
  const [loggedUser, setLoggedUser] = useState("");
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);

  let user = firebase.auth().currentUser;
  let uid = user.uid;

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUser();
    getPopular();
    getActors();
  }, []);

  const getPopular = () => {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${MOVIE_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setMovies(responseJson.results);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const getActors = () => {
    const url = `https://api.themoviedb.org/3/trending/person/week?api_key=${MOVIE_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setActors(responseJson.results);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
    console.log(actors);
  };

  const getUser = () => {
    let user = firebase.auth().currentUser;
    let uid = user.uid;

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
      <Text style={styles.header}>Welcome back {loggedUser}!</Text>

      <ScrollView>
        <View>
          <Text style={styles.header}> Popular movies at the moment </Text>
          <ScrollView horizontal={true}>
            {movies.map((movie, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Details", { movie: movie })
                  }
                  key={index}
                >
                  <Card>
                    <View key={index} style={styles.movies}>
                      <Image
                        style={styles.images}
                        resizeMode="contain"
                        source={{
                          uri: `http://image.tmdb.org/t/p/original${movie.poster_path}`,
                          height: undefined,
                          width: undefined,
                        }}
                      />

                      <Text style={styles.movieTitle}>{movie.title}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ backgroundColor: "black" }}>
          <Text style={styles.header}> Popular actors at the moment </Text>
          <ScrollView horizontal={true}>
            {actors.map((actor, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Actor", {
                      actor: actor.id,
                      profile: actor.profile_path,
                      known: actor.known_for,
                    })
                  }
                  key={index}
                  style={{
                    backgroundColor: "black",
                  borderColor: "black"}}
                >
                  <Card containerStyle={styles.cards}>
                    <View>
                      <Image
                        style={styles.actors}
                        resizeMode="contain"
                        source={{
                          uri: `http://image.tmdb.org/t/p/original${actor.profile_path}`,
                          height: undefined,
                          width: undefined,
                          backgroundColor: "black",
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
    height: 400,
    backgroundColor: "#000",
  },
  actors: {
    width: 300,
    height: 400,
    backgroundColor: "#000",
  },

  title: {
    fontSize: 36,
    justifyContent: "center",
    backgroundColor: "#000",
    color: "white",
  },

  cards: {
    borderWidth: 0,
    backgroundColor: "black",
  },
});
