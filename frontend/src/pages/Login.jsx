import React, { Component } from "react";
import { MDBContainer, MDBNotification } from "mdbreact";
import TemplateLogin from "../components/TemplateLogin";
import { login } from "../api/LoginAuth";
import * as axios from "axios";
import "../css/login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:9876`;
    this.state = {
      email: "",
      password: "",
      erro: false,
      sucesso: false,
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
              zIndex: 9999,
            }}
          />
        )}
      </div>
    );
  }

  sucesso() {
    return (
      <div>
        {this.state.sucesso && (
          <MDBNotification
            className="my-1 mx-1"
            iconClassName="text-success"
            show
            fade
            title="Sucesso"
            message="Credenciais corretas, bem vindo(a)!"
            text="a pouco..."
            style={{
              position: "fixed",
              top: "30px",
              right: "30px",
              zIndex: 9999,
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
    let usuarioLogin = {
      email: email,
      password: password,
    };
    const config = { headers: { Authorization: localStorage.getItem("Authorization") } }
    try {
      axios
        .post(`${this.baseUrl}/login`, usuarioLogin)
        .then((response) => {
          if (response.data.success) {
            let userBack = response.data.user;
            let token = response.data.authorization;
            if (userBack.isAdmin) {
              login(token);
              setInterval(
                this.props.history.push({
                  state: { data: userBack },
                  pathname: "/administrador",
                }),
                1000000000
              );
            } else if (userBack.isNormalUser) {
              login(token);
              setInterval(
                this.props.history.push({
                  state: { data: userBack },
                  pathname: `/participante`,
                }),
                1000000000
              );
            } else {
              login(token);
              setInterval(
                this.props.history.push({
                  state: { data: userBack },
                  pathname: `/avaliador`,
                }),
                100000000
              );
            }
          }
        })
        this.setState({ sucesso: true })
        
    } catch (erro) {
      this.setState({ erro: true })
      console.log(erro);
    }
  };
  //id="containerBack"
  render() {
    return (
      <MDBContainer fluid id="containerLogin">
        {this.erro()}
        {this.sucesso()}
        <TemplateLogin
          logar={this.logar.bind(this)}
          trocaValoresState={this.trocaValoresState}
        />
      </MDBContainer>
    );
  }
}
