import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

interface MainProps {
  login: string;
}

export class Main extends React.Component<MainProps> {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" render={() => <div>root</div>} />
        <Route path="/caption" render={() => <div>caption</div>} />
      </BrowserRouter>
    );
  }
}
