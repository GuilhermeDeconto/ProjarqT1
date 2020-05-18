import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import { MDBContainer, MDBBtn, MDBCol, MDBRow, MDBCardGroup} from "mdbreact";
import InputParticipant from "../components/InputParticipant";
import CardParticipant from "../components/CardParticipant";
class Participant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showCards() {}

  render() {
    return (
      <React.Fragment>
        <PainelNavBar avatarLabel={this.props.location.state.data.name} name={this.props.location.state.data.name} title={"Participante"} />
        <MDBContainer fluid className="mt-4">
          <MDBRow>
            <MDBCol lg="6" sm="12">
              <InputParticipant />
            </MDBCol> 
            <MDBCol lg="6" sm="12">
              <MDBCardGroup className="d-flex justify-content-around">
                <CardParticipant />
                <CardParticipant />
                <CardParticipant />
                <CardParticipant />
                <CardParticipant />
              </MDBCardGroup>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default Participant;
