import React, { Component } from "react";
import * as axios from "axios";
import { getToken } from "../api/LoginAuth";
import NavBar from "../components/NavBar";
import PainelNavBar from "../components/PainelNavBar";

class Evaluator extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:8080`;
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
          users = response.data;
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
    return <React.Fragment>
      <PainelNavBar/>
    </React.Fragment>;
  }
}

export default Evaluator;
