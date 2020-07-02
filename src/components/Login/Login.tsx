import React from "react";
import { Field, Form, Formik } from "formik";

interface LoginProps {
  onLogin: Function;
}

interface LoginFormValues {
  username: string;
}

export class Login extends React.Component<LoginProps> {
  private readonly initialValues: LoginFormValues = {
    username: "",
  };

  login = (values: LoginFormValues) => {
    this.props.onLogin(values.username);
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
