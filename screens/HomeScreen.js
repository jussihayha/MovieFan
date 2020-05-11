import * as React from "react";
import { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import firebase, { db } from "../config/Firebase";


export default function HomeScreen({ navigation }) {

  const [loggedUser, setLoggedUser] = useState("");

  let user = firebase.auth().currentUser;
  let uid = user.uid;
  console.log(uid);
  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    let user = firebase.auth().currentUser;
    let uid = user.uid;

    db.ref("users")
      .child(uid)
      .child("details")
      .on("value", (snapshot) => {
        const data = snapshot.val();

        setLoggedUser(data.firstname);
        console.log(data.lastname);
      });
  };



  return (
    <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: "#000" }}>
      <View>
        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 32 }}>Welcome back {loggedUser}!</Text>
        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>Check for popular movies in the search field.</Text>
        
      </View>
    
    </View>
  );
}
