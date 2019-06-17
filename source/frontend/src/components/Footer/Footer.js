import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"For "}
      <Link color="inherit" href="https://material-ui.com/">
        Programação Web
      </Link>
      {" team."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "10vh"
  },

  footer: {
    padding: theme.spacing(0),
    marginTop: "auto",
    backgroundColor: "#3f51b5"
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1"> IPCA 2019 @ MEI </Typography>{" "}
            <MadeWithLove />
          </Container>{" "}
        </footer>{" "}
      </div>{" "}
    </>
  );
}
