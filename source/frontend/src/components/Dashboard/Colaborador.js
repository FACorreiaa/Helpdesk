import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { classes } from "../constants/dashboard";
import Container from "@material-ui/core/Container";
import Colab2 from "../Graphs/colab_example_v2";
import { lists } from "../constants/lists";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { dropdown } from "../constants/dropdown";
import FilledInput from "@material-ui/core/FilledInput";
import FormHelperText from "@material-ui/core/FormHelperText";

export class Colaborador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      name: "ai"
    };
  }

  createData = (name, calories, fat) => {
    return {
      name,
      calories,
      fat
    };
  };

  render() {
    const rows = [
      this.createData("Low", 1),
      this.createData("Medium", 2),
      this.createData("High", 3)
    ];

    function handleChange(event) {
      this.setState(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value
      }));
    }

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
          <Grid item xs>
            <FormControl className={dropdown.formControl}>
              <InputLabel shrink htmlFor="age-label-placeholder">
                Colaborador
              </InputLabel>
              <Select
                value={this.state.age}
                onChange={handleChange}
                input={<Input name="age" id="age-label-placeholder" />}
                displayEmpty
                name="age"
                className={dropdown.selectEmpty}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>{" "}
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right"> Nivel de prioridade </TableCell>{" "}
                    <TableCell align="right"> Tempo médio </TableCell>{" "}
                  </TableRow>{" "}
                </TableHead>{" "}
                <TableBody>
                  {" "}
                  {rows.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {" "}
                        {row.name}{" "}
                      </TableCell>{" "}
                      <TableCell align="right"> {row.calories} </TableCell>{" "}
                      <TableCell align="right"> {row.fat} </TableCell>{" "}
                      <TableCell align="right"> {row.carbs} </TableCell>{" "}
                    </TableRow>
                  ))}{" "}
                </TableBody>{" "}
              </Table>{" "}
            </Paper>{" "}
          </Grid>{" "}
          <Grid item xs>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right"> Nivel de prioridade </TableCell>{" "}
                    <TableCell align="right"> Tempo médio </TableCell>{" "}
                  </TableRow>{" "}
                </TableHead>{" "}
                <TableBody>
                  {" "}
                  {rows.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {" "}
                        {row.name}{" "}
                      </TableCell>{" "}
                      <TableCell align="right"> {row.calories} </TableCell>{" "}
                      <TableCell align="right"> {row.fat} </TableCell>{" "}
                      <TableCell align="right"> {row.carbs} </TableCell>{" "}
                    </TableRow>
                  ))}{" "}
                </TableBody>{" "}
              </Table>{" "}
            </Paper>{" "}
          </Grid>{" "}
        </Grid>{" "}
      </div>
    );
  }
}

export default Colaborador;
