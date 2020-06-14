import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import { MDBContainer, MDBCol, MDBRow, MDBCardGroup } from "mdbreact";
import * as axios from "axios";
import ResultTable from '../components/ResultTable'
import "../css/results.css"
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:9876`;
    this.state = {
      teams: [],
      count: 0
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
            count: response.data.count
          });
        }
      });
  }

  render() {
    let { teams, count} = this.state;
    return (
      <React.Fragment>
          <MDBContainer fluid id="results">
            <MDBRow>
              <h4 className="text-center mx-auto my-3"> RESULTADO DA HACKTONA DUS GURIS</h4>
            </MDBRow>
            <MDBRow id="tableResult">
              <MDBCol lg="12" sm="12" className="white-text">
                <ResultTable teams={teams} count={count}/>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
      </React.Fragment>
    );
  }
}

export default Results;
