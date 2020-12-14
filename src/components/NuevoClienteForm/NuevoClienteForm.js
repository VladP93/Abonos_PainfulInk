import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

import "./NuevoClienteForm.css";

import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore(firebase);

export default function NuevoClienteForm(props) {
  const {
    handleCloseModal,
    setAlertMessage,
    setAlertType,
    setOpenAlert,
    setRefresh,
  } = props;
  const [formData, setFormData] = useState(defaultValues());
  const [file, setFile] = useState(null);

  const agregar = () => {
    if (!formData.cliente || formData.cliente === "") {
      setAlertType("error");
      setAlertMessage("El campo cliente no puede estar vacío");
      setOpenAlert(true);
    } else {
      (!formData.monto || formData.monto === "") && (formData.monto = 0.0);
      if (!formData.monto.toString().match(/^[0-9]+(\.[0-9]{1,2})?$/gm)) {
        setAlertType("error");
        setAlertMessage("Valor de monto incorrecto");
        setOpenAlert(true);
      } else {
        if (file) {
          var imageUrl = new Date().getTime() + "-" + formData.cliente;
          formData.imageUrl = imageUrl;
          uploadImage(imageUrl).then(async () => {
            await firebase
              .storage()
              .ref(`tattoos/${imageUrl}`)
              .getDownloadURL()
              .then((url) => {
                formData.imageUrl = url;
              });
            db.collection("abonos")
              .add(formData)
              .then(() => {
                setAlertType("success");
                setAlertMessage(
                  `Cliente ${formData.cliente} ha sido agregado con el monto de $${formData.monto}`
                );
                setOpenAlert(true);
              });
          });
        } else {
          formData.imageUrl = "NoImage.png";
          db.collection("abonos")
            .add(formData)
            .then(() => {
              setAlertType("success");
              setAlertMessage(
                `Cliente ${formData.cliente} ha sido agregado con el monto de $${formData.monto} sin tattoo elegido`
              );
              setOpenAlert(true);
            });
        }
        setRefresh(true);
        handleCloseModal();
      }
    }
  };

  const uploadImage = (imageUrl) => {
    const ref = firebase.storage().ref().child(`tattoos/${imageUrl}`);

    return ref.put(file);
  };

  const onChange = (e) => {
    e?.target?.name !== "" &&
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  };

  return (
    <div>
      <form onChange={onChange}>
        <h3>Agregar cliente</h3>
        <div className="textfield-container">
          <TextField
            id="standard-basic"
            label="Cliente"
            className="textfield"
            variant="standard"
            name="cliente"
          />
        </div>
        <div className="textfield-container">
          <TextField
            id="standard-number"
            label="Monto ($)"
            className="textfield"
            variant="standard"
            name="monto"
          />
        </div>
        <div className="dropzone-container">
          <DropzoneArea
            onChange={(files) => setFile(files[0])}
            showPreviews={false}
          />
        </div>
        <div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            className="button-ingresar"
            onClick={agregar}
          >
            Agregar
          </Button>
        </div>
        <br />
      </form>
    </div>
  );

  function defaultValues() {
    return {
      cliente: "",
      monto: 0.0,
      imageUrl: "",
    };
  }
}
