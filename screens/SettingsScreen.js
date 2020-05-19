import * as React from "react";
import { View, Switch, Text } from "react-native";
import { useState } from "react";
import i18n from "i18n-js";

export default function SettingsScreen({}) {
  const [value, setValue] = useState(0);

  const en = {
    settings: "Settings",
    english: "English",
    finnish: "Finnish",
  };

  const fi = {
    settings: "Asetukset",
    english: "Englanniksi",
    finnish: "Suomeksi",
  };
  i18n.fallbacks = true;
  i18n.translations = { fi, en };

  if (value) {
    i18n.local = "fi";
    console.log(value);
  } else {
    i18n.locale = "en";
  }

  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 32 }}>
        {i18n.t("settings")}
      </Text>
      <Text></Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Text>{i18n.t("english")}</Text>
        <Switch value={value} onValueChange={(value) => setValue(value)} />
        <Text>{i18n.t("finnish")}</Text>
      </View>
    </View>
  );
}