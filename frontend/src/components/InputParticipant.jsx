/* eslint-disable no-use-before-define */

import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Typography from "@material-ui/core/Typography";
import * as axios from "axios";
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
      valid: false,
    };
  }

  erro() {
    return (
      <div>
        {this.state.valid && (
          <div>
            <div className="erro text-center pt-2">
              <h4 className="white-text red">Sugestão inválida</h4>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    axios.get(`${this.baseUrl}/users`).then((response) => {
      if (response) {
        var participants = response.data.users
        this.setState({
          participants: participants,
        });
      }
    });
  }

  validTeam(){
    console.log(this.state)
    /* var { teamSuggested } = this.state
    var cursos = []
    if(teamSuggested){
      teamSuggested.map((item) => {
        var curso = item.curse
        console.log(curso)
        if(!cursos.contains(curso)){ 
          cursos.push(curso)
        }
      })
    } */
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
          getOptionSelected={(option, value) => {console.log(value)}}
          getOptionLabel={(option) => option.name}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 , backgroundColor: "#FFF", color: "black"}}
                checked={selected}
              />
              {option.name}
            </React.Fragment>
          )}
          fullWidth={true}
          autoComplete={true}
          autoHighlight={true}
          style={{ width: 650 , color: "black"}}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Insira o nome dos participantes que deseja sugerir"
              placeholder="Participantes"
            />
          )}
        />

        <a className="d-flex justify-content-center mt-2" onClick={this.validTeam}>
          <MDBBtn color="deep-purple">Sugerir time</MDBBtn>
        </a>
        <Typography
          className="d-flex justify-content-center mt-2"
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
