import React, { MouseEventHandler } from "react";
import { StoreState } from "store/store";
import { connect } from "react-redux";
import { Dispatch } from "redux";

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
  return null;
};

const mapStateToProps = ({ username }: StoreState) => {
  return {
    username,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => {
      dispatch({ type: "USER_LOGOUT" });
    },
  };
};

export const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
