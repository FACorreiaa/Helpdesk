import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { classes } from "../constants/login";
import axios from "axios";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorText: ""
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users", {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(res => {
        localStorage.setItem("cool-jwt", res.data.user.token);
        console.log(res.data.user.token);
      });
  }

  render() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar
              alt="IPCA"
              src="http://i68.tinypic.com/2gspvkm.png"
              className={classes.bigAvatar}
            />{" "}
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>{" "}
            <ValidatorForm
              ref="form"
              className={classes.form}
              noValidate
              onSubmit={e => this.submit(e)}
            >
              <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => this.change(e)}
                value={this.state.email}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />{" "}
              <TextValidator
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.change(e)}
                value={this.state.password}
                onBlur={this.isDisabled}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />{" "}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit{" "}
              </Button>{" "}
            </ValidatorForm>{" "}
          </div>{" "}
        </Container>{" "}
      </div>
    );
  }
}

export default Login;
