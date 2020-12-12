import React from "react";
import { TextField, Card, CardContent, Grid, Button } from "@material-ui/core";
import Fondo from "../../assets/70654501_154886548921252_5749499049328011454_n.jpg";

import "./Login.css";

export default function Login() {
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
              <form>
                <h2>Painful Ink Tattoo Studio</h2>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Usuario"
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
}
