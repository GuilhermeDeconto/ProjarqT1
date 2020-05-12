import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import ParticipantsTable from "../components/ParticipantsTable";
import ModalEdit from "../components/ModalEdit";
import {
  MDBIcon,
} from "mdbreact";

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
    this.launchModal = this.launchModal.bind(this);
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
    rows: []
  }; 
  // eslint-disable-next-line
  aux = <a href="#" onClick={this.launchModal}><MDBIcon size="lg" icon="edit" /></a>

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
    rows: []
  };

  data = [
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: this.aux
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Artificiais",
      semester: "6",
      curse: "Ciência da Computação",
      editor: (
        <a href="/">
          <MDBIcon tag="a" size="lg" icon="edit" />
        </a>
      ),
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: (
        <a href="/">
          <MDBIcon size="lg" icon="edit" />
        </a>
      ),
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: (
        <a href="/">
          <MDBIcon size="lg" icon="edit" />
        </a>
      ),
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: (
        <a href="/">
          <MDBIcon size="lg" icon="edit" />
        </a>
      ),
    },
    {
      name: "Tiger Nixon",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "6",
      curse: "Ciência da Computação",
      editor: (
        <a href="/">
          <MDBIcon size="lg" icon="edit" />
        </a>
      ),
    }
  ];

  launchModal = () => {
    return <ModalEdit></ModalEdit>;
  };

  insereRowsParticipants(aux) {
    let state = this.state;
    let auxiliar = []
     // eslint-disable-next-line
    aux.map((item) => {
      auxiliar.push({
        name: item.name,
        email: item.email, 
        team: item.team, 
        semester: item.semester, 
        curse: item.curse, 
        editor: item.editor
      })
    })
    this.halfDataParticipants.rows = auxiliar;
    let newData = this.halfDataParticipants;
    state.participants = newData;
    this.setState({
      state,
    });
  }

  insereRowsTeams(aux) {
    let state = this.state;
    let auxiliar = []
    // eslint-disable-next-line
    aux.map((item) => {
      auxiliar.push({
        name: item.name,
        email: item.email, 
        team: item.team, 
        semester: item.semester, 
        curse: item.curse, 
        editor: item.editor
      })
    })
    this.halfDataTeams.rows = auxiliar;
    let newData = this.halfDataTeams;
    state.teams = newData;
    this.setState({
      state
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
          launchModal={this.launchModal.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default Evaluator;
