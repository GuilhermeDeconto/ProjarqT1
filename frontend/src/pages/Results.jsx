import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import { MDBContainer, MDBCol, MDBRow, MDBCardGroup } from "mdbreact";
import * as axios from "axios";
import ResultTable from '../components/ResultTable'
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:9876`;
    this.state = {
      teams: []
    };
  }

  componentDidMount() {
    axios
      .get(`${this.baseUrl}/result`)
      .then((response) => {
        if (response) {
          var teams = response.data.teams;
          this.setState({
            teams: teams,
          });
        }
      });
  }

  render() {
    let { teams } = this.state;
    return (
      <React.Fragment>
        <div id="background">
          <MDBContainer fluid className="mt-3">
            <MDBRow>
              <h4 className="text-center mx-auto my-3"> RESULTADO DA HACKTONA DUS GURIS</h4>
            </MDBRow>
            <MDBRow>
              <MDBCol lg="12" sm="12">
                <ResultTable teams={teams}/>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </React.Fragment>
    );
  }
}

export default Results;
