import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Text, Card } from "react-native-elements";

import { MOVIE_KEY } from "react-native-dotenv";

export default function ActorDetailsScreen({ route, navigation }) {
  const { actor, profile } = route.params;
  const { known } = route.params;

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
          {known.map((movie, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Details", { movie: movie })}
                key={index}
              >
                <Card>
                  <View>
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: `http://image.tmdb.org/t/p/w342${movie.poster_path}`,
                        height: 400,
                        width: 400,
                      }}
                    />
                    <Text style={styles.title}>{actor.name}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
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

  movies: {
    width: 300,
    height: 400,
  },
  actors: {
    width: 300,
    height: 400,
  },
});
