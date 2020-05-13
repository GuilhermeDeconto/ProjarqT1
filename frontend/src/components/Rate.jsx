import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";


const Rate = (props) => {
  const labels = {
    1: "Ruim",
    2: "Insatisfatório",
    3: "Aceitavel",
    4: "Bom",
    5: "Excelente",
  };

  const useStyles = makeStyles({
    root: {
      width: 550,
      height: 100,
    },
  });
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        defaultValue={1}
        className="d-flex justify-content-end"
        name="hover-feedback"
        value={value}
        size="medium"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box className="d-flex justify-content-end" ml={2}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </div>
  );
};

export default Rate;
