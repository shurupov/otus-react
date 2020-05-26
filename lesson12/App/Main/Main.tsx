import React, { MouseEventHandler } from "react";
import { BrowserRouter, Route } from "react-router-dom";

interface MainProps {
  username: string;
  onLogout: MouseEventHandler;
}

export class Main extends React.Component<MainProps> {
  render() {
    return (
      <>
        <label>
          {this.props.username}&nbsp;
          <button onClick={this.props.onLogout}>Logout</button>
        </label>
        <BrowserRouter>
          <Route exact path="/" render={() => <div>root</div>} />
          <Route path="/caption" render={() => <div>caption</div>} />
        </BrowserRouter>
      </>
    );
  }
}
