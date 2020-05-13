/* All librarys */
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Participant from "./pages/Participant";
import Login from './pages/Login';
import Evaluator from "./pages/Evaluator";
import PrivateRoute from './components/PrivateRoute'

/* CSS */
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/acessar" exact component={Login}></Route>
          <PrivateRoute path="/participante" exact component={Participant}></PrivateRoute>
          <PrivateRoute path="/avaliador" exact component={Evaluator}></PrivateRoute>
          <Route path="*" component={() => (<h1 className="text-center my-5">Página não encontrada</h1>)}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
