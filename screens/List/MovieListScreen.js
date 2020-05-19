import * as React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { useEffect, useState } from "react";
import firebase, { db } from "../../config/Firebase";

export default function MovieListScreen({ navigation, route }) {
  const [movies, setMovies] = useState("");
  const { list } = route.params;
  const user = firebase.auth().currentUser;
  const uid = user.uid;

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {

    db.ref("users")
      .child(uid)
      .child("lists/")
      .child(list.id)
      .child("movies")
      .on("value", (snapshot) => {
        let data = [];

        snapshot.forEach((child) => {
          data.push({
            id: child.key,
            movie: child.val(),
          });
        });
        setMovies(data);
      });
  };

  const deleteMovie = (movie) => {
    db.ref("users").child(uid).child("lists/").child(list.id).child("movies/").child(movie.id).remove();
    Alert.alert(`Wanna delete ${movie.movie.title}`);
    console.log(movie);
    getMovies();
  };

  return (
    <View style={styles.cards}>
      {movies === null
        ? null
        : Object.values(movies).map((movie, index) => {
            return (
              <ListItem
                key={index}
                title={movie.movie.title}
                leftAvatar={{
                  source: {
                    uri: `http://image.tmdb.org/t/p/original${movie.movie.poster_path}`,
                  },
                }}
                bottomDivider={true}
                onPress={() =>
                  navigation.navigate("Movie details", {
                    movie: movie.movie,
                    onList: true,
                  })
                }
                onLongPress={() => deleteMovie(movie)}
              />
            );
          })}
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

  inputContainer: {
    paddingTop: 15,
  },

  button: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5,
  },

  input: {
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cards: {
    marginTop: "10%",
  },
});
