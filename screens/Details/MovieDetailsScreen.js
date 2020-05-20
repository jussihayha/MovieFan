import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-community/picker";

import { MOVIE_KEY } from "react-native-dotenv";
import { Button } from "react-native-elements";
import YoutubePlayer from "react-native-youtube-iframe";
import firebase, { db } from "../../config/Firebase";
import { en, fi } from "../../components/lang/Translations";
import i18n from "i18n-js";

export default function MovieDetailsScreen({ route, navigation }) {
  const { movie, onList } = route.params;
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

  const addToList = () => {
    console.log(list);
    db.ref("users")
      .child(uid)
      .child("lists")
      .child(list)
      .child("movies")
      .push(movie);
  };


  const getLists = () => {
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
      
        {onList || lists == ""  ? (
         null
        ) : (<>
          <Picker
            mode="modal"
            style={{ height: 50, width: 200 }}
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
          
        <Button title={i18n.t("add_to_list")} onPress={addToList} /></>)}
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
