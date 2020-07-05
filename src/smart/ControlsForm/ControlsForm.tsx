import React, { MouseEventHandler } from "react";
import { StoreState, store, ConwaySettings } from "store/store";
import { Dispatch, Unsubscribe } from "redux";
import { initField, sagaChangeSetting } from "store/actionCreators";
import { connect } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { ConwayLifeAction } from "store/reducer";
import {actionTypes} from "store/actioTypes";

interface ControlsFormProps extends ConwaySettings {
  changeSetting: Function;
  update: MouseEventHandler;
}

export class ControlsForm extends React.Component<
  ControlsFormProps,
  StoreState
> {
  private unsubscribe!: Unsubscribe;
  state = store.getState();

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = (fieldName: string) => (event: React.FormEvent) => {
    const target = event.target as HTMLFormElement;
    if (target.value === "") {
      return;
    }
    const value: number = parseFloat(target.value);
    this.props.changeSetting(fieldName, value);
  };

  render() {
    return (
      <form
        style={{
          clear: "both",
        }}
      >
        <br />
        <label>
          По горизонтали:
          <input
            type="number"
            value={this.props.fieldWidth.toString()}
            onChange={this.handleChange("fieldWidth")}
          />
        </label>
        <br />
        <label>
          По вертикали:
          <input
            type="number"
            value={this.props.fieldHeight.toString()}
            onChange={this.handleChange("fieldHeight")}
          />
        </label>
        <br />
        <label>
          Размер клетки:
          <input
            type="number"
            value={this.props.cellSize.toString()}
            onChange={this.handleChange("cellSize")}
          />
        </label>
        <br />
        <label>
          Задержка анимации:
          <input
            type="number"
            value={this.props.animationDelay.toString()}
            onChange={this.handleChange("animationDelay")}
          />
        </label>
        <br />
        <label>
          Процент живых клеток:
          <input
            type="number"
            value={this.props.alivePercent.toString()}
            onChange={this.handleChange("alivePercent")}
          />
        </label>
        <br />
        <label>
          Количество шагов анимации:
          <input
            type="number"
            value={this.props.animationStepsCount.toString()}
            onChange={this.handleChange("animationStepsCount")}
          />
        </label>
        <br />
        <input type="button" value="Обновить" onClick={this.props.update} />
      </form>
    );
  }
}

const mapStateToProps = (state: StoreState): ConwaySettings => {
  return state.conwaySettings;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeSetting: (fieldName: string, value: number) => {
      dispatch(sagaChangeSetting(fieldName, value));
    },
    update: () => {
      dispatch(initField());
    },
  };
};

export const ConnectedControlsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsForm);

export const controlFormSlice = createSlice({
  name: "conway",
  initialState: {
    conwaySettings: {
      fieldWidth: 20,
      fieldHeight: 20,
      cellSize: 10,
      animationDelay: 50,
      alivePercent: 30,
      animationStepsCount: 4,
      reinitField: false,
      initialized: false,
    },
  },
  reducers: {
    [actionTypes.INIT_FIELD]: (state: StoreState) => {
      state.conwaySettings.reinitField = true;
      return state;
    },
    [actionTypes.INIT_FIELD_PERFORMED]: (state) => {
      state.conwaySettings.reinitField = false;
      return state;
    },
    [actionTypes.CHANGE_SETTING]: (
      state: StoreState,
      action: ConwayLifeAction
    ) => {
      if (!action.payload || !action.payload.value) {
        return state;
      }
      if (action.payload.field) {
        const fieldName = action.payload.field;
        state.conwaySettings[fieldName] = action.payload.value;
        state.conwaySettings.reinitField =
          fieldName === "fieldHeight" ||
          fieldName === "fieldWidth" ||
          fieldName === "alivePercent";
        return state;
      }
      return state;
    },
  },
});
