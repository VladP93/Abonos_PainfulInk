import React, { useState, useEffect } from "react";
import { Button, Modal } from "@material-ui/core";
import MaterialTable from "material-table";

import Form from "../../components/NuevoClienteForm";
import AbonarForm from "../../components/AbonarForm";
import EliminarForm from "../../components/EliminarRegistroForm";

import Fondo from "../../assets/Logo.jpg";
import NoImage from "../../assets/NoImage.png";
import "./Abonos.css";

import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const db = firebase.firestore(firebase);

export default function Abonos(props) {
  const { setAlertMessage, setAlertType, setOpenAlert } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalChild, setModalChild] = useState(<h2>Ventana Modal</h2>);

  useEffect(() => {
    db.collection("abonos")
      .get()
      .then((res) => {
        const arrayAbonos = [];
        res.docs.forEach((abono) => {
          const data = abono.data();
          data.id = abono.id;
          arrayAbonos.push(data);
        });
        setData(arrayAbonos);
      })
      .catch((err) => {
        console.log(err);
      });
    setRefresh(false);
  }, [refresh]);

  const columns = [
    {
      title: "Cliente",
      field: "cliente",
    },
    {
      title: "Monto($)",
      field: "monto",
      type: "currency",
      align: "left",
    },
    {
      title: "Tattoo",
      field: "imageUrl",
      render: (rowData) => (
        <a href={rowData.imageUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={
              rowData.imageUrl === "NoImage.png" ? NoImage : rowData.imageUrl
            }
            alt="tattoo"
            style={{ width: 50, height: 40 }}
          />
        </a>
      ),
    },
  ];

  const actions = [
    {
      icon: "add",
      tooltip: "Agregar abono",
      onClick: (event, rowData) => {
        handleModal("abonar", rowData);
      },
    },
    {
      icon: "remove",
      tooltip: "Cargo",
      onClick: (event, rowData) => {
        handleModal("cargar", rowData);
      },
    },
    {
      icon: "delete",
      tooltip: "Eliminar registro",
      onClick: (event, rowData) => {
        handleModal("eliminar", rowData);
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleModal = (modalName, rowData) => {
    switch (modalName) {
      case "agregarCliente":
        setModalChild(
          <Form
            handleCloseModal={handleClose}
            setAlertMessage={setAlertMessage}
            setAlertType={setAlertType}
            setOpenAlert={setOpenAlert}
            setRefresh={setRefresh}
          />
        );
        setOpen(true);
        break;
      case "abonar":
        setModalChild(
          <AbonarForm
            rowData={rowData}
            handleCloseModal={handleClose}
            setAlertMessage={setAlertMessage}
            setAlertType={setAlertType}
            setOpenAlert={setOpenAlert}
            setRefresh={setRefresh}
            abonar={true}
          />
        );
        setOpen(true);
        break;
      case "cargar":
        setModalChild(
          <AbonarForm
            rowData={rowData}
            handleCloseModal={handleClose}
            setAlertMessage={setAlertMessage}
            setAlertType={setAlertType}
            setOpenAlert={setOpenAlert}
            setRefresh={setRefresh}
            abonar={false}
          />
        );
        setOpen(true);
        break;
      case "eliminar":
        setModalChild(
          <EliminarForm
            rowData={rowData}
            handleCloseModal={handleClose}
            setAlertMessage={setAlertMessage}
            setAlertType={setAlertType}
            setOpenAlert={setOpenAlert}
            setRefresh={setRefresh}
          />
        );
        setOpen(true);
        break;
      default:
        setModalChild(<h2>Ventana Modal</h2>);
    }
  };

  const cerrarSesion = () => {
    setAlertMessage("Cerrando sesión...");
    setAlertType("warning");
    setOpenAlert(true);
    firebase.auth().signOut();
  };

  return (
    <div
      style={{ backgroundImage: "url(" + Fondo + ")" }}
      className="main-container"
    >
      <h2 className="title">Abonos</h2>
      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={() => {
            handleModal("agregarCliente");
          }}
        >
          Agregar Cliente
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="button"
          onClick={() => {
            cerrarSesion();
          }}
        >
          Cerrar sesión
        </Button>
      </div>
      <MaterialTable
        title="Control Abonos"
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
        }}
        actions={actions}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ width: 350 }}
      >
        <div className="container-modal">{modalChild}</div>
      </Modal>
    </div>
  );
}
