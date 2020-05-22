/* eslint-disable no-use-before-define */

import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Typography from "@material-ui/core/Typography";
import * as axios from "axios";
import Chip from "@material-ui/core/Chip";
import { MDBContainer, MDBBtn } from "mdbreact";

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
    };
    this.validTeam = this.validTeam.bind(this);
    this.erroQuantidade = this.erroQuantidade.bind(this);
    this.sucesso = this.sucesso.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.retiraErro = this.retiraErro.bind(this);
  }

  erroQuantidade() {
    return (
      <div>
        {this.state.erro && (
          <div>
            <div className="erro text-center pt-2">
              <h5 className="white-text red">
                Quantidade de participantes inválida!
              </h5>
            </div>
          </div>
        )}
      </div>
    );
  }

  retiraErro() {
    this.setState({
      erro: false,
    });
  }

  sucesso() {
    return (
      <div>
        {this.state.sucesso && (
          <div>
            <div className="erro text-center pt-2">
              <h5 className="white-text green">Sugestão enviada!</h5>
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
  }

  validTeam() {
    var { teamSuggested } = this.state;
    var cursos = [];
    console.log(teamSuggested);
    if (teamSuggested.length != 5) {
      this.setState({
        erro: true,
      });
    }
    if (teamSuggested.length == 5) {
      teamSuggested.map((item) => {
        var curso = item.curse;
        console.log(curso);
        if (!cursos.includes(curso)) {
          cursos.push(curso);
        }
      });
      if(cursos.length > 2){
        this.setState({
          erro:false, 
          sucesso: true
        })
      }
    }
  }

  render() {
    let { participants, teamSuggested } = this.state;

    return (
      <div>
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
          style={{ width: 682, color: "black" }}
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
              style={{ fontSize: "15px" }}
            />
          )}
        />
        {this.erroQuantidade()}
        {this.sucesso()}
        <MDBBtn
          color="deep-purple"
          onClick={this.validTeam}
          className="d-flex justify-content-center mt-2"
        >
          Sugerir time
        </MDBBtn>

        <Typography
          className="d-flex justify-content-start mt-2"
          variant="body2"
          gutterBottom
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
