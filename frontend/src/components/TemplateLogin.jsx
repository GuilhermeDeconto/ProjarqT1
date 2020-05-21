import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBContainer,
} from "mdbreact";
import GitHubIcon from "@material-ui/icons/GitHub";
import '../css/templateLogin.css'

export default class TemplateLogin extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MDBContainer fluid className="pt-3" id="containerLogin">
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard>
              <div className="header pt-3 young-passion-gradient color-block-5">
                <MDBRow className="d-flex justify-content-center">
                  <h3 className="white-text mb-3 pt-3 font-weight-bold " >
                    Acessar via
                  </h3>
                </MDBRow>
                <MDBRow className="mt-2 mb-3 d-flex justify-content-center">
                  <a href="#!" className="fa-lg p-2 m-2 fb-ic">
                    <GitHubIcon className="white-text fa-lg"></GitHubIcon>
                  </a>
                  <a href="#!" className="fa-lg p-2 m-2 tw-ic">
                    <MDBIcon fab className="fa-twitter white-text fa-lg" />
                  </a>
                  <a href="#!" className="fa-lg p-2 m-2 gplus-ic">
                    <MDBIcon
                      fab
                      className="fa-google-plus-g white-text fa-lg"
                    />
                  </a>
                  <a href="#!" className="fa-lg p-2 m-2 gplus-ic">
                    <MDBIcon fab icon="stack-overflow white-text fa-lg" />
                  </a>
                </MDBRow>
              </div>

              <MDBCardBody className="mx-4 mt-4">
                <MDBInput
                  label="Seu email"
                  icon="envelope"
                  group
                  type="email"
                  name="email"
                  id="emaillogin"
                  validate
                  onChange={this.props.trocaValoresState}
                  error="invalido"
                  success="right"
                />
                <MDBInput
                  label="Sua senha"
                  icon="lock"
                  name="password"
                  id="passwordlogin"
                  group
                  onChange={this.props.trocaValoresState}
                  type="password"
                  validate
                  success="right"
                  containerClass="mb-0"
                />
                <p className="font-small grey-text d-flex justify-content-end">
                  Esqueceu sua
                  <a href="#!" className="dark-grey-text ml-1 font-weight-bold">
                    senha?
                  </a>
                </p>
                <MDBRow className="d-flex align-items-end mb-4 mt-5">
                  <MDBCol md="12" className="d-flex justify-content-center">
                    <div className="text-center">
                      <MDBBtn
                        color="dark"
                        onClick={this.props.logar}
                        rounded
                        type="button"
                        className="z-depth-1a"
                      >
                        Entrar
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div className="mt-5 text-center font-weight-bold">
          &copy; {new Date().getFullYear()} AGES — Todos os direitos reservados
        </div>
      </MDBContainer>
    );
  }
}
