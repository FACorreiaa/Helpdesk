import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PrivateRoute from "./private/PrivateRoute";

import Dashboard from "./Dashboard/Dashboard";
import Signup from "./auth/Register";
import "typeface-roboto";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <PrivateRoute path="/Dashboard" component={Dashboard} />{" "}
          <Route path="/Login" component={Login} />{" "}
          <Route path="/" exact component={Login} />{" "}
          <Route path="/Register" exact component={Register} />{" "}
          <Route path="/Signup" component={Signup} />{" "}
        </Switch>{" "}
      </HashRouter>{" "}
    </Provider>
  );
}

export default App; // instead of "export default App;"
