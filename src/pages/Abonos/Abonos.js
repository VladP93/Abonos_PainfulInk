import React, { useState, useEffect } from "react";
import { Button, Modal } from "@material-ui/core";
import MaterialTable from "material-table";
import Form from "../../components/NuevoClienteForm";
import Fondo from "../../assets/Logo.jpg";
import NoImage from "../../assets/NoImage.png";

import "./Abonos.css";

import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";

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
    },
    {
      title: "Tattoo",
      field: "imageUrl",
      render: (rowData) => (
        <img
          src={rowData.imageUrl === "NoImage.png" ? NoImage : rowData.imageUrl}
          alt="tattoo"
          style={{ width: 50, height: 40 }}
        />
      ),
    },
  ];

  const actions = [
    {
      icon: "add",
      tooltip: "Agregar abono",
      onClick: (event, rowData) => {
        // Do save operation
      },
    },
    {
      icon: "delete",
      tooltip: "Eliminar registro",
      onClick: (event, rowData) => {
        // Do save operation
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleModal = (modalName) => {
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
      default:
        setModalChild(<h2>Ventana Modal</h2>);
    }
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
          className="button-agregar"
          onClick={() => {
            handleModal("agregarCliente");
          }}
        >
          Agregar Cliente
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
