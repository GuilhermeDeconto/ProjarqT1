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
    backgroundColor: "DarkGray"
  },
});

const iconTrophy = <MDBIcon size="lg" icon="trophy" />

const checkPodium = (number) => {
  if(number === 1 || number === 2 || number === 3){
    return true
  }
  return false
}
var countPosition = 1

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} >
        <TableCell>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12} style={{ backgroundColor: "Gainsboro" }}>
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

export default function ResultTable(props) {
  console.log(props.team != [] ? props.teams.length : "");

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" >
        <TableHead style={{ backgroundColor: "Green" }}>
          <TableRow>
            <TableCell />
            <TableCell>Classificação</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell align="center">Plataforma</TableCell>
            <TableCell align="center">Software(média)</TableCell>
            <TableCell align="center">Processo(média)</TableCell>
            <TableCell align="center">Pitch(média)</TableCell>
            <TableCell align="center">Inovação(média)</TableCell>
            <TableCell align="center">Formação(média)</TableCell>
            <TableCell align="center">Nota geral</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.teams.map((row) => (
            <Row key={row.name} row={row} currentPosition={countPosition++} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
