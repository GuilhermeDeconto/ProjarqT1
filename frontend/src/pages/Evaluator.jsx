import React from "react";
import PainelNavBar from "../components/PainelNavBar";
import TableRender from "../components/TableRender";
import "../css/participantstable.css";
import "../css/backgroundall.css";
import ModalAvaliation from "../components/ModalAvaliation";
import { MDBBtn } from "mdbreact";

class Evaluator extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:9876`;
    this.state = {
      participantsColumns: this.halfDataParticipants.columns,
      //participantsData: [],
      teamsColumns: this.halfDataTeams.columns,
      //teamsData: [],
      erro: false,
      importadoParticipante: false,
      importadoTeam: false,
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
        render: (rowData) => <ModalAvaliation data={rowData}  nameAvaliator={this.props.location.state.data.name}/>,
      },
    ],
  };

  optionsParticipants = {
    headerStyle: {
      backgroundColor: "#527a7a",
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
      backgroundColor: "#B0C4DE",
    },
  };

  optionsTeams = {
    headerStyle: {
      backgroundColor: "#527a7a",
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
      backgroundColor: "#B0C4DE",
    },
  };

  countParticipants = 0;
  countTeams = 0;
  indexParticipantes = 0;
  indexTeams = 0;

  changeImportParticipant = () => {
    this.setState({
      importadoParticipante: true,
    });
  };

  changeImportTeam = () => {
    this.setState({
      importadoTeam: true,
    });
  };

  render() {
    let {
      participantsColumns,
      teamsColumns,
      importadoParticipante,
      importadoTeam,
    } = this.state;

    return (
      <React.Fragment>
        <div id="backgroundall">
          <PainelNavBar
            avatarLabel={this.props.location.state.data.name}
            name={this.props.location.state.data.name}
            title={"Avaliador"}
          />
          <h5 className="text-center text-muted mt-3">Apenas administradores podem gerenciar participantes e times! </h5>
          {importadoParticipante === false ? (
            <MDBBtn color="deep-orange" className="mx-2" onClick={this.changeImportParticipant}>
              Importar Participantes
            </MDBBtn>
          ) : (
            <span />
          )}
          {importadoParticipante === true ? (
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
          ) : (
            ""
          )}
          <hr id="quebraLinha" />
          {importadoTeam === false ? (
            <MDBBtn color="deep-orange" className="mx-2" onClick={this.changeImportTeam}>
              Importar Times
            </MDBBtn>
          ) : (
            <span />
          )}
          {importadoTeam === true ? (
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
          ) : (
            ""
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Evaluator;
