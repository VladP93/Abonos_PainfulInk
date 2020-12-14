import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

import "./AbonarForm.css";

import firebase from "../../utils/firebase";
import "firebase/firestore";

const db = firebase.firestore(firebase);

export default function AbonarForm(props) {
  const {
    rowData,
    handleCloseModal,
    setAlertMessage,
    setAlertType,
    setOpenAlert,
    setRefresh,
    abonar,
  } = props;
  const [formData, setFormData] = useState(defaultValue());

  const aceptar = () => {
    if (!formData.monto.toString().match(/^[0-9]+(\.[0-9]{1,2})?$/gm)) {
      setAlertType("error");
      setAlertMessage("Valor de monto incorrecto");
      setOpenAlert(true);
    } else {
      var abono = formData.monto;
      if (abonar) {
        formData.monto = Number(formData.monto) + Number(rowData.monto);
      } else {
        formData.monto = Number(rowData.monto) - Number(formData.monto);
      }

      db.collection("abonos")
        .doc(rowData.id)
        .update(formData)
        .then(() => {
          setAlertType("success");
          setAlertMessage(
            `${abonar ? "Abono" : "Cargo"} de $${abono} aplicado, total $${
              formData.monto
            }`
          );
          setOpenAlert(true);
          setRefresh(true);
          handleCloseModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cancelar = () => {
    setAlertType("error");
    setAlertMessage("Abono cancelado");
    setOpenAlert(true);
    handleCloseModal();
  };

  return (
    <form onChange={onChange}>
      <p style={{ fontSize: 20 }}>
        Agregar {abonar ? "abono (+)" : "cargo (-)"} a: <b>{rowData.cliente}</b>
      </p>
      <div className="textfield-container">
        <TextField
          id="standard-number"
          label="Monto ($)"
          className="textfield"
          variant="standard"
          name="monto"
        />
      </div>
      <div class="buttons-container">
        <Button
          variant="contained"
          color="primary"
          className="button-agregar"
          onClick={() => {
            aceptar();
          }}
        >
          Aceptar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="button-agregar"
          onClick={() => {
            cancelar();
          }}
        >
          Cerrar
        </Button>
      </div>
    </form>
  );
  function defaultValue() {
    return {
      monto: 0.0,
    };
  }
}
