import * as React from "react";
import { useEffect, useState } from "react";
import { View, Button, Text, Alert } from "react-native";
import firebase, { db } from "../config/Firebase";
import { Input } from "react-native-elements";

export default function ProfileScreen({ navigation }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mode, setMode] = useState("");
  const [language, setLanguage] = useState("");

  let user = firebase.auth().currentUser;
  let uid = user.uid;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    db.ref("users")
      .child(uid)
      .child("details")
      .on("value", (snapshot) => {
        const data = snapshot.val();

        setFirstName(data.firstname);
        setLastName(data.lastname);
        setMode(data.mode);
        setLanguage(data.language);
      });
  };

  const saveChanges = () => {
    db.ref("users").child(uid).child("details").set({
      firstname: firstname,
      lastname: lastname,
      mode: mode,
      language: language,
    });

    Alert.alert("Changes saved!");
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 32 }}>Profile</Text>
      </View>
      <View>
        <Input
          label="Firstname"
          value={firstname}
          onChangeText={(firstname) => setFirstName(firstname)}
        ></Input>
        <Input
          label="Lastname"
          value={lastname}
          onChangeText={(lastname) => setLastName(lastname)}
        ></Input>
        <Button title="Save changes" onPress={saveChanges} />
      </View>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}
