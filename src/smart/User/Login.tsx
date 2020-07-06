import React from "react";
import { Field, Form, Formik } from "formik";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
  },
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      console.log(action);
      return {
        ...state,
        username: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        username: "",
      };
    },
  },
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    login: (username: string) => {
      dispatch(loginSlice.actions.login(username));
    },
  };
};

export const ConnectedLogin = connect(null, mapDispatchToProps)(Login);
