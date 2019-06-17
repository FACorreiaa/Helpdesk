import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { classes } from "../constants/dashboard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Prod from "../Graphs/prod_example_v3";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { paperClasses } from "../constants/graph";
import { paperTable } from "../constants/table";

export class Produto extends Component {
  createData = (name, calories, fat) => {
    return { name, calories, fat };
  };
  render() {
    const rows = [
      this.createData("Low", 1),
      this.createData("Medium", 2),
      this.createData("High", 3)
    ];
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <form className={classes.container} noValidate>
              <TextField
                id="date"
                label="De"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />{" "}
            </form>{" "}
          </Grid>{" "}
          <Grid item xs>
            <form className={classes.container} noValidate>
              <TextField
                id="date"
                label="Até"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />{" "}
            </form>{" "}
          </Grid>{" "}
          <Grid item xs>
            <Button variant="contained" className={classes.button}>
              Submit{" "}
            </Button>{" "}
          </Grid>{" "}
        </Grid>{" "}
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField
              disabled
              id="outlined-disabled"
              label="Total Pedidos"
              defaultValue="Hello World"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>{" "}
          <Grid item xs>
            <TextField
              disabled
              id="outlined-disabled"
              label="% pedidos não avaliados"
              defaultValue="Hello World"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>{" "}
          <Grid item xs>
            <TextField
              disabled
              id="outlined-disabled"
              label="Tempo médio de resposta"
              defaultValue="Hello World"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>{" "}
          <Grid item xs>
            <TextField
              disabled
              id="outlined-disabled"
              label="Desvio padrão votações"
              defaultValue="Hello World"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>{" "}
        </Grid>{" "}
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paperClasses}>
              <List className={classes.root} subheader={<li />}>
                {" "}
                {[0].map(sectionId => (
                  <li
                    key={`section-${sectionId}`}
                    className={classes.listSection}
                  >
                    <ul className={classes.ul}>
                      <ListSubheader> {`Top users por rating`} </ListSubheader>{" "}
                      {[0, 1, 2].map(item => (
                        <ListItem key={`item-${sectionId}-${item}`}>
                          <ListItemText primary={`Item ${item}`} />{" "}
                        </ListItem>
                      ))}{" "}
                    </ul>{" "}
                  </li>
                ))}{" "}
              </List>{" "}
            </Paper>{" "}
          </Grid>{" "}
          <Grid item xs>
            <Paper className={classes.paperClasses}>
              <List className={classes.root} subheader={<li />}>
                {" "}
                {[0].map(sectionId => (
                  <li
                    key={`section-${sectionId}`}
                    className={classes.listSection}
                  >
                    <ul className={classes.ul}>
                      <ListSubheader> {`Top users por rating`} </ListSubheader>{" "}
                      {[0, 1, 2].map(item => (
                        <ListItem key={`item-${sectionId}-${item}`}>
                          <ListItemText primary={`Item ${item}`} />{" "}
                        </ListItem>
                      ))}{" "}
                    </ul>{" "}
                  </li>
                ))}{" "}
              </List>{" "}
            </Paper>{" "}
          </Grid>{" "}
          <Grid item xs>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Nivel de prioridade</TableCell>
                    <TableCell align="right">Tempo médio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>{" "}
        {/* <Grid container spacing={4}>
                  <Prod />
                </Grid>{" "} */}{" "}
      </div>
    );
  }
}

export default Produto;
