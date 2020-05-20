import * as React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { useState } from "react";
import firebase, { db } from "../../config/Firebase";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { en, fi } from "../../components/lang/Translations";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
export default function ForgotPasswordScreen({ navigation }) {
  i18n.translations = { fi, en };

  const [email, setEmail] = useState("");

  async function passwordReset() {
    if (email == "" || email == null) {
      Alert.alert(i18n.t("email_blank"));
    } else {
      try {
        await firebase
          .auth()
          .sendPasswordResetEmail(email)

          .catch((error) => Alert.alert(error));
      } catch (e) {}
      Alert.alert(i18n.t("password_message"));
      navigation.navigate("Login");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {i18n.t("reset_pw")} </Text>
      <Input
        containerStyle={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder={i18n.t("email")}
        placeholderTextColor="white"
        inputStyle={{ color: "white" }}
        leftIcon={<FontAwesome name="envelope-o" size={24} color="white" />}
      />

      <Button
        buttonStyle={styles.button}
        title={i18n.t("reset_pw_btn")}
        onPress={() => passwordReset()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282D4F",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontWeight: "bold",
    fontSize: 28,
    color: "white",
  },

  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,

    textAlign: "center",
    color: "white",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
});
