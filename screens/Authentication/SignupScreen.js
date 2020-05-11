import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import firebase, { db } from "../../config/Firebase";


export default function SignupScreen({ navigation }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        
        let uid = userCredentials.user.uid;

        db.ref("users").child(uid).child("details").set({
          firstname: firstname,
          lastname: lastname,
          mode: "light",
          language: "fi"
        });
      })
      .then(() => navigation.navigate("Login"))
      .catch(error => setErrorMessage(error.message));
  }



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup</Text> 
      {errorMessage == "" ? null : <Text style={{ color: 'red', fontSize: 20 }}>
        {errorMessage}
      </Text>}
      <TextInput
        style={styles.inputBox}
        value={firstname}
        onChangeText={(firstname) => setFirstName(firstname)}
        placeholder="Firstname"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={lastname}
        onChangeText={(lastname) => setLastName(lastname)}
        placeholder="Lastname"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FFA611",
    borderColor: "#FFA611",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  }
});
