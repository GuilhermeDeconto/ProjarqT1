import React from "react";
import { Rate } from "antd";
import { Box } from "@material-ui/core";

const labels = ["Ruim", "Insatisfatório", "Aceitavel", "Bom", "Excelente"];

class Rater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.getValue(props.initValue),
      text: props.initValue,
      nameRater: props.name,
      number: props.number,
    };
  }

  getValue(initValue) {
    switch (initValue) {
      case "Ruim":
        return 1;
      case "Insatisfatório":
        return 2;
      case "Aceitavel":
        return 3;
      case "Bom":
        return 4;
      case "Excelente":
        return 5;
      default:
        return 1;
    }
  }

  handleChange = (value) => {
    let texto = labels[value - 1];
    this.props.trocaValoresState(this.state.nameRater, texto);
    this.setState({ value, text: texto });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Rate
          className="d-flex justify-content-end"
          tooltips={labels}
          onChange={this.handleChange}
          value={value}
        />
        {value !== null && (
          <Box ml={2} className="ant-rate-text d-flex justify-content-end" style={{ color: "black"}}>
            {labels[value - 1]}
          </Box>
        )}
      </div>
    );
  }
}

export default Rater;
