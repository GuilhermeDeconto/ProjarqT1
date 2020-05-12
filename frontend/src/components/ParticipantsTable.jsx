import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBBtn } from "mdbreact";

import "../css/participantstable.css";

export default class ParticipantsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: this.props.participants
        ? this.props.participants
        : this.initParticipants,
      teams: this.props.teams ? this.props.teams : this.initTeams,
    };
  }

  initParticipants = {
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
      {
        label: "Editar",
        field: "editor",
        width: 130,
      },
    ],
    rows: [
      {
        name: "",
        email: "",
        team: "",
        semester: "",
        curso: "",
        edit: "",
      },
    ],
  };

  initTeams = {
    // eslint-disable-next-line
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
        field: "editor",
        width: 130,
      },
    ],
    rows: [
      {
        name: "",
        email: "",
        team: "",
        semester: "",
        curso: "",
        edit: "",
      },
    ],
  };

  // email: String,
  // name: String,
  // password: String,
  // team: String,
  // isAdmin: Boolean,
  // semester: String,
  // curso: String
  aux = [];
  render() {
    let { participants, teams } = this.props;

    return (
      <React.Fragment>
        <MDBContainer fluid>
          <MDBBtn color="deep-purple">Importar participantes</MDBBtn>
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
            noBottomColumns
            hover
            data={participants}
            infoLabel={["Mostrando", "a", "de", "participantes"]}
            noRecordsFoundLabel="Sem dados para tabular"
            paginationLabel={["Anterior", "Próximo"]}
            theadColor="orange lighten-2"
          />
          <hr id="quebraLinha" />
          <MDBBtn color="deep-orange">Importar times</MDBBtn>
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
            noBottomColumns
            bordered
            hover
            data={teams}
            infoLabel={["Mostrando", "a", "de", "times"]}
            noRecordsFoundLabel="Sem dados para tabular"
            paginationLabel={["Anterior", "Próximo"]}
            theadColor="blue"
          />
        </MDBContainer>
      </React.Fragment>
    );
  }
}
