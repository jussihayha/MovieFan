import * as React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { MOVIE_KEY } from "react-native-dotenv";

export default function ActorDetailsScreen({ route, navigation }) {
  const { actor, profile } = route.params;
  const { known } = route.params;
  const [actorDetails, setActorDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = `https://api.themoviedb.org/3/person/${actor}/movie_credits?api_key=${MOVIE_KEY}&language=en-US&sort_by=release_date.asc`;
      let response = await fetch(url);
      response = await response.json();

      setActorDetails(response.cast);
      setLoading(false);
    };
    fetchDetails();

  }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView>
          <Image
            resizeMode="contain"
            source={{
              uri: `http://image.tmdb.org/t/p/original${profile}`,
              width: Dimensions.get("window").width,
              height: 600,
            }}
          />
          <Text style={styles.paragraph}>Biography:</Text>
        </ScrollView>

        <Text style={styles.header}> Popular actors at the moment </Text>
        <ScrollView>
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
                  rightSubtitle={
                    movie.vote_average == "0,"
                      ? null
                      : `Rating: ${movie.vote_average}`
                  }
                  rightTitle={movie.release_date}
                    bottomDivider={true}
                    onPress={() =>
                      navigation.navigate("Movie details", { movie: movie })
                    }
                    onLongPress={() => console.log(movie)}
                  />
                );
              })}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },

  bio: {
    fontSize: 16,
    color: "white",
  },

  list: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "space-between",
    color: "white",
    marginBottom: 40,
  },

  title: {
    fontSize: 36,
    justifyContent: "center",
    backgroundColor: "#000",
    color: "white",
  },

  movies: {
    width: 300,
    height: 400,
  },
  cards: {
    borderWidth: 0,
    backgroundColor: "black",
  },
});
