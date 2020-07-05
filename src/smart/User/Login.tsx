import React from "react";
import { Field, Form, Formik } from "formik";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "store/store";
import {actionTypes} from "store/actioTypes";

interface LoginProps {
  login: Function;
}

interface LoginFormValues {
  username: string;
}

export class Login extends React.Component<LoginProps> {
  private readonly initialValues: LoginFormValues = {
    username: "",
  };

  login = (values: LoginFormValues) => {
    this.props.login(values.username);
  };

  render() {
    return (
      <Formik
        onSubmit={(values: LoginFormValues) => this.login(values)}
        initialValues={this.initialValues}
      >
        <Form>
          <label>
            Login:
            <Field type="string" name="username" />
            <button type="submit">Login</button>
          </label>
        </Form>
      </Formik>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    login: (username: string) => {
      dispatch({ type: actionTypes.USER_LOGIN, payload: username });
    },
  };
};

export const ConnectedLogin = connect(null, mapDispatchToProps)(Login);

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
  },
  reducers: {
    [actionTypes.USER_LOGIN]: (
      state: StoreState,
      action: PayloadAction<string>
    ) => {
      console.log(action);
      return {
        ...state,
        username: action.payload,
      };
    },
    [actionTypes.USER_LOGOUT]: (state: StoreState) => {
      return {
        ...state,
        username: "",
      };
    },
  },
});
