import React, {
  Component
} from "react";
import {
  Link,
  withRouter
} from "react-router-dom";
import {
  connect
} from "react-redux";
import {
  registerUser
} from "../../actions/authActions";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  ValidatorForm,
  TextValidator
} from "react-material-ui-form-validator";
import {
  classes
} from "../constants/login";
export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Dashboard");
    }
  }

  render() {
    const {
      errors
    } = this.state;
    return ( <
      div >
      <
      Container component = "main"
      maxWidth = "xs" >
      <
      CssBaseline / >
      <
      div className = {
        classes.paper
      } >
      <
      Avatar alt = "IPCA"
      src = "http://i68.tinypic.com/2gspvkm.png"
      className = {
        classes.bigAvatar
      }
      />{" "} <
      Typography component = "h1"
      variant = "h5" >
      Sign up {
        " "
      } <
      /Typography>{" "} <
      ValidatorForm ref = "form"
      className = {
        classes.form
      }
      noValidate onSubmit = {
        this.onSubmit
      } >
      <
      TextValidator variant = "outlined"
      margin = "normal"
      required fullWidth type = "text"
      id = "name"
      label = "Insert your name"
      name = "name"
      autoComplete = "name"
      autoFocus onChange = {
        this.onChange
      }
      value = {
        this.state.name
      }
      error = {
        errors.name
      }
      validators = {
        ["required"]
      }
      errorMessages = {
        ["this field is required"]
      }
      />{" "} <
      TextValidator variant = "outlined"
      margin = "normal"
      required fullWidth id = "email"
      label = "Insert your email"
      name = "email"
      autoComplete = "email"
      autoFocus onChange = {
        this.onChange
      }
      value = {
        this.state.email
      }
      error = {
        errors.email
      }
      validators = {
        ["required"]
      }
      errorMessages = {
        ["this field is required"]
      }
      />{" "} <
      TextValidator variant = "outlined"
      margin = "normal"
      required fullWidth name = "password"
      label = "Insert your Password"
      type = "password"
      id = "password"
      autoComplete = "current-password"
      onChange = {
        this.onChange
      }
      value = {
        this.state.password
      }
      error = {
        errors.password
      }
      validators = {
        ["required"]
      }
      errorMessages = {
        ["this field is required"]
      }
      />{" "} <
      TextValidator variant = "outlined"
      margin = "normal"
      required fullWidth name = "password"
      label = "Repeat your Password"
      type = "password"
      id = "password2"
      autoComplete = "current-password"
      onChange = {
        this.onChange
      }
      value = {
        this.state.password2
      }
      error = {
        errors.password2
      }
      validators = {
        ["required"]
      }
      errorMessages = {
        ["this field is required"]
      }
      />{" "} <
      Button type = "submit"
      fullWidth variant = "contained"
      color = "primary"
      className = {
        classes.submit
      } >
      Submit {
        " "
      } <
      /Button>{" "} <
      Grid item >
      <
      Link href = "#/Login"
      variant = "body2" > {
        " "
      } {
        "Already have an account? Log in!"
      } {
        " "
      } <
      /Link>{" "} <
      /Grid>{" "} <
      /ValidatorForm>{" "} <
      /div>{" "} <
      /Container>{" "} <
      /div>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps, {
    registerUser
  }
)(withRouter(Signup));