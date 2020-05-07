import React from "react";

export interface ControlsProps {
  onChange: Function;
}

export interface ControlsState {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  animationDelay: number;
  alivePercent: number;
}

export class ControlsForm extends React.Component<
  ControlsProps,
  ControlsState
> {
  public static readonly defaultState: ControlsState = {
    fieldWidth: 30,
    fieldHeight: 30,
    cellSize: 10,
    animationDelay: 2000,
    alivePercent: 30,
  };

  constructor(props: ControlsProps) {
    super(props);
    this.state = ControlsForm.defaultState;
  }

  componentDidMount() {
    this.props.onChange(this.state);
  }

  handleChange = (fieldName: string) => (event: React.FormEvent) => {
    const target = event.target as HTMLFormElement;
    const value: number = parseFloat(target.value);
    switch (fieldName) {
      case "width":
        this.setState({ fieldWidth: value });
        break;
      case "height":
        this.setState({ fieldHeight: value });
        break;
      case "cellSize":
        this.setState({ cellSize: value });
        break;
      case "animationDelay":
        this.setState({ animationDelay: value });
        break;
      case "alivePercent":
        this.setState({ alivePercent: value });
        break;
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onChange(this.state);
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          clear: "both",
        }}
      >
        <label>
          По горизонтали:
          <input
            type="number"
            value={this.state.fieldWidth.toString()}
            onChange={this.handleChange("width")}
          />
        </label>
        <br />
        <label>
          По вертикали:
          <input
            type="number"
            value={this.state.fieldHeight.toString()}
            onChange={this.handleChange("height")}
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
        <input type="submit" value="Обновить" />
      </form>
    );
  }
}
