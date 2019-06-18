import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { classes } from "../constants/dashboard";
import Container from "@material-ui/core/Container";
import Colab2 from "../Graphs/colab_example_v2";
import { lists } from "../constants/lists";
import InputDate from "./SubComponents/InputDate";
import TextField from "./SubComponents/TextField";
import Button from "./SubComponents/SubmitButton";
import Table from "./SubComponents/Table";
export class Colaborador extends Component {
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
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <InputDate />
          </Grid>{" "}
          <Grid item xs>
            <InputDate />
          </Grid>{" "}
          <Grid item xs>
            <Button />
          </Grid>{" "}
        </Grid>{" "}
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField />
          </Grid>{" "}
          <Grid item xs>
            <TextField />
          </Grid>{" "}
          <Grid item xs>
            <TextField />
          </Grid>{" "}
          <Grid item xs>
            <TextField />
          </Grid>{" "}
        </Grid>{" "}
        <Grid container spacing={3}>
          <Grid item xs />
          <Grid item xs />
          <Grid item xs>
            <Table />
          </Grid>{" "}
          <Grid item xs />
          <Grid item xs />
        </Grid>{" "}
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
