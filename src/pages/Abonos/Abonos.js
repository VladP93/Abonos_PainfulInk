import React, { useState } from "react";
import { Button, Modal } from "@material-ui/core";
import MaterialTable from "material-table";
import Form from "../../components/NuevoClienteForm";
import Fondo from "../../assets/70654501_154886548921252_5749499049328011454_n.jpg";

import "./Abonos.css";

export default function Abonos() {
  const [open, setOpen] = React.useState(false);

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
        <img src={rowData.imageUrl} alt="tattoo" style={{ width: 100 }} />
      ),
    },
  ];

  const actions = [
    {
      icon: "create",
      tooltip: "Save User",
      onClick: (event, rowData) => {
        // Do save operation
      },
    },
    {
      icon: "delete",
      tooltip: "Save User",
      onClick: (event, rowData) => {
        // Do save operation
      },
    },
  ];

  const data = [
    {
      cliente: "Gerardo Vladimir Paniagua Sandoval",
      monto: "40",
      imageUrl:
        "https://www.vikingo.top/wp-content/uploads/2019/07/valknut-300x150.png",
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          onClick={handleOpen}
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
        <Form />
      </Modal>
    </div>
  );
}
