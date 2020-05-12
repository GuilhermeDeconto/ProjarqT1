import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBRow, MDBBtn, MDBIcon } from "mdbreact";

import "../css/participantstable.css";

export default class ParticipantsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.default,
    };
  }

  // email: String,
  // name: String,
  // password: String,
  // team: String,
  // isAdmin: Boolean,
  // semester: String,
  // curso: String
  default = {
    columns: [
      {
        label: "Nome",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 270,
      },
      {
        label: "Time",
        field: "team",
        sort: "asc",
        width: 100,
      },
      {
        label: "Semestre",
        field: "semester",
        sort: "asc",
        width: 100,
      },
      {
        label: "Curso",
        field: "curso",
        sort: "asc",
        width: 130,
      },
      ,
      {
        label: "Editar",
        field: "edit",
        width: 130,
      },
    ],
    rows: [
      {
        name: "Tiger Nixon",
        email: "tigernixon@blabla.com.br",
        team: "Paladinos",
        semester: "6",
        curso: "Ciência da Computação",
        edit: <a href="/"><MDBIcon size="lg" icon="edit"/></a>
      },
      {
        name: "Tiger Nixon",
        email: "tigernixon@blabla.com.br",
        team: "Artificiais",
        semester: "6",
        curso: "Ciência da Computação",
        edit: <a href="/"><MDBIcon tag="a" size="lg" icon="edit"/></a>
      },
      {
        name: "Tiger Nixon",
        email: "tigernixon@blabla.com.br",
        team: "Paladinos",
        semester: "6",
        curso: "Ciência da Computação",
        edit: <a href="/"><MDBIcon size="lg" icon="edit"/></a>
      },
      {
        name: "Tiger Nixon",
        email: "tigernixon@blabla.com.br",
        team: "Paladinos",
        semester: "6",
        curso: "Ciência da Computação",
        edit: <a href="/"><MDBIcon size="lg" icon="edit" /></a>
      },
      {
        name: "Tiger Nixon",
        email: "tigernixon@blabla.com.br",
        team: "Paladinos",
        semester: "6",
        curso: "Ciência da Computação",
        edit: <a href="/"><MDBIcon size="lg" icon="edit"/></a>
      },
      {
        name: "Tiger Nixon",
        email: "tigernixon@blabla.com.br",
        team: "Paladinos",
        semester: "6",
        curso: "Ciência da Computação",
        edit: <a href="/"><MDBIcon size="lg" icon="edit"/></a>
      },
    ],
  };

  render() {
    let data = this.state.data;
    return (
      <React.Fragment>
        <MDBContainer fluid>
          <MDBDataTable
            entries={5}
            displayEntries={false}
            searchLabel="Filtre qualquer informação"
            responsive 
            responsiveSm
            responsiveMd
            responsiveLg
            responsiveXl
            className="mx-3 mt-1"
            striped
            bordered
            hover
            data={data}
            infoLabel={["Mostrando", "a", "de", "participantes"]} 
            multipleCheckboxes 
            noRecordsFoundLabel="Sem dados para tabular"
            paginationLabel={["Anterior", "Próximo"]}
            theadColor="orange lighten-2"
          />
          <hr id="quebraLinha"/>
          <MDBDataTable
            entries={5}
            displayEntries={false}
            searchLabel="Filtre qualquer informação"
            responsive 
            responsiveSm
            responsiveMd
            responsiveLg
            responsiveXl
            className="mx-3 mt-1"
            striped
            bordered
            hover
            data={data}
            infoLabel={["Mostrando", "a", "de", "participantes"]} 
            multipleCheckboxes 
            noRecordsFoundLabel="Sem dados para tabular"
            paginationLabel={["Anterior", "Próximo"]}
            theadColor="red"
          />
        </MDBContainer>
      </React.Fragment>
    );
  }
}
