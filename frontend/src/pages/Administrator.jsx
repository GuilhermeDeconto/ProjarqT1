import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import TableRender from "../components/TableRender";
import "../css/participantstable.css";
import ModalAvaliation from "../components/ModalAvaliation";

class Evaluator extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:9876`;
    this.state = {
      participantsColumns: this.halfDataParticipants.columns,
      participantsData: [],
      teamsColumns: this.halfDataTeams.columns,
      teamsData: [],
      erro: false,
      importado: false,
    };
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
    ]
  };

  halfDataTeams = {
    columns: [
      {
        title: "Número",
        field: "number",
      },
      {
        title: "Nome",
        field: "name",
      },
      {
        title: "Plataforma",
        field: "platform",
      },
      {
        title: "Descrição",
        field: "description",
      },
      {
        title: "Software funcionando",
        field: "software",
      },
      {
        title: "Processo",
        field: "process",
      },
      {
        title: "Pitch",
        field: "pitch",
      },
      {
        title: "Inovação",
        field: "inovation",
      },
      {
        title: "Formação do time",
        field: "formation",
      }
    ]
  };

  optionsParticipants = {
    grouping: true,
    selection: true,
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
    selection: true,
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

  countParticipants = 0
  countTeams = 0
  indexParticipantes = 0
  indexTeams = 0

  render() {
    let { participantsColumns, participantsData, teamsColumns, teamsData } = this.state;

    return (
      <React.Fragment>
        <PainelNavBar
          avatarLabel={this.props.location.state.data.name}
          name={this.props.location.state.data.name}
          title={"Administrador"}
        />
        <TableRender
          labelButton={"participantes"}
          labelTitle={"Participantes"}
          columns={participantsColumns}
          data={query =>
            new Promise((resolve, reject) => {
              let url = `${this.baseUrl}/users`
              this.countParticipants = (query.page + 1)
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  query.page += 1
                  var count = 5 * query.page
                  var aux = result.users
                  var newData = aux.slice(count - 5, count)
                  resolve({
                    data: newData,
                    page: this.countParticipants - 1,
                    totalCount: result.count,
                  })
                })
            })
          }
          isParticipant={true}
          options={this.optionsParticipants}
          isEditable={true}
          isIcons={true}
        />
        <hr id="quebraLinha" />
        <TableRender
          labelButton={"times"}
          labelTitle={"Times"}
          columns={teamsColumns}
          data={query =>
            new Promise((resolve, reject) => {
              let url = `${this.baseUrl}/teams`
              this.countTeams = (query.page + 1)
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  query.page += 1
                  var count = 5 * query.page
                  var aux = result.teams
                  var newData = aux.slice(count - 5, count)
                  resolve({
                    data: newData,
                    page: this.countTeams - 1,
                    totalCount: result.count,
                  })
                })
            })
          }
          isParticipant={false}
          options={this.optionsTeams}
          isEditable={true}
          isIcons={true}
        />
      </React.Fragment>
    );
  }
}

export default Evaluator;
