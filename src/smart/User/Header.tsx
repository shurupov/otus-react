import React, { MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "store/reducer";
import { sagaLogoutAction } from "smart/User/saga";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedLogin } from "smart/User/Login";

interface HeaderProps {
  username: string;
  logout: MouseEventHandler;
}

export const Header = (props: HeaderProps) => {
  if (props.username) {
    return (
      <label>
        Welcome, {props.username}&nbsp;
        <button onClick={props.logout}>Logout</button>
      </label>
    );
  }
  return <ConnectedLogin />;
};

const mapStateToProps = ({ user }: StoreState) => {
  return {
    username: user.username,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => {
      dispatch(sagaLogoutAction());
    },
  };
};

export const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
