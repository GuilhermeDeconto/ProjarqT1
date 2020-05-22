import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { MDBModalHeader, MDBModalBody, MDBCol, MDBRow } from "mdbreact";
import Rater from "../components/Rater";
import StyledButton from "../components/StyledButton";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 500,
  },
}));

export default function ModalAvaliation(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // eslint-disable-next-line
  let { data } = props;

  const handleOpen = () => {
    //console.log("Chegando conteudo da linha", data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledButton onClick={handleOpen}>Avaliar</StyledButton>
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
                <MDBCol className="">
                  <span className="d-flex justify-content-start">Software funcionando: </span>
                </MDBCol>
                <MDBCol >
                  <Rater className="d-flex justify-content-end" name={"software"} />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol className="d-flex justify-content-start">
                  <span>
                    Processo:
                  </span>
                </MDBCol>
                <MDBCol >
                  <Rater className="d-flex justify-content-end" name={"process"} />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol className="d-flex justify-content-start">
                  <span >Pitch: </span>
                </MDBCol>
                <MDBCol >
                  <Rater className="d-flex justify-content-end" name={"pitch"} />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol className="d-flex justify-content-start">
                  <span>
                    Inovação:
                  </span>
                </MDBCol>
                <MDBCol >
                  <Rater className="d-flex justify-content-end" name={"inovation"} />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol className="d-flex justify-content-start">
                  <span >
                    Formação do time:
                  </span>
                </MDBCol>
                <MDBCol >
                  <Rater className="d-flex justify-content-end" name={"formation"} />
                </MDBCol>
              </MDBRow>

              <button type="button" className="mt-3" onClick={handleClose}>
                Enviar avaliação
              </button>
            </MDBModalBody>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
