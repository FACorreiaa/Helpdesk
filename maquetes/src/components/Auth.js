import React, { Component } from "react";
import { getJWT } from "../helpers/jwt";
import axios from "axios";
export class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    const jwt = getJWT();
    if (!jwt) {
      this.props.history.push("/Login");
    }

    axios
      .get("http://localhost:8000/api/users/current", {
        headers: {
          Authorization: `Token ${jwt}`
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data.user
          // user: {
          //   email: this.state.user.email,
          //   password: this.state.user.password
          // }
        });
        console.log(this.setState);
      })
      .catch(err => {
        console.log(err);

        localStorage.removeItem("cool-jwt");
        debugger;
        this.props.history.push("/Protected");
      });
  }
  render() {
    if (this.state.user === undefined) {
      return (
        <div>
          <h1> Loading... </h1>{" "}
        </div>
      );
    }

    return <div> {this.props.children} </div>;
  }
}

export default Auth;
