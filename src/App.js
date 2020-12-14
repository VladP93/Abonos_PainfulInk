import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "./App.css";
import Login from "./pages/Login";
import Abonos from "./pages/Abonos";

import firebase from "./utils/firebase";
import "firebase/auth";
import "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  firebase.auth().onAuthStateChanged((currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="App">
      {user ? (
        <Login />
      ) : (
        <Abonos
          setAlertMessage={setAlertMessage}
          setAlertType={setAlertType}
          setOpenAlert={setOpenAlert}
        />
      )}
      <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
