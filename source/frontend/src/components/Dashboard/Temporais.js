import React, { Component } from "react";
import { classes } from "../constants/graph";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avg from "../Graphs/avg";
import Std from "../Graphs/std";

export class Temporais extends Component {
  render() {
    return (
      <>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Avg />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Std />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default Temporais;
