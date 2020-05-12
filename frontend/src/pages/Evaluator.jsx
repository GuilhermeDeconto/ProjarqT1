import React, { Component } from "react";
import * as axios from "axios";
import { getToken } from "../api/LoginAuth";
import PainelNavBar from "../components/PainelNavBar";
import ParticipantsTable from "../components/ParticipantsTable";
import { MDBContainer } from "mdbreact";

class Evaluator extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:9876`;
    this.state = {
      partipants: [],
      erro: false,
      importado: false,
    };
  }

  getAllParticipants() {
    let users = [];
    try {
      axios
        .get(`${this.baseUrl}/api/usuario`, getToken())
        .then((response) => {
          users = response.users;
          if (users != null) {
            this.setState({
              partipants: users,
            });
          }
        })
        .catch(this.setState({ erro: true }), function (error) {
          console.log("Error in login =>", error);
        });
    } catch (erro) {}
  }

  render() {
    let { partipants, importado } = this.state;
    return (
      <React.Fragment>
        <PainelNavBar />
        <ParticipantsTable data={partipants} />
      </React.Fragment>
    );
  }
}

export default Evaluator;
