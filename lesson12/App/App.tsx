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

  logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("authenticated");
    this.setState({
      authenticated: false,
      username: "",
    });
  };

  render() {
    return this.state.authenticated ? (
      <Main username={this.state.username} onLogout={this.logout} />
    ) : (
      <Login onLogin={this.authenticate} />
    );
  }
}
