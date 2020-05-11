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

import { Button, ListItem } from "react-native-elements";
import firebase, { db } from "../../config/Firebase";
export default function MovieDetailsScreen({ route, navigation }) {
  const { movie } = route.params;
  const [lists, setLists] = useState("");
  const [list, setList] = useState("");

  let user = firebase.auth().currentUser;
  let uid = user.uid;

  useEffect(() => {
    getLists();
  }, []);

  const addToList = () => {
  
    db.ref("users").child(uid).child("lists").child(list).push(movie)

    Alert.alert("Movie added to your list.");
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
        setLists(data)
        console.log(lists)
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
        <Picker
          mode="dropdown"
          selectedValue={list}
          style={{ width: 200, color: "black", backgroundColor: "white" }}
          itemStyle={{ color: "white" }}
          onValueChange={(list) => setList(list)}
        >
          {Object.values(lists).map((list, index) => {
            return <Picker.Item key={index} label={list.id} value={list.id} />
          })}
        </Picker>
        <Button title="Add to watchlist" onPress={addToList} />
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

  list: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "space-between",
    color: "white",
    marginBottom: 40,
  },
});
