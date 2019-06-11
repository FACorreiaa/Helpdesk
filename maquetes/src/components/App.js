import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
