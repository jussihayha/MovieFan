import * as React from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { ListItem, Input, Button } from "react-native-elements";
import { useEffect, useState } from "react";
import firebase, { db } from "../../config/Firebase";

export default function ListsScreen({ navigation }) {
  const [lists, setLists] = useState("");
  const [list, setList] = useState("");
  const [name, setName] = useState("");

  const user = firebase.auth().currentUser;
  const uid = user.uid;

  useEffect(() => {
    getLists();
  }, []);

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
        console.log(data);
      });
  };

  const deleteList = (list) => {
    console.log(list);
    db.ref("users").child(uid).child("lists/").child(list).remove();
    Alert.alert(`Wanna delete ${list}`);

    getLists();
  };

  const addList = () => {
    let user = firebase.auth().currentUser;
    let uid = user.uid;

      db.ref("users").child(uid).child("lists").child(`${name}`).set(name)

    Alert.alert("Movie added to your list.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your lists</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Add new list"
          value={name}
          onChangeText={(name) => setName(name)}
          style={styles.input}
          inputStyle={{ color: "white" }}
        />
        <Button title="Add" buttonStyle={styles.button} onPress={addList} />
      </View>
      <View style={styles.cards}>
        {Object.values(lists).map((list, index) => {
          return (
            <ListItem
              key={index}
              title={list.list}
              bottomDivider={true}
              onPress={() => navigation.navigate("Details", { list: list })}
              onLongPress={() => deleteList(list.id)}
            />
          );
        })}
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
