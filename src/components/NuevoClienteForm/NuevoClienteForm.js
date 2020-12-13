import React from "react";
import { TextField, Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

import "./NuevoClienteForm.css";

export default function NuevoClienteForm() {
  return (
    <div className="container">
      <form className="form-cliente">
        <h3>Form</h3>
        <div className="textfield-container">
          <TextField
            id="standard-basic"
            label="Cliente"
            className="textfield"
            variant="standard"
          />
        </div>
        <div className="textfield-container">
          <TextField
            id="standard-number"
            label="Monto ($)"
            className="textfield"
            variant="standard"
          />
        </div>
        <div className="dropzone-container">
          <DropzoneArea onChange={(files) => console.log("Files:", files)} />
        </div>
        <div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            className="button-ingresar"
          >
            Agregar
          </Button>
        </div>
        <br />
      </form>
    </div>
  );
}
