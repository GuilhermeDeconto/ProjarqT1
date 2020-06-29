/* eslint-disable no-use-before-define */

import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Typography from "@material-ui/core/Typography";
import * as axios from "axios";
import Chip from "@material-ui/core/Chip";
import { MDBBtn, MDBIcon } from "mdbreact";
import '../css/buttonsuggest.css'


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class InputParticipant extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `http://localhost:9876`;
    this.state = {
      participants: [],
      teamSuggested: [],
      name: this.props.participant,
      erro: false,
      sucesso: false,
      erroCursos: false
    };
    this.validTeam = this.validTeam.bind(this);
    this.erroQuantidade = this.erroQuantidade.bind(this);
    this.sucesso = this.sucesso.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.erroCursos = this.erroCursos.bind(this)
  }

  erroQuantidade() {
    return (
      <div>
        {this.state.erro === true && this.state.sucesso === false && this.state.erroCursos === false &&(
          <div className="erro text-center py-3 my-1">
            <h5 className="white-text red py-1 my-1">
              <MDBIcon className="mx-2" icon="times-circle" size="lg" />
              Quantidade de participantes inválida!
            </h5>
          </div>
        )}
      </div>
    );
  }

  erroCursos() {
    return (
      <div>
        {this.state.erroCursos === true && this.state.sucesso === false && this.state.erro === false && (
          <div className="erro text-center py-3 my-1">
            <h5 className="white-text red py-1 my-1">
              <MDBIcon className="mx-2" icon="times-circle" size="lg" />
              Sugestão invalida, verifique os cursos!
            </h5>
          </div>
        )}
      </div>
    );
  }

  sucesso() {
    return (
      <div>
        {this.state.sucesso === true && this.state.erro === false && this.state.erroCursos === false && (
          <div>
            <div className="erro text-center py-3 my-1">
              <h5 className="white-text green py-1 my-1">
                <MDBIcon className="mx-2" icon="check-circle" size="lg" />
                Sugestão enviada!
              </h5>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    axios.get(`${this.baseUrl}/users`).then((response) => {
      if (response) {
        var participants = response.data.users;
        this.setState({
          participants: participants,
        });
      }
    });
  }

  addParticipant(array) {
    this.setState({
      teamSuggested: array,
    });
    console.log(array);
  }

  validTeam() {
    var { teamSuggested } = this.state;
    var cursos = [];
    console.log(teamSuggested);
    if (teamSuggested.length !== 5) {
      this.setState({
        erro: true,
        sucesso: false,
        erroCursos: false
      });
    }
    if (teamSuggested.length === 5) {
      // eslint-disable-next-line
      teamSuggested.map((item) => {
        var curso = item.curse;
        if (!cursos.includes(curso)) {
          cursos.push(curso);
        }
      });
      if (cursos.length >= 2) {
        this.setState({
          erro: false,
          sucesso: true,
          erroCursos: false
        });
      } else {
        this.setState({
          erro: false,
          sucesso: false,
          erroCursos: true
        });
      }
    }
  }

  render() {
    let { participants } = this.state;

    return (
      <div className="mx-auto">
        <Autocomplete
          multiple
          id="checkboxes-tags-participants"
          options={participants ? participants : []}
          disableCloseOnSelect
          noOptionsText={"Sem opções"}
          closeText={"Fechar"}
          openText={"Abrir mais opções"}
          onChange={(option, value) => {
            this.addParticipant(value);
          }}
          clearText={"Limpar"}
          getOptionLabel={(option) => option.name}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{
                  marginRight: 8,
                  backgroundColor: "#FFF",
                  color: "black",
                }}
                checked={selected}
              />
              {option.name}
            </React.Fragment>
          )}
          fullWidth={true}
          autoComplete={true}
          autoHighlight={true}
          style={{ width: 1400, color: "black" }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option.name}
                {...getTagProps({ index })}
                style={{ backgroundColor: "#FFF", fontSize: "15px" }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Insira o nome dos participantes que deseja sugerir"
              placeholder="Participantes"
              style={{ fontSize: "15px", color: "black" }}
            />
          )}
        />
        {this.erroQuantidade()}
        {this.sucesso()}
        {this.erroCursos()}
        <MDBBtn
          onClick={this.validTeam}
          id="btnsugerir"
          className="d-flex justify-content-center my-3"
        >
          Sugerir time
        </MDBBtn>

        <Typography
          className="d-flex justify-content-start mt-2"
          variant="body2"
          gutterBottom
          //style={{color: "black", fontSize: 13}}
        >
          Lembre-se que para sugerir um time
          <br /> é preciso que os integrantes estejam escritos
          <br /> e no mínimo 2 dois integrantes
          <br /> de cursos diferentes.
        </Typography>
      </div>
    );
  }
}

export default InputParticipant;
