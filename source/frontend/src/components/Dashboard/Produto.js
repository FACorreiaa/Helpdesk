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
import { dropdown } from "../constants/dropdown";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import moment from "moment";
import axios from "axios";

export class Produto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      name: "ai",
      formFields: { from: "", to: "" },
      prods: [],
      prod: "",
      count: []
    };
  }

  createData = (name, calories, fat, batatas) => {
    return {
      name,
      calories,
      fat,
      batatas
    };
  };
  render() {
    const rows = [
      this.createData("Nº total pedidos", 1),
      this.createData("% Pedidos Não Avaliados", 2),
      this.createData("High", 3),
      this.createData("Teste", 4)
    ];

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <form style={{ display: "inline-flex", padding: "15px" }}>
            <Grid item xs>
              <TextField
                id="from"
                label="De"
                type="date"
                name="from"
                //value={this.name}
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                formatDate={from => moment(from).format("DD-MM-YYYY")}
                onChange={e => this.inputChangeHandler.call(this, e)}
                value={this.state.formFields.from}
              />{" "}
            </Grid>{" "}
            <Grid item xs>
              <TextField
                id="date"
                label="Até"
                type="date"
                name="to"
                //value={this.target.value}
                defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                formatDate={date => moment(date).format("DD-MM-YYYY")}
                onChange={e => this.inputChangeHandler.call(this, e)}
                value={this.state.formFields.to}
              />{" "}
            </Grid>{" "}
            <Grid item xs>
              <Button
                type="button"
                variant="contained"
                className={classes.button}
                onClick={e => this.getProductName(this.state.formFields)}
              >
                Submit{" "}
              </Button>{" "}
            </Grid>{" "}
            <Grid item xs style={{ paddingLeft: "15px" }}>
              <InputLabel shrink htmlFor="age-label-placeholder">
                Produto{" "}
              </InputLabel>{" "}
              <Select
                value={this.state.prod}
                //defaultValue={this.state.prod}
                //onChange={this.handleChange}
                onClick={e => {
                  this.handleClick(e);
                  this.getProdAPI();
                }}
                input={<Input name="prods" id="age-label-placeholder" />}
                displayEmpty
                name="prods"
                className={dropdown.selectEmpty}
              >
                <MenuItem value={this.state.prod}>
                  <em> Selecione o produto </em>{" "}
                </MenuItem>{" "}
                {this.state.prods.map((item, key) => (
                  <MenuItem value={item} key={key}>
                    {" "}
                    {item}{" "}
                  </MenuItem>
                ))}
              </Select>{" "}
            </Grid>
          </form>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.root}>
              <Table className={classes.table}>
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
                      <TableCell align="right"> {row.batatas} </TableCell>{" "}
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
        </Grid>{" "}
        {/* <Grid container spacing={4}>
                                          <Prod />
                                        </Grid>{" "} */}{" "}
      </div>
    );
  }
  inputChangeHandler(e) {
    e.preventDefault();

    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
  }

  // handleChange = prod => {
  //   this.setState({ prod });
  //   prod.forEach(selectedOption =>
  //     console.log(`Selected: ${selectedOption.value}`)
  //   );
  // };

  handleClick = event => {
    let value = event.target.value === undefined ? "ola" : event.target.value;

    this.setState({
      prod: value
    });

    return value;
  };

  getProdAPI = async e => {
    let from = this.state.formFields.from;
    let to = this.state.formFields.to;
    //const value = e.target.value === undefined ? "ola" : this.state.prod;
    //console.log(value);
    let res;
    try {
      res = await axios.get(
        `http://localhost:3000/issues/count?from=${from}&to=${to}&product_name=${value}`
      );
    } catch (error) {
      console.log(error);
    }

    let data = res.data[0];
    console.log(data);

    this.setState({
      count: data
    });
  };

  getProductName = async (from, to) => {
    from = this.state.formFields.from;
    to = this.state.formFields.to;

    let resProd;

    try {
      resProd = await axios.get(
        `http://localhost:3000/issues/projects?from=${from}&to=${to}`
      );
      let data = resProd.data;
      const dataProd = data.map(pn => pn._id.product_name);
      console.log(dataProd);
      this.setState({
        prods: dataProd
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default Produto;
