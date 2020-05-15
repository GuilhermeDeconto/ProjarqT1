import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import TableRender from "../components/TableRender";
import "../css/participantstable.css";
import ModalAvaliation from "../components/ModalAvaliation";

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
        title: "Nome",
        field: "name",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Time",
        field: "team",
      },
      {
        title: "Semestre",
        field: "semester",
      },
      {
        title: "Curso",
        field: "curse",
      },
    ],
    data: [],
  };

  halfDataTeams = {
    columns: [
      {
        title: "Nome",
        field: "name",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Time",
        field: "team",
      },
      {
        title: "Semestre",
        field: "semester",
      },
      {
        title: "Curso",
        field: "curse",
      },
      {
        title: "Nota",
        field: "note",
      },
      {
        title: "Avaliador",
        field: "avaliation",
        render: rowData => <ModalAvaliation data={rowData}/>
      },
    ],
    data: [],
  };

  data = [
    {
      name: "Gigislaine Gonçalves",
      email: "tigernixon@blabla.com.br",
      team: "Paladinos",
      semester: "2",
      curse: "Ciência da Computação",
    },
    /* {
      name: "Guilherme de Corno",
      email: "tigernixon@blabla.com.br",
      team: "Os bichas",
      semester: "4",
      curse: "Engenharia de Software",
    },
    {
      name: "Silvia Moraes",
      email: "tigernixon@blabla.com.br",
      team: "IA",
      semester: "12",
      curse: "Engenharia de Software",
    },
    {
      name: "Chiara Paskulin",
      email: "tigernixon@blabla.com.br",
      team: "Doidas",
      semester: "8",
      curse: "Sistemas de Informação",
    },
    {
      name: "Bernardo de Cesaro",
      email: "tigernixon@blabla.com.br",
      team: "Feios e cia",
      semester: "3",
      curse: "Engenharia de Software",
    },
    {
      name: "Joao Kleber",
      email: "tigernixon@blabla.com.br",
      team: "Pegadinha dos brothers",
      semester: "1",
      curse: "Direito",
    }, */
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
      });
    });
    this.halfDataParticipants.data = auxiliar;
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
      });
    });
    this.halfDataTeams.data = auxiliar;
    let newData = this.halfDataTeams;
    state.teams = newData;
    this.setState({
      state,
    });
  }

  optionsParticipants = {
    grouping: true,
    headerStyle: {
      backgroundColor: "#6a1b9a",
      color: "#FFF",
    },
    pageSizeOptions: [5],
    paginationType: "stepped",
    toolbarButtonAlignment: "right",
    exportButton: true,
    exportFileName: "DadosHackatona",
    exportAllData: true,
    rowStyle: {
      backgroundColor: '#c3c3c3',
    }
  };

  optionsTeams = {
    grouping: true,
    headerStyle: {
      backgroundColor: "#008000",
      color: "#FFF",
    },
    pageSizeOptions: [5],
    paginationType: "stepped",
    toolbarButtonAlignment: "right",
    exportButton: true,
    exportFileName: "DadosHackatona",
    exportAllData: true,
    rowStyle: {
      backgroundColor: '#c3c3c3',
    }
  };


  render() {
    let { participants, teams } = this.state;

    return (
      <React.Fragment>
        <PainelNavBar title={"Avaliador"} />
        <TableRender
          labelButton={"participantes"}
          labelTitle={"Participantes"}
          columns={participants.columns}
          data={participants.data}
          isParticipant={true}
          options={this.optionsParticipants}
          isEditable={false}
          isIcons={false}
        />
        <hr id="quebraLinha" />
        <TableRender
          labelButton={"times"}
          labelTitle={"Times"}
          columns={teams.columns}
          data={teams.data}
          isParticipant={false}
          options={this.optionsTeams}
          isEditable={false}
          isIcons={false}
        />
      </React.Fragment>
    );
  }
}

export default Evaluator;
