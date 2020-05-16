import React, { Component } from "react";
import { MDBContainer, MDBNotification } from "mdbreact";
import TemplateLogin from "../components/TemplateLogin";
import { login } from "../api/LoginAuth";
import * as axios from "axios";
import "../css/login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:8080`;
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
        <MDBNotification
          iconClassName="text-sucess"
          show
          fade
          title="Sucesso"
          message="Credenciais corretas!"
          text="a pouco..."
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        />
        }
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
      authorization: "TokenTOP",
    };
    try {
      axios
        .post(`${this.baseUrl}/login`, usuario)
        .then((respUsuario) => {
          usuario = respUsuario.data
          if (usuario.isAdmin === "True") {
            login(usuario.authorization)
            setInterval(
            this.props.history.push({
              state: { data: respUsuario.data },
              pathname: "/administrador",
            }), 10000)
            
          } else if(usuario.isNormalUser === "True"){
            login(usuario.authorization);
            setInterval(
              this.props.history.push({
              state: { data: respUsuario.data },
              pathname: `/participante`,
            }), 10000)
            
          } else {
            login(usuario.authorization);
            setInterval(
              this.props.history.push({
              state: { data: respUsuario.data },
              pathname: `/avaliador`,
            }), 10000)
            
          }
        })
        .catch(this.setState({ erro: true }), function (error) {
          console.log("Error in login =>", error);
        });
    } catch (erro) {
      console.log(erro)
    }
  };
  //id="containerBack"
  render() {
    return (
      <MDBContainer fluid id="containerLogin">
        {this.erro()}
        <TemplateLogin
          logar={this.logar.bind(this)}
          trocaValoresState={this.trocaValoresState}
        />
      </MDBContainer>
    );
  }
}
