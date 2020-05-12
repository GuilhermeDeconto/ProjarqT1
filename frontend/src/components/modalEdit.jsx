import React, { Component } from "react";
import { MDBContainer, MDBAutocomplete, MDBInput, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";

const subjects = [
  "Where's My Stuff?",
  "Cancel Items or Orders",
  "Returns & Refunds",
  "Shipping Rates & Information",
  "Change Your Payment Method",
  "Manage Your Account Information",
  "About Two-Step Verification",
  "Cancel Items or Orders",
  "Change Your Order Information",
  "Contact Third-Party Sellers",
  "More in Managing Your Orders"
];

class ModalEdit extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  logValue = value => {
    console.log(value);
  };

  render() {
    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle} className="mx-auto">
          launch modal contact
        </MDBBtn>
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
            <MDBIcon icon="pencil-alt" />
            Contact From
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput label="Your name"  />
            <MDBInput label="Your email"  iconClass="dark-grey" />
            <MDBAutocomplete label="Subject"  data={subjects} clear />
            <MDBInput
              label="Your message"
              type="textarea"
              rows="2"
              icon="pencil-alt"
              iconClass="dark-grey"
            />
            <div className="text-center mt-1-half">
              <MDBBtn
                color="info"
                className="mb-2"
                onClick={this.toggle}
              >
                send
                <MDBIcon icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalEdit;