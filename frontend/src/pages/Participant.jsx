import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import { MDBContainer, MDBBtn, MDBCol, MDBRow, MDBCardGroup } from "mdbreact";
import InputParticipant from "../components/InputParticipant";
import CardParticipant from "../components/CardParticipant";
import "../css/participant.css";
import * as axios from "axios";
class Participant extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:9876`;
    this.state = {
      team: [],
      participantActual: this.props.location.state.data,
      numberTeam: this.props.location.state.data.team,
    };
  }

  componentDidMount() {
    axios
      .get(`${this.baseUrl}/members/${this.state.numberTeam}`)
      .then((response) => {
        if (response) {
          var members = response.data.members;
        }
        this.setState({
          team: members,
        });
      });
  }

  render() {
    let { team, participantActual } = this.state;
    return (
      <React.Fragment>
        <div id="background">
          <PainelNavBar
            avatarLabel={this.props.location.state.data.name}
            name={this.props.location.state.data.name}
            title={"Participante"}
          />
          <MDBContainer fluid className="mt-4">
            <MDBRow>
              <MDBCol lg="6" sm="12">
                <InputParticipant participant={participantActual} />
              </MDBCol>
              <MDBCol lg="6" sm="12">
                <MDBCardGroup className="d-flex justify-content-between">
                  <CardParticipant data={team} />
                </MDBCardGroup>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </React.Fragment>
    );
  }
}

export default Participant;
