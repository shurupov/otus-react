import { ControlsProps, ControlsState } from "./ControlsForm";
import React from "react";
import { Field, Form, Formik } from "formik";

export class ControlsFormik extends React.Component<
  ControlsProps,
  ControlsState
> {
  constructor(props: ControlsProps) {
    super(props);
    this.state = {
      fieldWidth: 30,
      fieldHeight: 30,
      cellSize: 10,
      animationDelay: 2000,
      alivePercent: 30,
    };
  }

  render() {
    return (
      <Formik
        initialValues={this.state}
        onSubmit={(values) => this.props.onChange(values)}
      >
        <Form>
          <br />
          <label>
            По горизонтали:
            <Field type="number" name="fieldWidth" />
          </label>
          <br />
          <label>
            По вертикали:
            <Field type="number" name="fieldHeight" />
          </label>
          <br />
          <label>
            Размер клетки:
            <Field type="number" name="cellSize" />
          </label>
          <br />
          <label>
            Задержка анимации:
            <Field type="number" name="animationDelay" />
          </label>
          <br />
          <label>
            Процент живых клеток:
            <Field type="number" name="alivePercent" />
          </label>
          <br />
          <button type="submit">Обновить</button>
        </Form>
      </Formik>
    );
  }
}