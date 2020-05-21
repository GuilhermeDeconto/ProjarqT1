import React from "react";
import MaterialTable from "material-table";
import { MDBContainer, MDBBtn } from "mdbreact";
import { green, red } from "@material-ui/core/colors";
import AddBox from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import * as axios from "axios";
import '../css/backgroundall.css'

export default function TableRender(props) {

  const tableRef = React.createRef();

  const baseUrl = `http://localhost:9876`;

  const [state, setState] = React.useState({
    columns: props.columns,
    data: props.data,
  });

  let {
    columns,
    data,
    labelButton,
    labelTitle,
    options,
    isEditable,
    isIcons,
  } = props;

  const localization = {
    pagination: {
      labelDisplayedRows: "{from}-{to} de {count}",
      labelRowsSelect: "Linhas",
      labelRowsPerPage: "Linhas por página",
      firstAriaLabel: "Primeira página",
      firstTooltip: "Primeira página",
      previousAriaLabel: "Página anterior",
      previousTooltip: "Página anterior",
      nextAriaLabel: "Próxima página",
      nextTooltip: "Próxima página",
      lastTooltip: "Última página",
    },
    grouping: {
      placeholder: "Arraste a coluna que deseja agrupar",
      groupedBy: "Grupos de",
    },
    toolbar: {
      nRowsSelected: "{0} linha(s) selecionada",
      searchPlaceholder: "Pesquisar",
      searchTooltip: "Pesquisar",
      exportTitle: "Exportar para CSV",
    },
    header: {
      actions: "Ações",
    },
    body: {
      emptyDataSourceMessage: "Sem dados",
      filterRow: {
        filterTooltip: "Filtro teste",
      },
      addTooltip: "Adicionar",
      deleteTooltip: "Remover",
      editTooltip: "Editar",
      editRow: {
        deleteText: "Tem certeza que deseja deletar?",
        cancelTooltip: "Cancelar",
        saveTooltip: "Salvar",
      },
    },
  };

  const edit = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            if (newData.email) {
              //então é participante
              axios
                .post(`${baseUrl}/registeruser`, newData)
                .then((response) => {
                  if (response.message) {
                    this.setState({
                      data: response.users,
                    });
                  }
                });
            } else if (newData.number) {
              axios
                .post(`${baseUrl}/registerteam`, newData)
                .then((response) => {
                  if (response.message) {
                    this.setState({
                      data: response.teams,
                    });
                  }
                });
            }
          }
          resolve();
        }, 1000);
      }),
    onRowUpdate: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            if (oldData.email) {
              //então é participante
              axios
                .put(`${baseUrl}/user/${oldData._id}`, oldData)
                .then((response) => {
                  if (response.message) {
                    this.setState({
                      data: response.users,
                    });
                  }
                });
            } else if (oldData.number) {
              axios
                .put(`${baseUrl}/team/${oldData._id}`, oldData)
                .then((response) => {
                  if (response.message) {
                    this.setState({
                      data: response.teams,
                    });
                  }
                });
            }
          }
          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            if (oldData.email) {
              //então é participante
              axios
                .delete(`${baseUrl}/user/${oldData._id}`)
                .then((response) => {
                  if (response.message) {
                    this.setState({
                      data: response.users,
                    });
                  }
                });
            } else if (oldData.number) {
              axios
                .delete(`${baseUrl}/team/${oldData._id}`)
                .then((response) => {
                  if (response.message) {
                    this.setState({
                      data: response.teams,
                    });
                  }
                });
            }
          }
          resolve();
        }, 1000);
      }),
  };

  const icons = {
    Add: (props) => {
      return (
        <div>
          <AddBox
            className="fa fa-plus-circle"
            style={{ color: green[500] }}
            {...props}
          />
        </div>
      );
    },
    Delete: (props) => (
      <div>
        <DeleteIcon style={{ color: red[500] }} {...props} />
      </div>
    ),
  };

  const actions = [
    {
      icon: "refresh",
      tooltip: "Atualizar dados",
      isFreeAction: true,
      onClick: () => tableRef.current && tableRef.current.onQueryChange(),
    },
  ];

  const style = {
    
  }

  return (
    <React.Fragment>
      <MDBContainer className="mt-1" fluid>
        <MaterialTable
          title={labelTitle}
          columns={columns}
          options={options}
          data={data}
          style={{ backgroundColor: "#D8BFD8"}}
          localization={localization}
          icons={isIcons ? icons : <div />}
          isLoading={columns && data ? false : true}
          editable={isEditable ? edit : <div />}
          actions={actions}
        />
      </MDBContainer>
    </React.Fragment>
  );
}
