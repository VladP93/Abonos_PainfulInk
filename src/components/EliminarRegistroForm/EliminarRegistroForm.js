import React from "react";
import { Button } from "@material-ui/core";

import "./EliminarRegistroForm.css";

import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore(firebase);

export default function EliminarRegistroForm(props) {
  const {
    rowData,
    handleCloseModal,
    setAlertMessage,
    setAlertType,
    setOpenAlert,
    setRefresh,
  } = props;

  const cancelar = () => {
    setAlertType("error");
    setAlertMessage("Operación cancelada, el registro no ha sido eliminado");
    setOpenAlert(true);
    handleCloseModal();
  };

  const aceptar = () => {
    var mensaje = "";
    if (rowData.imageName !== "NoImage.png") {
      firebase
        .storage()
        .ref()
        .child(`tattoos/${rowData.imageName}`)
        .delete()
        .then(() => {
          mensaje = "con su imagen";
        })
        .catch((err) => {
          console.log(err);
        });
    }
    db.collection("abonos")
      .doc(rowData.id)
      .delete()
      .then(() => {
        setAlertType("warning");
        setAlertMessage(
          `El registro ${rowData.cliente} ha sido ELIMINADO ${mensaje}.`
        );
        setOpenAlert(true);
        handleCloseModal();
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form>
      <p>
        ¿Está seguro que quiere eliminar el registro del cliente{" "}
        <b>{rowData.cliente}</b> con saldo de <b>${rowData.monto}</b>?<br />
        <span style={{ fontSize: 12, fontFamily: "-moz-initial" }}>
          (Una vez realizada esta operación, los datos no se pueden recuperar)
        </span>
      </p>
      <div class="buttons-container">
        <Button
          variant="contained"
          color="secondary"
          className="button-agregar"
          onClick={() => {
            aceptar();
          }}
        >
          Eliminar
        </Button>
        <Button
          variant="contained"
          color="primary"
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
}
