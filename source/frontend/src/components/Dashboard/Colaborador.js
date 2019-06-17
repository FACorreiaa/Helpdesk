import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { classes } from "../constants/dashboard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Colab2 from "../Graphs/colab_example_v2";
import { lists } from "../constants/lists";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
export class Colaborador extends Component {
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
              label="Avaliação média do Serviço"
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
          <Grid item xs />
          <Grid item xs />

          <Grid item xs>
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
          </Grid>
          <Grid item xs />
          <Grid item xs />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Colab2 />
          </Grid>{" "}
        </Grid>{" "}
      </div>
    );
  }
}

export default Colaborador;
