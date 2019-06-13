import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { classes } from "../constants/footer";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

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

export default function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        {" "}
        <BottomNavigationAction label="IPCA @ 2019" />} />
      </BottomNavigation>
    </>
  );
}
