/* All librarys */
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "../css/painelnavbar.css";

/* Components */
import { logout } from "../api/LoginAuth";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";

import AvatarModel from "../components/AvatarModel";

export default class PainelNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Gustavo",
      isOpen: false,
    };
  }

  log_out() {
    logout();
    this.props.history.push({
      pathname: "/",
    });
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Router>
        <MDBNavbar id="painelNavBar" dark expand="md">
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left className="pl-2">
              <MDBNavItem>
                <a id="home" href="/">
                  <MDBIcon icon="home" />
                </a>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav>
              <MDBNavbarBrand>
                <strong id="dbclogo">Painel do {this.props.title}</strong>
              </MDBNavbarBrand>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <span className="pr-3" id="textobranco">
                {" "}
                Olá, {this.state.name}!{" "}
              </span>
              <MDBNavItem className="pr-2">
                <MDBDropdown>
                  <MDBDropdownToggle nav>
                    <AvatarModel label={"GP"} />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right className="dropdown-default">
                    <MDBDropdownItem>
                      {/* eslint-disable-next-line */}
                      <a href="#">
                        Configurações
                      </a>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <a href="/" onClick={this.log_out}>
                        Sair
                      </a>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
    );
  }
}
