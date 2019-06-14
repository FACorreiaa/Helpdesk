import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Link from "@material-ui/core/Link";
import Global from "../Dashboard/Global";
import Produto from "../Dashboard/Produto";
import Colaborador from "../Dashboard/Colaborador";
import Temporais from "../Dashboard/Temporais";
import CSSTransitionGroup from "react-addons-css-transition-group";
import { Paper } from "@material-ui/core";

import { classes } from "../constants/tabs";

function TabContainer(props) {
  return (
    <Typography
      component="div"
      style={{
        padding: 8 * 3
      }}
    >
      {" "}
      {props.children}{" "}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

//const sections = ["Indicador 1", "Indicador 2", "Indicador 2", "Indicador 2"];

const PageShell = (Page, previous) => {
  return props => (
    <div className="page">
      <CSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
        transitionName={props.match.path === "/one" ? "SlideIn" : "SlideOut"}
      >
        {console.log(props)} <Page {...props} />{" "}
      </CSSTransitionGroup>{" "}
    </div>
  );
};

export default function Header() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Tabs value={value} onChange={handleChange} centered>
          {" "}
          {/* <Tabs value={value} onChange={handleChange}>
                {sections.map(section => (
                  <Tab label={section} />
                ))}
              </Tabs> */}{" "}
          <Tab label="Indicadores Globais" />
          <Tab label="Indicadores Colaboradores" />
          <Tab label="Indicadores Produto" />
          <Tab label="Indicadores Temporais" />
        </Tabs>{" "}
      </AppBar>{" "}
      {value === 0 && (
        <TabContainer>
          <Container maxWidth="sm">
            <Global />
          </Container>{" "}
        </TabContainer>
      )}{" "}
      {value === 1 && (
        <TabContainer>
          <Container maxWidth="sm">
            <Colaborador />
          </Container>
        </TabContainer>
      )}{" "}
      {value === 2 && (
        <TabContainer>
          <Container maxWidth="lg">
            <Produto />
          </Container>
        </TabContainer>
      )}{" "}
      {value === 3 && (
        <TabContainer>
          <Container maxWidth="xl">
            <Temporais />
          </Container>
        </TabContainer>
      )}{" "}
    </div>
  );
}
