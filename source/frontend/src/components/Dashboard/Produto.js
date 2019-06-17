import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { classes } from "../constants/dashboard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Prod from "../Graphs/prod_example_v3";

export class Produto extends Component {
  render() {
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
        </Grid>
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
        </Grid>{" "}
        <Grid container spacing={3}>
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
          <Grid item xs />
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
        </Grid>
        <Grid container spacing={3}>
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
          <Grid item xs />
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
        <Grid container spacing={4}>
          <Prod />
        </Grid>{" "}
      </div>
    );
  }
}

export default Produto;
