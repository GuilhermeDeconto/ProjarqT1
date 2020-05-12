import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import ParticipantsTable from "../components/ParticipantsTable";
import Editor from '../components/Editor';
import { MDBIcon, MDBBtn } from "mdbreact";

class Evaluator extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:8081`;
    this.state = {
      participants: [],
      teams: [],
      erro: false,
      importado: false,
    };
  }

  componentDidMount() {
    this.insereRowsParticipants(this.data);
    this.insereRowsTeams(this.data);
  }

  halfDataParticipants = {
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
        field: "curse",
        sort: "asc",
        width: 130,
      },
      {
        label: "Editar",
        field: "editor",
        width: 130,
      },
    ],
    rows: [],
  };

  halfDataTeams = {
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
        field: "curse",
        sort: "asc",
        width: 130,
      },
      {
        label: "Editar",
        field: "editor",
        width: 130,
      },
    ],
    rows: [],
  };

  deleteRow(item){
    console.log("Deletando ",item);
  }

  data = [
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: <Editor isParticipant={true} deleteRow={this.deleteRow()} />
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Artificiais",
      semester: "6",
      curse: "Ciência da Computação",
      editor: <Editor isParticipant={false}/>
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: <Editor/>,
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: <Editor/>
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: <Editor/>
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: (
        <Editor/>
      ),
    },
  ];

  insereRowsParticipants(aux) {
    let state = this.state;
    let auxiliar = [];
    // eslint-disable-next-line
    aux.map((item) => {
      auxiliar.push({
        name: item.name,
        email: item.email,
        team: item.team,
        semester: item.semester,
        curse: item.curse,
        editor: item.editor,
      });
    });
    this.halfDataParticipants.rows = auxiliar;
    let newData = this.halfDataParticipants;
    state.participants = newData;
    this.setState({
      state,
    });
  }

  insereRowsTeams(aux) {
    let state = this.state;
    let auxiliar = [];
    // eslint-disable-next-line
    aux.map((item) => {
      auxiliar.push({
        name: item.name,
        email: item.email,
        team: item.team,
        semester: item.semester,
        curse: item.curse,
        editor: item.editor,
      });
    });
    this.halfDataTeams.rows = auxiliar;
    let newData = this.halfDataTeams;
    state.teams = newData;
    this.setState({
      state,
    });
  }

  render() {
    let { participants, teams } = this.state;

    return (
      <React.Fragment>
        <PainelNavBar />
        <ParticipantsTable
          participants={participants}
          teams={teams}
        />
      </React.Fragment>
    );
  }
}

export default Evaluator;
