import React, { Component } from "react";
import { MDBNotification } from "mdbreact";

const Notification = (props) => {
  let { sucesso } = props;
  return (
    <MDBNotification
      iconClassName={sucesso == true ? "text-sucess" : "text-danger"}
      show
      fade
      title={sucesso == true ? "Sucesso" : "Erro"}
      message={
        sucesso == true ? "Credenciais corretas!" : "Credenciais incorretas!"
      }
      text="a pouco..."
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
      }}
    />
  );
};

export default Notification;
