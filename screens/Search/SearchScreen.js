import * as React from "react";
import { ScrollView } from "react-native";
import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { MOVIE_KEY } from "react-native-dotenv";
import * as Localization from "expo-localization";
import { en, fi } from "../../components/lang/Translations";
import i18n from "i18n-js";
import { Button, Input, Text, ListItem } from "react-native-elements";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  console.log();
  const getMovies = () => {
    if (query === null || query == "") {
      Alert.alert("Query cannot be blank");
    } else {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&language=fi-FI&query=${query}&page=1&include_adult=false`;
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          setMovies(responseJson.results);
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
  };

  const getPeople = () => {
    if (query === null || query == "") {
      Alert.alert("Query cannot be blank");
    } else {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&language=fi-FI&query=${query}&page=1&include_adult=false`;
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          setMovies(responseJson.results);
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movie finder</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Find movies"
          value={query}
          onChangeText={(query) => setQuery(query)}
          style={styles.input}
          inputStyle={{ color: "white" }}
        />
        <Button
          title="Search"
          buttonStyle={styles.button}
          onPress={getMovies}
        />
      </View>
      <View style={styles.cards}>
        <ScrollView>
          {movies.map((movie, index) => {
            return (
              <ListItem
                key={index}
                title={movie.title}
                leftAvatar={{
                  source: {
                    uri: `http://image.tmdb.org/t/p/original${movie.poster_path}`,
                  },
                }}
                rightSubtitle={
                  movie.vote_average == "0,"
                    ? `Rating: ${movie.vote_average}`
                    : null
                }
                bottomDivider={true}
                onPress={() =>
                  navigation.navigate("Movie details", { movie: movie })
                }
                onLongPress={() => console.log(movie)}
              />
            );
          })}
        </ScrollView>
      </View>
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
    flex: 1,
  },
});
