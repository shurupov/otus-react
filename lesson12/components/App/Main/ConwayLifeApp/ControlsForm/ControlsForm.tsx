import React from "react";
import { StoreState, store } from "store/store";
import { Unsubscribe } from "redux";
import { changeSetting, initField } from "store/actionCreators";

export interface ControlsProps {
  onSubmit: Function;
}

export class ControlsForm extends React.Component<{}, StoreState> {
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
    store.dispatch(changeSetting(fieldName, value));
  };

  handleUpdateButtonClick = () => {
    store.dispatch(initField());
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
            value={this.state.fieldWidth.toString()}
            onChange={this.handleChange("fieldWidth")}
          />
        </label>
        <br />
        <label>
          По вертикали:
          <input
            type="number"
            value={this.state.fieldHeight.toString()}
            onChange={this.handleChange("fieldHeight")}
          />
        </label>
        <br />
        <label>
          Размер клетки:
          <input
            type="number"
            value={this.state.cellSize.toString()}
            onChange={this.handleChange("cellSize")}
          />
        </label>
        <br />
        <label>
          Задержка анимации:
          <input
            type="number"
            value={this.state.animationDelay.toString()}
            onChange={this.handleChange("animationDelay")}
          />
        </label>
        <br />
        <label>
          Процент живых клеток:
          <input
            type="number"
            value={this.state.alivePercent.toString()}
            onChange={this.handleChange("alivePercent")}
          />
        </label>
        <br />
        <label>
          Количество шагов анимации:
          <input
            type="number"
            value={this.state.animationStepsCount.toString()}
            onChange={this.handleChange("animationStepsCount")}
          />
        </label>
        <br />
        <input
          type="button"
          value="Обновить"
          onClick={this.handleUpdateButtonClick}
        />
      </form>
    );
  }
}
