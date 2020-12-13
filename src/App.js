import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Abonos from "./pages/Abonos";

import firebase from "./utils/firebase";
import "firebase/auth";
import "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  return <div className="App">{user ? <Login /> : <Abonos />}</div>;
}

export default App;
