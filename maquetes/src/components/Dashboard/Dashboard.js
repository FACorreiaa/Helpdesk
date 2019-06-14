import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "@material-ui/core/Container";

export class Dashboard extends Component {
  render() {
    return (
      <>
        <Header />
        <Footer />
      </>
    );
  }
}

export default Dashboard;
