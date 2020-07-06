import React, { MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { loginSlice } from "smart/User/Login";
import { StoreState } from "store/reducer";

interface HeaderProps {
  username: string;
  logout: MouseEventHandler;
}

export class Header extends React.Component<HeaderProps> {
  render() {
    if (this.props.username) {
      return (
        <label>
          Welcome, {this.props.username}&nbsp;
          <button onClick={this.props.logout}>Logout</button>
        </label>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ user }: StoreState) => {
  return {
    username: user.username,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => {
      dispatch(loginSlice.actions.logout());
    },
  };
};

export const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
