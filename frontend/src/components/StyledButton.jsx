
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const StyledButton = withStyles({
  root: {
    background: "linear-gradient(308deg, #232526 8%, #414345 86%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

export default StyledButton;