import React, { Component } from "react";
import { MDBContainer, MDBNotification } from "mdbreact";
import TemplateLogin from "../components/TemplateLogin";
import { login } from "../api/LoginAuth";
import * as axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:8080`;
    this.state = {
      email: "",
      password: "",
      erro: false,
    };
    this.trocaValoresState = this.trocaValoresState.bind(this);
  }

  erro() {
    return (
      <div>
        {this.state.erro && (
          <MDBNotification
            iconClassName="text-danger"
            show
            fade
            title="Erro"
            message="Credenciais incorretas!"
            text="a pouco..."
            style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              zIndex: 9999
            }}
          />
        )}
      </div>
    );
  }

  trocaValoresState(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  logar = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    let usuario = {
      email: email,
      password: password,
    };
    try {
      axios
        .post(`${this.baseUrl}/login`, usuario)
        .then((respUsuario) => {
          usuario = respUsuario.data
          if (usuario.isAdmin === "True") {
            login(usuario.authorization);
            this.props.history.push({
              pathname: "/participant",
              state: { data: respUsuario.data },
            });
          } else {
            login(usuario.authorization);
            this.props.history.push({
              pathname: `/evaluator/`,
              state: { data: respUsuario.data },
            });
          }
        })
        .catch(this.setState({ erro: true }), function (error) {
          console.log("Error in login =>", error);
        });
    } catch (erro) {}
  };
//id="containerBack"
  render() {
    return (
      <MDBContainer >
        {this.erro()}
        <TemplateLogin
          logar={this.logar.bind(this)}
          trocaValoresState={this.trocaValoresState}
        />
        
        <div className="mt-5 text-center font-weight-bold">
          &copy; {new Date().getFullYear()} AGES — Todos os direitos reservados
        </div>
      </MDBContainer>
    );
  }
}
