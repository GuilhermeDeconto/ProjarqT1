import React, { Component } from "react";
import { MDBDataTable, MDBContainer} from "mdbreact";

import "../css/participantstable.css";

export default class ParticipantsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: this.props.participants,
      teams: this.props.teams,
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
        field: "edit",
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
      }
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
        field: "edit",
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

  componentDidMount() {
    
    let state = this.state;
    let participants = this.aux.participants;
    let teams = this.aux.teams;
    
    state.participants = participants;
    state.teams = teams;
    this.setState({ state });
  }

  // email: String,
  // name: String,
  // password: String,
  // team: String,
  // isAdmin: Boolean,
  // semester: String,
  // curso: String
  aux = [];
  render() {
    this.aux = this.props
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
            noBottomColumns
            hover
            data={this.aux.participants}
            infoLabel={["Mostrando", "a", "de", "participantes"]}
            noRecordsFoundLabel="Sem dados para tabular"
            paginationLabel={["Anterior", "Próximo"]}
            theadColor="orange lighten-2"
          />
          <hr id="quebraLinha" />
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
            data={this.aux.teams}
            infoLabel={["Mostrando", "a", "de", "times"]}
            noRecordsFoundLabel="Sem dados para tabular"
            paginationLabel={["Anterior", "Próximo"]}
            theadColor="red"
          />
        </MDBContainer>
      </React.Fragment>
    );
  }
}
