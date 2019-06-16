import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./Login/Home";
import Login from "./auth/Login";
import Protected from "./Login/Protected";
import Auth from "./Login/Auth";
import Dashboard from "./Dashboard/Dashboard";
import Signup from "./auth/Register";
import "typeface-roboto";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/Dashboard" component={Dashboard} />{" "}
        <Route path="/Login" component={Login} />{" "}
        <Route path="/" exact component={Home} />{" "}
        <Route path="/Signup" component={Signup} />
        <Auth>
          <Route path="/Protected" component={Protected} />{" "}
        </Auth>{" "}
      </Switch>{" "}
    </HashRouter>
  );
}

export default App; // instead of "export default App;"
