import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { MDBIcon } from "mdbreact";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    color: "#fff"
  },
});

const iconTrophy = <MDBIcon size="lg" icon="trophy" />

const checkPodium = (number) => {
  if(number === 1 || number === 2 || number === 3){
    return true
  }
  return false
}
var countPosition

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow style={{ backgroundColor: "#B0C4DE", color: "#FFF" }} >
        <TableCell >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" >{checkPodium(props.currentPosition) ? iconTrophy : ''} <br/> {props.currentPosition}º lugar </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.platform}</TableCell>
        <TableCell align="center">{row.software}</TableCell>
        <TableCell align="center">{row.process}</TableCell>
        <TableCell align="center">{row.pitch}</TableCell>
        <TableCell align="center">{row.inovation}</TableCell>
        <TableCell align="center">{row.formation}</TableCell>
        <TableCell align="center">{row.evaluation}</TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: "#B0C4DE", color: "#F0F8FF" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12} >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Avaliadores
              </Typography>
              <Table size="small" aria-label="evaluators">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.evaluators.map((historyRow) => (
                    <TableRow key={historyRow}>
                      <TableCell component="th" scope="row">
                        {historyRow}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    platform: PropTypes.string.isRequired,
    software: PropTypes.string.isRequired,
    process: PropTypes.string.isRequired,
    pitch: PropTypes.string.isRequired,
    inovation: PropTypes.string.isRequired,
    formation: PropTypes.string.isRequired,
    evaluation: PropTypes.string.isRequired,
    evaluators: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default function ResultTable(props) {
  countPosition = props.count
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" style={{backgroundColor: "#527a7a", color: "#F0F8FF"}} >
        <TableHead style={{ backgroundColor: "#527a7a", color: "#F0F8FF"}} >
          <TableRow>
            <TableCell />
            <TableCell style={{color: "#FFF"}}>Classificação</TableCell>
            <TableCell style={{color: "#FFF"}}>Nome</TableCell>
            <TableCell align="center" style={{color: "#FFF"}} >Plataforma</TableCell>
            <TableCell align="center" style={{color: "#FFF"}} >Software(média)</TableCell>
            <TableCell align="center" style={{color: "#FFF"}} >Processo(média)</TableCell>
            <TableCell align="center" style={{color: "#FFF"}} >Pitch(média)</TableCell>
            <TableCell align="center" style={{color: "#FFF"}} >Inovação(média)</TableCell>
            <TableCell align="center" style={{color: "#FFF"}} >Formação(média)</TableCell>
            <TableCell align="center" style={{color: "#FFF"}} >Nota geral</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: "#B0C4DE", color: "#F0F8FF" }}>
          {props.teams.map((row) => (
            <Row key={row.name} row={row} currentPosition={countPosition--} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
