import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Login/Home";
import Login from "./Login/Login";
import Protected from "./Login/Protected";
import Auth from "./Login/Auth";
import Dashboard from "./Dashboard/Dashboard";
import "typeface-roboto";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Dashboard" component={Dashboard} />{" "}
        <Route path="/Login" component={Login} />{" "}
        <Route path="/" exact component={Home} />{" "}
        <Auth>
          <Route path="/Protected" component={Protected} />{" "}
        </Auth>{" "}
      </Switch>{" "}
    </BrowserRouter>
  );
}

export default App; // instead of "export default App;"
