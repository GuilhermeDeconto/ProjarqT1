import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  MDBModalHeader,
  MDBModalBody,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import Rater from "../components/Rater";
import * as axios from "axios";
import "../css/modal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "4px solid #000",
    boxShadow: theme.shadows[5],
    fontSize: 16,
    padding: theme.spacing(2, 4, 3),
    width: 500,
  },
}));

export default function ModalAvaliation(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const baseUrl = `http://localhost:9876`;

  var { process, software, inovation, pitch, formation, number } = props.data;

  var data = {
    process: process,
    software: software,
    inovation: inovation,
    pitch: pitch,
    formation: formation,
    number: number,
  };

  var trocaValoresState = (nameRater, avaliation) => {
    var evalute = avaliation ? avaliation : "Ruim";
    if (nameRater === "process") {
      data.process = evalute;
    } else if (nameRater === "software") {
      data.software = evalute;
    } else if (nameRater === "inovation") {
      data.inovation = evalute;
    } else if (nameRater === "pitch") {
      data.pitch = evalute;
    } else if (nameRater === "formation") {
      data.formation = evalute;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    axios.post(`${baseUrl}/savereport`, data).then((response) => {});
    setOpen(false);
  };

  return (
    <div>
      <MDBBtn
        color="blue"
        onClick={handleOpen}
        className="px-auto py-auto"
        id="btnAvaliar"
      >
        <MDBIcon
          icon="clipboard-check"
          size="lg"
          className="px-auto py-auto my-2"
        />
        Avaliar
      </MDBBtn>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <MDBModalHeader
              titleClass="d-inline title"
              className="text-center light-blue darken-3 white-text justify-content-center"
            >
              Avalie o time
            </MDBModalHeader>
            <MDBModalBody className="text-center">
              <MDBRow className="my-3">
                <MDBCol>
                  <div
                    style={{ color: "black" }}
                    className="d-flex justify-content-start textModal"
                  >
                    Software funcionando:{" "}
                  </div>
                </MDBCol>
                <MDBCol>
                  <Rater
                    className="d-flex justify-content-end"
                    name={"software"}
                    number={number}
                    initValue={software}
                    trocaValoresState={trocaValoresState.bind(this)}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol className="d-flex justify-content-start textModal">
                  <div style={{ color: "black" }}>Processo:</div>
                </MDBCol>
                <MDBCol>
                  <Rater
                    className="d-flex justify-content-end"
                    name={"process"}
                    initValue={process}
                    number={number}
                    trocaValoresState={trocaValoresState}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol className="d-flex justify-content-start textModal">
                  <div style={{ color: "black" }}>Pitch: </div>
                </MDBCol>
                <MDBCol>
                  <Rater
                    className="d-flex justify-content-end textModal"
                    name={"pitch"}
                    initValue={pitch}
                    number={number}
                    trocaValoresState={trocaValoresState}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol className="d-flex justify-content-start textModal">
                  <div style={{ color: "black" }}>Inovação:</div>
                </MDBCol>
                <MDBCol>
                  <Rater
                    className="d-flex justify-content-end"
                    name={"inovation"}
                    initValue={inovation}
                    number={number}
                    trocaValoresState={trocaValoresState}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol className="d-flex justify-content-start textModal">
                  <div style={{ color: "black" }}>Formação do time:</div>
                </MDBCol>
                <MDBCol>
                  <Rater
                    className="d-flex justify-content-end"
                    name={"formation"}
                    initValue={formation}
                    number={number}
                    trocaValoresState={trocaValoresState}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <button
                    type="button"
                    className="mt-3 px-3 py-2"
                    style={{ color: "black", fontSize: "15px", backgroundColor: '#FF0000'}}
                    onClick={handleClose}
                  >
                    Excluir avaliação
                  </button>
                </MDBCol>
                <MDBCol>
                  <button
                    type="button"
                    className="mt-3 px-3 py-2"
                    style={{ color: "black", fontSize: "15px", backgroundColor: '#00FF00'}}
                    onClick={handleClose}
                  >
                    Adicionar avaliação
                  </button>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
