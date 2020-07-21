import React from "react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { ConnectedHeader } from "smart/User/Header";
import { App } from "./App";
import { StaticRouter } from "react-router-dom";
import { ConnectedContent } from "smart/User/Content";

interface StaticAppProps {
  uri: string;
}

export class StaticApp extends React.Component<StaticAppProps> {
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
          <StaticRouter location={this.props.uri}>
            <ConnectedHeader />
            <ConnectedContent />
          </StaticRouter>
        </Provider>
      );
    }
  }
}
