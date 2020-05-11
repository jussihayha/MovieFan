import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

const Translations = () => {
  const en = {
    settings: "Settings",
    english: "English",
    finnish: "Finnish",
    language: "Language",
  };

  const fi = {
    settings: "Asetukset",
    english: "Englanniksi",
    finnish: "Suomeksi",
    language: "Kieli",
  };
  i18n.fallbacks = true;
  i18n.translations = { fi, en };
};

export default Translations;
