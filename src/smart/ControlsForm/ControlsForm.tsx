import React, { MouseEventHandler } from "react";
import { StoreState, store, ConwaySettings } from "store/store";
import { bindActionCreators, Dispatch, Unsubscribe } from "redux";
import { initField, sagaChangeSetting } from "store/actionCreators";
import { connect } from "react-redux";

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
  return bindActionCreators(
    {
      changeSetting: sagaChangeSetting,
      update: initField,
    },
    dispatch
  );
};

export const ConnectedControlsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsForm);
