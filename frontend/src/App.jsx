/* All librarys */
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Participant from "./pages/Participant";
import Login from './pages/Login';
import Evaluator from "./pages/Evaluator";

/* CSS */
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login}></Route>
          <Route path="/participant" exact component={Participant}></Route>
          <Route path="/evaluator" exact component={Evaluator}></Route>
          <Route path="*" component={() => (<h1 className="text-center my-5">Página não encontrada</h1>)}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
