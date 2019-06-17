import React, { Component } from "react";
import Header from "../Header/Header";

export class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <>
        <Header />
      </>
    );
  }
}

export default Dashboard;
