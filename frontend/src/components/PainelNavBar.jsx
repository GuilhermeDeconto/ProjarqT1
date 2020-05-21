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
      name: this.props.name,
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

  getFirstChar(str){
    return str.substr(0,2)
  }

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
                Olá, <br/>{this.state.name}!
              </span>
              <MDBNavItem className="pr-2">
                <MDBDropdown>
                  <MDBDropdownToggle nav>
                    <AvatarModel label={this.getFirstChar(this.props.avatarLabel)} />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right className="dropdown-default">
                    <MDBDropdownItem className="mx-2 my-1">
                      {/* eslint-disable-next-line */}
                      <a href="#" >
                        <i className="fas fa-user-cog mx-1 my-1"></i>
                        Configurações
                      </a>
                    </MDBDropdownItem>
                    <MDBDropdownItem className="mx-2 my-1">
                      <a href="/" onClick={this.log_out}>
                        <i className="fas fa-sign-out-alt mx-1 my-1"></i>
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
