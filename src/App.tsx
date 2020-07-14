import React from "react";
import { store } from "store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConnectedHeader } from "smart/User/Header";
import { ConnectedContent } from "smart/User/Content";

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ConnectedHeader />
          <ConnectedContent />
        </BrowserRouter>
      </Provider>
    );
  }
}
