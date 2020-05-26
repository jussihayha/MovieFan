import * as React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { MOVIE_KEY } from "react-native-dotenv";
import { en, fi } from "../../components/lang/Translations";
import i18n from "i18n-js";
export default function ActorDetailsScreen({ route, navigation }) {
  const { actor, profile, overview, name } = route.params;

  const [actorDetails, setActorDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = `https://api.themoviedb.org/3/person/${actor}/movie_credits?api_key=${MOVIE_KEY}&language=en-US&page=2`;
      let response = await fetch(url);
      response = await response.json();

      setActorDetails(response.cast);
      setLoading(false);
    };
    fetchDetails();
  }, []);

  return (
    <View style={{ backgroundColor: "#282D4F" }}>
      <Text style={styles.header}>{name}</Text>

      <View style={styles.cards}>
        <ScrollView>
          <Image
            resizeMode="contain"
            source={{
              uri: `http://image.tmdb.org/t/p/original${profile}`,
              height: 500,
              width: 500,
            }}
          />
          <Text>{overview}</Text>
          {loading
            ? null
            : actorDetails.map((movie, index) => {
                return (
                  <ListItem
                    key={index}
                    title={movie.title}
                    leftAvatar={{
                      source: {
                        uri: `http://image.tmdb.org/t/p/original${movie.poster_path}`,
                      },
                    }}
                    rightSubtitle={`Rating ${movie.vote_average}`}
                    bottomDivider={true}
                    onPress={() => {
                      navigation.navigate("Movie details", { movie: movie });
                    }}
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
