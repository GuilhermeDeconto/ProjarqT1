import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { MDBModalHeader, MDBModalBody, MDBCol, MDBRow} from "mdbreact";
import Rate from "../components/Rate";

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
  },
}));

export default function ModalAvaliation() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Avaliar
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <MDBModalHeader
              titleClass="d-inline title"
              className="text-center light-blue darken-3 white-text"
            >
              Avalie o time
            </MDBModalHeader>
            <MDBModalBody className="text-center">
              <MDBRow>
                <MDBCol> <span>Software funcionando: </span></MDBCol>
                <MDBCol><Rate /></MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol><span>Processo: </span></MDBCol>
                <Rate />
              </MDBRow>
              <MDBRow>
                <MDBCol><span>Pictch </span></MDBCol>
                <Rate />
              </MDBRow>
              <MDBRow>
                <MDBCol><span>Inovação </span></MDBCol>
                <Rate />
              </MDBRow>
              <MDBRow>
                <MDBCol><span>Formação do time: </span></MDBCol>
                <Rate />
              </MDBRow>

              <button type="button" onClick={handleClose}>
                Enviar avaliação
              </button>
            </MDBModalBody>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
