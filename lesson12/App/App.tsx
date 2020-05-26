import React from "react";
import { Login } from "./Login/Login";
import { Main } from "./Main/Main";

interface AppState {
  authenticated: boolean;
  username: string;
}

export class App extends React.Component<never, AppState> {
  constructor(props: never) {
    super(props);
    this.state = {
      authenticated: localStorage.getItem("authenticated") === "1",
      username: localStorage.getItem("username") || "",
    };
  }

  authenticate = (username: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("authenticated", "1");
    this.setState({
      authenticated: true,
      username: username,
    });
  };

  render() {
    return this.state.authenticated ? (
      <Main login={this.state.username} />
    ) : (
      <Login onLogin={this.authenticate} />
    );
  }
}
