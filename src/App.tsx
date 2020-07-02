import React from "react";
import { Login } from "components/Login/Login";
import { Main } from "components/Main/Main";

interface AppState {
  welcome: boolean;
  authenticated: boolean;
  username: string;
}

export class App extends React.Component<{}, AppState> {
  state = {
    welcome: false,
    authenticated: localStorage.getItem("authenticated") === "1",
    username: localStorage.getItem("username") || "",
  };

  authenticate = (username: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("authenticated", "1");
    this.setState({
      welcome: true,
      authenticated: true,
      username,
    });

    setTimeout(() => {
      this.setState({
        welcome: false,
      });
    }, 1000);
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
    if (this.state.welcome) {
      return <div>Welcome, {this.state.username}</div>;
    }
    return this.state.authenticated ? (
      <Main username={this.state.username} onLogout={this.logout} />
    ) : (
      <Login onLogin={this.authenticate} />
    );
  }
}
