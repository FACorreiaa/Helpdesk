import Grid from "@material-ui/core/Grid";
import { classes } from "../constants/dashboard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";

class Avg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: { from: "", to: "" },
      //score: 1,
      //finalDate: ["2019-06-01"]
      labels: [],
      data: []

      // const data = {
      //   labels: this.state.finalDate,
      //   datasets: [
      //     {
      //       label: "Score",
      //       fill: false,
      //       lineTension: 0.1,
      //       backgroundColor: "rgba(75,192,192,0.4)",
      //       borderColor: "rgba(75,192,192,1)",
      //       borderCapStyle: "butt",
      //       borderDash: [],
      //       borderDashOffset: 0.0,
      //       borderJoinStyle: "miter",
      //       pointBorderColor: "rgba(75,192,192,1)",
      //       pointBackgroundColor: "#fff",
      //       pointBorderWidth: 1,
      //       pointHoverRadius: 5,
      //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
      //       pointHoverBorderColor: "rgba(220,220,220,1)",
      //       pointHoverBorderWidth: 2,
      //       pointRadius: 1,
      //       pointHitRadius: 10,
      //       data: this.state.score
      //     }
      //   ]
    };
  }

  render() {
    return (
      <div>
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
              onClick={e => this.getData(this.state.formFields)}
            >
              Submit{" "}
            </Button>{" "}
          </Grid>{" "}
        </form>

        <Line data={this.state} />
      </div>
    );
  }

  getData = async (from, to) => {
    from = this.state.formFields.from;
    to = this.state.formFields.to;

    try {
      let res = await axios.get(
        `/issues/periodic/count?from=${from}&to=${to}`
      );
      let data = res.data;
      let finalDate = [];
      let score = data.map(s => s.count);
      let date = data.map(d =>
        finalDate.push(`${d._id.year}-${d._id.month}-${d._id.day}`)
      );
      console.log(score);
      console.log(finalDate);
      this.setState({
        labels: finalDate,
        datasets: [
          {
            label: "média",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 10,
            data: score
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
  };

  inputChangeHandler(e) {
    e.preventDefault();

    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
  }

  componentDidMount() {
    this.getData();
  }
}

export default Avg;
