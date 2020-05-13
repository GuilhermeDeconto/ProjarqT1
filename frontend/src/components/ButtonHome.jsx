
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const ButtonHome = withStyles({
  root: {
    background: "linear-gradient(308deg, rgba(209,65,174,1) 8%, rgba(162,0,255,1) 86%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    fontSize: 17, 
    padding: "0 75px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export default ButtonHome;