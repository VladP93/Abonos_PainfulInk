import React, { useState } from "react";
import { TextField, Card, CardContent, Grid, Button } from "@material-ui/core";
import Fondo from "../../assets/Logo.jpg";

import "./Login.css";

import firebase from "../../utils/firebase";
import "firebase/auth";

export default function Login(props) {
  const { setUser, setAlertMessage, setAlertType, setOpenAlert } = props;
  const [formData, setFormData] = useState(defaultValues());

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(formData.user, formData.password)
      .then((response) => {
        setUser(response.user);
        setAlertType("success");
        setAlertMessage("Sesión iniciada, bienvenido " + formData.user);
        setOpenAlert(true);
      })
      .catch((err) => {
        if (err.code === "auth/internal-error") {
          setAlertType("error");
          setAlertMessage("Datos de acceso incorrectos");
          setOpenAlert(true);
        }
      });

    event.preventDefault();
  };

  return (
    <div
      className="card-container"
      style={{ backgroundImage: "url(" + Fondo + ")" }}
    >
      <Grid container spacing={0}>
        <Grid lg={4} md={4} sm={12} xs={12}></Grid>
        <Grid lg={4} md={4} sm={12} xs={12}>
          <Card className="card">
            <CardContent>
              <form onChange={onChange} onSubmit={onSubmit}>
                <h2>Painful Ink Tattoo Studio</h2>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Usuario"
                    name="user"
                    className="textfield"
                    variant="standard"
                  />
                </div>
                <br />
                <div>
                  <TextField
                    id="standard-password-input"
                    label="Contraseña"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    className="textfield"
                    variant="standard"
                  />
                </div>
                <br />
                <br />
                <div>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className="button-ingresar"
                    onClick={onSubmit}
                  >
                    Ingresar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid lg={4} md={4} sm={12} xs={12}></Grid>
      </Grid>
    </div>
  );
  function defaultValues() {
    return {
      user: "",
      password: "",
    };
  }
}
