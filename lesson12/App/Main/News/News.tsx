import React from "react";
import { Switch, Route } from "react-router-dom";
import { NewsText } from "./NewsText/NewsText";

export class News extends React.Component {
  render() {
    return (
      <div>
        <h1>News</h1>
        <Switch>
          <Route exact path="/news/:newsid" component={NewsText} />
        </Switch>
      </div>
    );
  }
}
