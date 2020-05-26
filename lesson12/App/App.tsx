import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Login } from "./Login/Login";
import { Main } from "./Main/Main";

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/caption" render={() => <div>caption</div>} />
        <Route path="/main" component={Main} />
      </BrowserRouter>
    );
  }
}
