import React from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { News } from "components/Main/News/News";
import { ConwayLifeWithControls } from "components/Main/ConwayLifeApp/ConwayLifeWithControls";
import { jsx } from "@emotion/core";
import { ConnectedLogin } from "components/Login/Login";
import { StoreState } from "store/store";
import { connect } from "react-redux";

interface ContentProps {
  username: string;
}

export class Content extends React.Component<ContentProps> {
  render() {
    console.log(this.props);

    if (this.props.username) {
      return (
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

          <Route exact path="/login" render={() => <ConnectedLogin />} />
          <Route exact path="/" render={() => <h1>Root</h1>} />

          <Route path="/news" component={News} />
          <Route path="/life" component={ConwayLifeWithControls} />
        </div>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/login" component={ConnectedLogin} />
          <Route path="/*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      );
    }
  }
}

const mapStateToProps = ({ username }: StoreState) => {
  return {
    username,
  };
};

export const ConnectedContent = connect(mapStateToProps)(Content);
