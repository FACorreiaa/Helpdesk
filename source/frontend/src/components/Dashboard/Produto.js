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
import { dropdown } from "../constants/dropdown";
import MenuItem from "@material-ui/core/MenuItem";
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
      formFields: {
        from: "",
        to: ""
      },
      prods: [],
      prod: "",
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
                onClick={e => this.getProductName(this.state.formFields)}
              >
                Submit{" "}
              </Button>{" "}
            </Grid>{" "}
            <Grid
              item
              xs
              style={{
                paddingLeft: "15px"
              }}
            >
              <InputLabel shrink htmlFor="age-label-placeholder">
                Produto{" "}
              </InputLabel>{" "}
              <Select
                value={this.state.prods}
                //defaultValue={this.state.prod}
                //onChange={this.handleChange}
                onChange={e => {
                  this.getProdAPI(e);
                  this.handleClick(e);
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
                  <MenuItem value={item} key={key} name="prod">
                    {" "}
                    {item}{" "}
                  </MenuItem>
                ))}{" "}
              </Select>{" "}
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

  // handleChange = prod => {
  //   this.setState({ prod });
  //   prod.forEach(selectedOption =>
  //     console.log(`Selected: ${selectedOption.value}`)
  //   );
  // };

  handleClick = async event => {
    let value = event.target.value;

    this.setState({
      prod: value
    });
    console.log("1: " + value);
    return value;
  };

  getProdAPI = async e => {
    let from = this.state.formFields.from;
    let to = this.state.formFields.to;
    //let value = e.target.value;
    let prod = e.target.value;

    //console.log(value);
    let res;
    let rest;
    let resStd;
    let resLevel;
    let resFast;
    let resScore;
    try {
      res = await axios.get(
        `/issues/count?from=${from}&to=${to}&product_name=${prod}`
      );
    } catch (error) {
      console.log(error);
    }

    let data = res.data[0];
    if (data === undefined) data = 0;

    rest = await axios.get(
      `/issues/scoreAvg?from=${from}&to=${to}&product_name=${prod}`
    );
    let dataavg = rest.data[0];
    if (dataavg === undefined) dataavg = 0;

    resStd = await axios.get(
      `/issues/scoreStd?from=${from}&to=${to}&product_name=${prod}`
    );
    let datastd = resStd.data[0];
    if (datastd === undefined) datastd = 0;

    resLevel = await axios.get(
      `/issues/priority/responseTimeAvg?from=${from}&to=${to}&product_name=${prod}`
    );
    let dataLevel = resLevel.data;
    const toDays = 60 * 60 * 24 * 1000;

    let descrLevel = dataLevel.map(l => l._id.name);
    let valueLevel = dataLevel.map(l => Math.round(l.avgRTime / toDays));
    if (descrLevel === undefined) descrLevel = 0;
    if (valueLevel === undefined) valueLevel = 0;

    resFast = await axios.get(
      `/issues/collaborators/responseTimeAvg?from=${from}&to=${to}&product_name=${prod}`
    );
    let dataFast = resFast.data;

    const celerUser = dataFast.map(df => df._id.name);
    if (celerUser === undefined) celerUser = 0;

    //
    resScore = await axios.get(
      `/issues/collaborators/scoreAvg?from=${from}&to=${to}&product_name=${prod}`
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
  };

  getProductName = async (from, to) => {
    from = this.state.formFields.from;
    to = this.state.formFields.to;

    let resProd;

    try {
      resProd = await axios.get(`/issues/projects?from=${from}&to=${to}`);
      let data = resProd.data;
      const dataProd = data.map(pn => pn._id.product_name);
      this.setState({
        prods: dataProd
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    //this.getProductName();
  }
}

export default Produto;
