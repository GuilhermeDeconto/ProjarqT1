
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const ButtonHome = withStyles({
  root: {
    background: "#F38200",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    fontSize: 20, 
    padding: "75px 75px",
    //boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export default ButtonHome;