import React from "react";
import MaterialTable from "material-table";
import { MDBContainer, MDBBtn } from "mdbreact";
import { green, red } from "@material-ui/core/colors";
import AddBox from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";

export default function TableRender(props) {
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

  const edit = {
    
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            var data = state.data;
            data.push(newData);
            this.setState({ data }, () => resolve());
          }
          resolve();
        }, 1000);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            var data = state.data;
            var index = data.indexOf(oldData);
            data[index] = newData;
            this.setState({ data }, () => resolve());
          }
          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            var data = state.data;
            var index = data.indexOf(oldData);
            data.splice(index, 1);
            this.setState({ data }, () => resolve());
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

  return (
    <React.Fragment>
      <MDBContainer className="mt-1" fluid>
        <MDBBtn color="deep-purple">Importar {labelButton}</MDBBtn>
        <MaterialTable
          title={labelTitle}
          columns={columns}
          options={options}
          data={data}
          localization={localization}
          icons={isIcons ? icons : <div />}
          isLoading={columns && data ? false : true}
          editable={isEditable ? edit : <div />}
        />
      </MDBContainer>
    </React.Fragment>
  );
}
