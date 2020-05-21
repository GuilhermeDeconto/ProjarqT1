import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import TableRender from "../components/TableRender";
import "../css/participantstable.css";
import "../css/backgroundall.css";
import ModalAvaliation from "../components/ModalAvaliation";
import * as axios from "axios";

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
        grouping: true,
      },
      {
        title: "Email",
        field: "email",
        grouping: true,
      },
      {
        title: "Time",
        field: "team",
        customSort: (a, b) => a.team.length - b.team.length,
        grouping: true,
      },
      {
        title: "Semestre",
        field: "semester",
        grouping: true,
      },
      {
        title: "Curso",
        field: "curse",
        grouping: true,
      },
    ],
  };

  halfDataTeams = {
    columns: [
      {
        title: "Número",
        field: "number",
        grouping: true,
        customSort: (a, b) => a.number.length - b.number.length,
      },
      {
        title: "Nome",
        field: "name",
        grouping: true,
      },
      {
        title: "Plataforma",
        field: "platform",
        grouping: true,
      },
      {
        title: "Descrição",
        field: "description",
        grouping: true,
      },
      {
        title: "Software funcionando",
        field: "software",
        grouping: true,
      },
      {
        title: "Processo",
        field: "process",
        grouping: true,
      },
      {
        title: "Pitch",
        field: "pitch",
        grouping: true,
      },
      {
        title: "Inovação",
        field: "inovation",
        grouping: true,
      },
      {
        title: "Formação do time",
        field: "formation",
        grouping: true,
      },
      {
        title: "Avaliação",
        field: "avaliation",
        render: (rowData) => <ModalAvaliation data={rowData} />,
        grouping: true,
      },
    ],
  };

  optionsParticipants = {
    headerStyle: {
      backgroundColor: "#6a1b9a",
      color: "#FFF",
    },
    grouping: true,
    pageSizeOptions: [],
    paginationType: "stepped",
    toolbarButtonAlignment: "right",
    exportButton: true,
    exportFileName: "DadosHackatona",
    exportAllData: true,
    rowStyle: {
      backgroundColor: "#c3c3c3",
    },
  };

  optionsTeams = {
    headerStyle: {
      backgroundColor: "#008000",
      color: "#FFF",
    },
    grouping: true,
    pageSizeOptions: [],
    paginationType: "stepped",
    toolbarButtonAlignment: "right",
    exportButton: true,
    exportFileName: "DadosHackatona",
    exportAllData: true,
    rowStyle: {
      backgroundColor: "#c3c3c3",
    },
  };

  countParticipants = 0;
  countTeams = 0;
  indexParticipantes = 0;
  indexTeams = 0;

  render() {
    let {
      participantsColumns,
      participantsData,
      teamsColumns,
      teamsData,
    } = this.state;

    return (
      <React.Fragment>
        <div id="backgroundall">
          <PainelNavBar
            avatarLabel={this.props.location.state.data.name}
            name={this.props.location.state.data.name}
            title={"Avaliador"}
          />
          <TableRender
            labelButton={"participantes"}
            labelTitle={"Participantes"}
            columns={participantsColumns}
            data={(query) =>
              new Promise((resolve, reject) => {
                let url = `${this.baseUrl}/users`;
                this.countParticipants = query.page + 1;
                fetch(url)
                  .then((response) => response.json())
                  .then((result) => {
                    query.page += 1;
                    var count = 5 * query.page;
                    var aux = result.users;
                    var newData = aux.slice(count - 5, count);
                    resolve({
                      data: newData,
                      page: this.countParticipants - 1,
                      totalCount: 50,
                    });
                  });
              })
            }
            isParticipant={true}
            options={this.optionsParticipants}
            isEditable={false}
            isIcons={false}
          />
          <hr id="quebraLinha" />
          <TableRender
            labelButton={"times"}
            labelTitle={"Times"}
            columns={teamsColumns}
            data={(query) =>
              new Promise((resolve, reject) => {
                let url = `${this.baseUrl}/teams`;
                this.countTeams = query.page + 1;
                fetch(url)
                  .then((response) => response.json())
                  .then((result) => {
                    query.page += 1;
                    var count = 5 * query.page;
                    var aux = result.teams;
                    var newData = aux.slice(count - 5, count);
                    resolve({
                      data: newData,
                      page: this.countTeams - 1,
                      totalCount: 10,
                    });
                  });
              })
            }
            isParticipant={false}
            options={this.optionsTeams}
            isEditable={false}
            isIcons={false}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Evaluator;
