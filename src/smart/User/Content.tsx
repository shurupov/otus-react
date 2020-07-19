import React from "react";
import { Link, Route } from "react-router-dom";
import { News } from "pages/News/News";
import { ConwayLifeWithControls } from "pages/Conway/ConwayLifeWithControls";
import { connect } from "react-redux";
import { StoreState } from "store/reducer";
import { NewsText } from "pages/News/NewsText/NewsText";

interface ContentProps {
  username: string;
}

export const Content = (props: ContentProps) => {
  return (
    <div
      css={{
        marginTop: 5,
        borderTop: "4px gray solid",
      }}
    >
      <Link to="/">Top</Link>
      {props.username ? (
        <>
          <br />
          <Link to="/life">Conway Life</Link>
        </>
      ) : null}
      <br />
      <Link to="/news">News</Link>
      <br />
      <Link to="/news/1">Text 1</Link>
      <br />
      <Link to="/news/2">Text 2</Link>
      <br />

      <Route exact path="/" render={() => <h1>Root</h1>} />
      <Route exact path="/news/:newsid" component={NewsText} />
      <Route exact path="/news" component={News} />
      {props.username ? (
        <Route path="/life" component={ConwayLifeWithControls} />
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ user }: StoreState) => {
  return {
    username: user.username,
  };
};

export const ConnectedContent = connect(mapStateToProps)(Content);
