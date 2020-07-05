import React from "react";
import { store } from "store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConnectedHeader } from "smart/User/Header";
import { ConnectedContent } from "smart/User/Content";

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

  render() {
    return (
      <>
        <Provider store={store}>
          <BrowserRouter>
            <ConnectedHeader />
            <ConnectedContent />
          </BrowserRouter>
        </Provider>
      </>
    );
  }
}
