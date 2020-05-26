import * as React from "react";
import { ScrollView } from "react-native";
import { useState } from "react";
import { StyleSheet, View, Alert, Switch } from "react-native";
import { MOVIE_KEY } from "react-native-dotenv";
import * as Localization from "expo-localization";
import { en, fi } from "../../components/lang/Translations";
import i18n from "i18n-js";
import { Button, Input, Text, ListItem } from "react-native-elements";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState(true);

  const searchStuff = () => {
    if (value) {
      getPeople();
    } else {
      getMovies();
    }
  };

  const getMovies = () => {
    if (query === null || query == "") {
      Alert.alert(i18n.t("query_blank"));
    } else {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
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
      Alert.alert(i18n.t("query_blank"));
    } else {
      const url = `https://api.themoviedb.org/3/search/person?api_key=${MOVIE_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
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
      <View style={styles.header}>
        <Text style={styles.header}>
          {value
            ? i18n.t("people_search_header")
            : i18n.t("movie_search_header")}
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
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder={value ? i18n.t("people") : i18n.t("movies")}
          value={query}
          onChangeText={(query) => setQuery(query)}
          style={styles.input}
          inputStyle={{ color: "white" }}
        />
        <Button
          title={i18n.t("search")}
          buttonStyle={styles.button}
          onPress={searchStuff}
        />
      </View>
      <View style={styles.cards}>
        <ScrollView>
          {movies.map((movie, index) => {
            return (
              <ListItem
                key={index}
                title={value ? movie.name : movie.title}
                leftAvatar={{
                  source: {
                    uri: `http://image.tmdb.org/t/p/original${
                      value ? movie.profile_path : movie.poster_path
                    }`,
                  },
                }}
                rightSubtitle={
                  value
                    ? movie.known_for_department
                    : `Rating: ${movie.vote_average}`
                }
                bottomDivider={true}
                onPress={() => {
                  value
                    ? navigation.navigate("Actor details", {
                        actor: movie.id,
                        profile: movie.profile_path,
                        known: movie.known_for,
                        overview: movie.overview,
                        name: movie.name,
                      })
                    : navigation.navigate("Movie details", { movie: movie });
                }}
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
    backgroundColor: "#282D4F",
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
  text: {
    fontSize: 16,
    color: "white",
  },

  toggle: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
