import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import { MDBContainer, MDBCol, MDBRow, MDBCardGroup } from "mdbreact";
import * as axios from "axios";
import CardResult from '../components/CardResult'
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:9876`;
    this.state = {
      teams: []
    };
  }

  // componentDidMount() {
  //   axios
  //     .get(`${this.baseUrl}/teams/`)
  //     .then((response) => {
  //       if (response) {
  //         var members = response.data.members;
  //       }
  //       this.setState({
  //         team: members,
  //       });
  //     });
  // }

  render() {
    let { teams } = this.state;
    return (
      <React.Fragment>
        <div id="background">
          <MDBContainer fluid className="mt-3">
            <MDBRow>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
              <MDBCol lg="2" sm="12">
                <CardResult />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </React.Fragment>
    );
  }
}

export default Results;
