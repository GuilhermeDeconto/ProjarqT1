import React, { Component } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBIcon,
} from "mdbreact";

class ModalEdit extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  logValue = (value) => {
    console.log(value);
  };



  render() {
    let { isParticipant } = this.props;
    return (
      <MDBContainer>
        <MDBIcon className="mx-1" tag="a" size="lg" onClick={this.toggle} icon="edit" />
        <MDBIcon className="mx-1 red-text" tag="a" size="lg" onClick={(item)=>this.props.deleteRow(item)} far icon="trash-alt" />
        <MDBIcon className="mx-1 success-color" tag="a" size="lg" onClick={this.toggle} far  icon="plus-square" />
        <MDBModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="md"
          cascading
        >
          <MDBModalHeader
            toggle={this.toggle}
            titleClass="d-inline title"
            className="text-center light-blue darken-3 white-text"
          >
            {isParticipant ? "Alterar participante" : "Alterar time"}
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput label="Nome" />
            <MDBInput label="Email" iconClass="dark-grey" />
            {/* {isParticipant ? (
                <MDBInput label="Time" iconClass="dark-grey" />
            ) : (
              <MDBInput label="Time" iconClass="dark-grey" />
            )} */}
            <div className="text-center mt-1-half">
              <MDBBtn color="info" className="mb-2" onClick={this.toggle}>
                Atualizar
              </MDBBtn>
            </div>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalEdit;
