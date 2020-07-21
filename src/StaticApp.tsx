import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { ConnectedHeader } from "smart/User/Header";
import { App } from "./App";
import { StaticContent, StaticContentProps } from "smart/User/StaticContent";

export class StaticApp extends React.Component<StaticContentProps> {
  state = {
    loaded: false,
  };

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    if (this.state.loaded) {
      return <App />;
    } else {
      return (
        <Provider store={store}>
          <ConnectedHeader />
          <StaticContent {...this.props} />
        </Provider>
      );
    }
  }
}
