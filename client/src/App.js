import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Articles from "./pages/Articles";

const App = () =>
<Router>
  <div>
    <Switch>
      <Route exact path="/" component={Articles} />
      <Route exact path="/articles" component={Articles} />
    </Switch>
  </div>
</Router>;

export default App;