import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Picker,
} from "react-native";

import { MOVIE_KEY } from "react-native-dotenv";
import { Button } from "react-native-elements";
import YoutubePlayer from "react-native-youtube-iframe";
import firebase, { db } from "../../config/Firebase";
export default function MovieDetailsScreen({ route, navigation }) {
  const { movie } = route.params;
  const [lists, setLists] = useState("");
  const [list, setList] = useState("");
  const [trailer, setTrailer] = useState("");

  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  let user = firebase.auth().currentUser;
  let uid = user.uid;

  useEffect(() => {
    getTrailer();
    getLists();

    return () => {
      trailerLoaded = true;
      listLoaded = true;
    };
  }, [movie.id]);

  const getTrailer = () => {
    let trailerLoaded = false;
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

  const addToList = () => {
    console.log(list);
   db.ref("users").child(uid).child("lists").child(list).child("movies").push(movie);
    
  };
  console.log(list);

  const getLists = () => {
    let listLoaded = false;
    db.ref("users")
      .child(uid)
      .child("lists/")
      .on("value", (snapshot) => {
        let data = [];
        snapshot.forEach((child) => {
          data.push({
            id: child.key,
            list: child.val(),
          });
        });

        setLists(data);
      
      });
  };

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
        {lists == "" ? (
          <Text style={styles.list}>Go create a list in the list section </Text>
        ) : (
          <Picker
            mode="dropdown"
            selectedValue={list}
            itemStyle={{ color: "black" }}
            style={{ backgroundColor: "white" }}
            onValueChange={(list) => setList(list)}
          >
            {Object.values(lists).map((list, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={list.list.name}
                  value={list.id}
                />
              );
            })}
          </Picker>
        )}
        <Button title="Add to list" onPress={addToList}></Button>
        {trailer == null ? (
          <Text style="list">No trailer available</Text>
        ) : (
          <YoutubePlayer
            ref={playerRef}
            height={300}
            width={400}
            videoId={trailer.key}
            play={playing}
            volume={50}
            playbackRate={1}
            playerParams={{
              cc_lang_pref: "us",
              showClosedCaptions: true,
            }}
          />
        )}
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
