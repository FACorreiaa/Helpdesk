import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Protected from "./Protected";
import Auth from "./Auth";
import "typeface-roboto";
import Icon from "@material-ui/core/Icon";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Login" component={Login} />{" "}
        <Route path="/" exact component={Home} /> {/*<Auth history="teste">*/}
        <Auth>
          <Route path="/Protected" component={Protected} />{" "}
        </Auth>{" "}
      </Switch>{" "}
    </BrowserRouter>
  );
}

export default App;
