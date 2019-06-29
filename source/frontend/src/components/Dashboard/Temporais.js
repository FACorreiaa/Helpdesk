import React, { Component } from "react";
import { classes } from "../constants/graph";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avg from "../Graphs/avg";
import Std from "../Graphs/std";
import Typography from "@material-ui/core/Typography";
import { typo } from "../constants/typo";
export class Temporais extends Component {
  render() {
    return (
      <>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={typo.root} variant="h6" gutterBottom>
                  Numero pedidos
                </Typography>
                <Avg />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={typo.root} variant="h6" gutterBottom>
                  Avaliação Média
                </Typography>
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
