import React from "react";
import MaterialTable from "material-table";
import { MDBContainer, MDBBtn } from "mdbreact";
import { green, red} from '@material-ui/core/colors';
import AddBox from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TableRender(props) {
  const [, setState] = React.useState({
    columns: [],
    data: [],
  });
  let { columns, data, labelButton, labelTitle, isParticipant } = props;

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
      actions: "Acões",
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


  const optionsParticipants = {
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
  };

  const optionsTeams = {
    grouping: true,
    selection: true,
    headerStyle: {
      backgroundColor: "#76ff03",
      color: "#FFF",
    },
    pageSizeOptions: [5],
    paginationType: "stepped",
    toolbarButtonAlignment: "right",
    exportButton: true,
    exportFileName: "DadosHackatona",
    exportAllData: true,
  };


  return (
    <React.Fragment>
      <MDBContainer className="mt-1" fluid>
        <MDBBtn color="deep-purple">Importar {labelButton}</MDBBtn>
        <MaterialTable
          title={labelTitle}
          columns={columns}
          options={isParticipant ? optionsParticipants : optionsTeams}
          data={data}
          localization={localization}
          icons={{
            Add: props => (
              <div>
                <AddBox className="fa fa-plus-circle" style={{ color: green[500] }} {...props}/>
              </div>
            ),
            Delete: props => (
              <div>
                <DeleteIcon style={{ color: red[500] }} {...props}/>
              </div>
            )
          }}
          isLoading={columns && data ? false : true}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      </MDBContainer>
    </React.Fragment>
  );
}
