import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { classes } from "../constants/dashboard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import axios from "axios";

export class Global extends Component {
  constructor() {
    super();

    this.state = {
      age: "",
      name: "ai",
      formFields: {
        from: "",
        to: ""
      },
      count: {
        total: "-",
        neval: "-"
      },
      avgScore: { avgScore: "-" },
      stdDevScore: { stdDevScore: "-" },
      descrLevel: ["Descrição Nivel"],
      valueLevel: ["Tempo médio"],
      celerUser: ["Top Utilizadores"],
      scoreUser: ["Top Utilizadores"]
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

  createData2 = (name, calories, fat) => {
    return {
      name,
      calories,
      fat
    };
  };

  render() {
    //const { from, to } = this.state;

    const rows = [
      this.createData("Nº total pedidos", this.state.count.total),
      this.createData("% Pedidos Não Avaliados", this.state.count.neval),
      this.createData(
        "Avaliação média Qualidade",
        this.state.avgScore.avgScore
      ),
      this.createData("Desvio padrão", this.state.stdDevScore.stdDevScore)
    ];

    const rows2 = [
      this.createData2(this.state.descrLevel[0], this.state.valueLevel[0]),
      this.createData2(this.state.descrLevel[1], this.state.valueLevel[1]),
      this.createData2(this.state.descrLevel[2], this.state.valueLevel[2])
    ];

    const theme = {
      spacing: [0, 2, 3, 5, 8]
    };

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <form
            style={{
              display: "inline-flex",
              padding: "15px"
            }}
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
                onClick={e => this.getGlobalState(this.state.formFields)}
              >
                Submit{" "}
              </Button>{" "}
            </Grid>{" "}
          </form>{" "}
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
                  {rows2.map(row2 => (
                    <TableRow key={row2.name}>
                      <TableCell component="th" scope="row">
                        {" "}
                        {row2.name}{" "}
                      </TableCell>{" "}
                      <TableCell align="right"> {row2.calories} </TableCell>{" "}
                      <TableCell align="right"> {row2.fat} </TableCell>{" "}
                      <TableCell align="right"> {row2.carbs} </TableCell>{" "}
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
                <ListSubheader> {`Top users velocidade`} </ListSubheader>{" "}
                {this.state.celerUser.map(item => (
                  <ListItemText
                    style={{
                      paddingLeft: "15px"
                    }}
                    primary={`${item}`}
                  >
                    {" "}
                  </ListItemText>
                ))}{" "}
              </List>{" "}
            </Paper>{" "}
          </Grid>{" "}
          <Grid item xs>
            <Paper className={classes.paperClasses}>
              <List className={classes.root} subheader={<li />}>
                {" "}
                <ListSubheader> {`Top users score`} </ListSubheader>{" "}
                {this.state.scoreUser.map(item => (
                  <ListItemText
                    style={{
                      paddingLeft: "15px"
                    }}
                    primary={`${item}`}
                  >
                    {" "}
                  </ListItemText>
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

    let formFields = {
      ...this.state.formFields
    };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
  }

  getGlobalState = async (from, to) => {
    from = this.state.formFields.from;
    to = this.state.formFields.to;

    let res;
    let rest;
    let resStd;
    let resLevel;
    let resFast;
    let resScore;
    try {
      res = await axios.get(`/issues/count?from=${from}&to=${to}`);
      let data = res.data[0];

      if (data === undefined) data = 0;

      rest = await axios.get(`/issues/scoreAvg?from=${from}&to=${to}`);
      let dataavg = rest.data[0];

      console.log(dataavg);
      if (dataavg === undefined) dataavg = 0;

      resStd = await axios.get(`/issues/scoreStd?from=${from}&to=${to}`);
      let datastd = resStd.data[0];
      if (datastd === undefined) datastd = 0;

      resLevel = await axios.get(
        `/issues/priority/responseTimeAvg?from=${from}&to=${to}`
      );
      let dataLevel = resLevel.data;
      const toDays = 60 * 60 * 24 * 1000;
      let descrLevel = dataLevel.map(l => l._id.name);
      let valueLevel = dataLevel.map(l => l.avgRTime / toDays);

      if (descrLevel === undefined) descrLevel = 0;
      if (valueLevel === undefined) valueLevel = 0;

      resFast = await axios.get(
        `/issues/collaborators/responseTimeAvg?from=${from}&to=${to}`
      );
      let dataFast = resFast.data;

      let celerUser = dataFast.map(df => df._id.name);

      if (celerUser === undefined) celerUser = 0;

      //
      resScore = await axios.get(
        `/issues/collaborators/scoreAvg?from=${from}&to=${to}`
      );
      let dataScore = resScore.data;
      let scoreUser = dataScore.map(df => df._id.name);

      if (scoreUser === undefined) scoreUser = 0;

      this.setState({
        count: data,
        avgScore: dataavg,
        stdDevScore: datastd,
        descrLevel: descrLevel,
        valueLevel: valueLevel,
        celerUser: celerUser,
        scoreUser: scoreUser
      });
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    await this.getGlobalState();
  }
}

export default Global;
