/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { MouseEventHandler } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { News } from "./News/News";
import { ConwayLifeWithControls } from "./ConwayLifeApp/ConwayLifeWithControls";

interface MainProps {
  username: string;
}

export class Main extends React.Component<MainProps> {
  render() {
    return (
      <div>
        <div
          css={{
            marginTop: 5,
            borderTop: "4px gray solid",
          }}
        >
          <Link to="/">Top</Link>
          <br />
          <Link to="/life">Conway Life</Link>
          <br />
          <Link to="/news">News</Link>
          <br />
          <Link to="/news/1">Text 1</Link>
          <br />
          <Link to="/news/2">Text 2</Link>
          <br />

          <Route exact path="/" render={() => <h1>Root</h1>} />
          <Route path="/news" component={News} />
          <Route path="/life" component={ConwayLifeWithControls} />
        </div>
      </div>
    );
  }
}
