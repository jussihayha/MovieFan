import * as React from "react";
import { useState, useEffect, createContext } from "react";
import LoggedInNav from "../navigation/LoggedInNav";
import LoggedOutNav from "../navigation/LoggedOutNav";
import firebase from "../config/Firebase";

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(result) {
    setUser(result);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const authSubscriber = firebase
      .auth()
      .onAuthStateChanged(onAuthStateChanged);

    return authSubscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <LoggedInNav />
    </AuthContext.Provider>
  ) : (
    <LoggedOutNav />
  );
}
export const AuthContext = createContext(null);
