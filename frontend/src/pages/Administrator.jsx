import React from "react";
import { MDBBtn } from "mdbreact";
import PainelNavBar from "../components/PainelNavBar";
import TableRender from "../components/TableRender";
import "../css/participantstable.css";
import "../css/backgroundall.css";

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
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Time",
        field: "team",
        type: "numeric"
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
  };

  halfDataTeams = {
    columns: [
      {
        title: "Número",
        field: "number",
        type: "numeric"
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
        editable: "never"
      },
      {
        title: "Processo",
        field: "process",
        editable: "never"
      },
      {
        title: "Pitch",
        field: "pitch",
        editable: "never"
      },
      {
        title: "Inovação",
        field: "inovation",
        editable: "never"
      },
      {
        title: "Formação do time",
        field: "formation",
        editable: "never"
      },
    ],
  };

  optionsParticipants = {
    grouping: true,
    selection: false,
    headerStyle: {
      backgroundColor: "#2F4F4F",
      color: "#FFF",
    },
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
    grouping: true,
    selection: false,
    headerStyle: {
      backgroundColor: "#2F4F4F",
      color: "#FFF",
    },
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

  changeImportParticipant = () => {
    this.setState({
      importadoParticipante: true,
    });
  };

  changeImportTeam= () => {
    this.setState({
      importadoTeam: true,
    });
  };


  // usar essa estrategia de renderizacão condicional ou colocar num objeto como feito erro()
  render() {
    let { participantsColumns, teamsColumns, importadoParticipante, importadoTeam } = this.state;

    return (
      <React.Fragment>
        <div id="backgroundall">
          <PainelNavBar
            avatarLabel={this.props.location.state.data.name}
            name={this.props.location.state.data.name}
            title={"Administrador"}
          />
          {importadoParticipante === false ? (
            <MDBBtn color="deep-orange" className="ml-2" onClick={this.changeImportParticipant}>
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
                        totalCount: result.count,
                      });
                    });
                })
              }
              isParticipant={true}
              options={this.optionsParticipants}
              isEditable={true}
              isIcons={true}
            />
          ) : (
            ""
          )}
          <hr id="quebraLinha" />
          {importadoTeam === false ? (
            <MDBBtn color="deep-orange" className="ml-2" onClick={this.changeImportTeam}>
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
                        totalCount: result.count,
                      });
                    });
                })
              }
              isParticipant={false}
              options={this.optionsTeams}
              isEditable={true}
              isIcons={true}
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
