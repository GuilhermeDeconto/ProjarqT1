import React from "react";
import { Rate } from "antd";
import { Box } from "@material-ui/core";

const labels = ["Ruim", "Insatisfatório", "Aceitavel", "Bom", "Excelente"];

class Rater extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 1,
      text: '',
      nameRater: props.name
    };
  }

  handleChange = (value) => {
    let texto = labels[value-1]
    console.log("Numero: ", value);
    console.log("Avaliaçào dada:", texto)
    console.log("Nome avaliacão: ", this.state.nameRater)
    this.setState({ value, text: texto });
  };

  render() {
    const { value } = this.state;
    return (
      <div >
        <Rate className="d-flex justify-content-end" tooltips={labels} onChange={this.handleChange} value={value}/>
        {value !== null &&
          <Box ml={2} className="ant-rate-text d-flex justify-content-end">{labels[value - 1]}</Box>
        }
      </div>
    );
  }
}

export default Rater;
