import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Picker,
} from "react-native";
import { WebView } from "react-native-webview";
import { Video } from "expo-av";
import { MOVIE_KEY } from "react-native-dotenv";
import { Button, ListItem } from "react-native-elements";
import firebase, { db } from "../../config/Firebase";
export default function MovieDetailsScreen({ route, navigation }) {
  const { movie } = route.params;
  const [lists, setLists] = useState("");
  const [list, setList] = useState("");
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    getTrailer();
  }, [movie.id]);

  const getTrailer = () => {
    const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${MOVIE_KEY}&language=en-US`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setTrailer(Object.values(responseJson.results)[0]);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  console.log(trailer.key);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: `http://image.tmdb.org/t/p/w342${movie.poster_path}` }}
          style={{ width: 342, height: 500, alignSelf: "center" }}
        />
        <Text style={styles.paragraph}>Plot:</Text>
        <Text style={styles.list}>
          {movie.overview == "" ? (
            <Text>No plot available </Text>
          ) : (
            movie.overview
          )}
        </Text>
        <Picker
          mode="dropdown"
          selectedValue={list}
          itemStyle={{ color: "white" }}
          onValueChange={(list) => setList(list)}
        >
          {Object.values(lists).map((list, index) => {
            return (
              <Picker.Item key={index} label={list.list.name} value={list.id} />
            );
          })}
        </Picker>
        {trailer == undefined ? null :
          <WebView
            source={{
              uri: `https://www.youtube.com/watch?v=${trailer.key}`,
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            isLooping
            resizeMode="cover"
            shouldPlay
            style={{
              width: 400,
              height: 500,
              backgroundColor: "white",
            }}
            useNativeControls
          />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 8,
    justifyContent: "center",
    textAlign: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },

  list: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "space-between",
    color: "white",
    marginBottom: 40,
  },
});
