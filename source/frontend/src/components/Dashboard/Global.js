import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { classes } from "../constants/dashboard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Nivo from "../Graphs/nivo";
import List from "@material-ui/core/List";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { formClasses } from "../constants/bootsrap";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { paperTable } from "../constants/table";
import Input from "@material-ui/core/Input";
import { dropdown } from "../constants/dropdown";
import moment from "moment";
import axios from "axios";
import { spacing } from "@material-ui/system";

export class Global extends Component {
  constructor() {
    super();

    this.state = {
      age: "",
      name: "ai",
      formFields: { from: "", to: "" }
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
    //const { from, to } = this.state;

    const rows = [
      this.createData("Low", 1),
      this.createData("Medium", 2),
      this.createData("High", 3),
      this.createData("Teste", 4)
    ];

    const theme = {
      spacing: [0, 2, 3, 5, 8]
    };

    // function handleChange(event) {
    //   this.setState(oldValues => ({
    //     ...oldValues,
    //     [event.target.name]: event.target.value
    //   }));
    // }

    // function handleChange1(e, from) {
    //   this.setState({
    //     from: e.target.value,
    //     to: e.target.value
    //   });
    //   console.log(e);
    //   console.log(this.state.from);
    // }

    // function handleChange1(e) {
    //   // console.log(e.target.value);
    //   // this.setState({
    //   //   from: e.target.value
    //   // });
    //   // console.log("from: ", this.state.from);
    //   const value = e.target.value;
    //   const name = e.target.name;
    //   this.setState({
    //     [name]: value
    //   });
    //   console.log(from);
    //   console.log(name);
    // }

    // function handleChange2(e, to) {
    //   console.log(e.target.value);
    //   this.setState({
    //     [to]: e.target.value
    //   });
    //   console.log(`teste ${this.state.to}`);
    // }

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <form
            onSubmit={this.formHandler(this.state.formFields)}
            style={{ display: "inline-flex", padding: "15px" }}
          >
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
                //onChange={handleChange1.bind(this)}
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
                type="submit"
                variant="contained"
                className={classes.button}
              >
                Submit{" "}
              </Button>{" "}
            </Grid>{" "}
          </form>
        </Grid>{" "}
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
    console.log(formFields.from);
    console.log(formFields.to);
  }

  formHandler(formFields) {
    axios
      .post("/api/register", formFields)
      .then(function(response) {
        console.log(response);
        //Perform action based on response
      })
      .catch(function(error) {
        console.log(error);
        //Perform action based on error
      });
  }
}

export default Global;
