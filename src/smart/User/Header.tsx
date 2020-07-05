import React, { MouseEventHandler } from "react";
import { StoreState } from "store/store";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface HeaderProps {
  username: string;
  logout: MouseEventHandler;
}

export class Header extends React.Component<HeaderProps> {
  render() {
    console.log(this.props);

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
