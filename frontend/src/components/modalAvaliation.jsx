import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBInput, MDBModalHeader, MDBModalFooter, MDBIcon } from
'mdbreact';

class ModalAvaliation extends Component {
state = {
  modal9: false
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

render() {
  return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle(9)}>Launch MDBModal</MDBBtn>
        <MDBModal fullHeight position="right" backdrop={false} className="modal-notify modal-info text-white" isOpen={this.state.modal9}
          toggle={this.toggle(9)}>
          <MDBModalHeader tag="p" toggle={this.toggle(9)}>
            Feedback request
          </MDBModalHeader>
          <MDBModalBody className="text-center">
            <MDBIcon far icon="file-alt" size="4x" className="animated rotateIn mb-3" />
            <p className="font-weight-bold mb-3">Your opinion matters</p>
            <p>Have some ideas how to improve our product? Give us your feedback.</p>
            <hr />
            <p className="mb-3">Your rating</p>
            <div className="text-left">
              <MDBInput label="Very good" type="radio" id="radio1" />
              <MDBInput label="Good" type="radio" id="radio2" />
              <MDBInput label="Mediocre" type="radio" id="radio3" />
              <MDBInput label="Bad" type="radio" id="radio4" />
              <MDBInput label="Very bad" type="radio" id="radio5" />
            </div>
            <p className="mb-3">What could we improve?</p>
            <MDBInput label="Your message" type="textarea" id="radio1" />
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <MDBBtn color="primary" onClick={this.toggle(9)}>Send
              <MDBIcon icon="paper-plane" className="ml-1" />
            </MDBBtn>
            <MDBBtn color="primary" outline onClick={this.toggle(9)}>Calcel</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalAvaliation;