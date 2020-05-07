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

    this.widthChange = this.widthChange.bind(this);
    this.heightChange = this.heightChange.bind(this);
    this.cellSizeChange = this.cellSizeChange.bind(this);
    this.delayChange = this.delayChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alivePartChange = this.alivePartChange.bind(this);
  }

  componentDidMount() {
    this.props.onChange(this.state);
  }

  widthChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      fieldWidth: parseFloat(target.value),
    });
  }

  heightChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      fieldHeight: parseFloat(target.value),
    });
  }

  cellSizeChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      cellSize: parseFloat(target.value),
    });
  }

  delayChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      animationDelay: parseFloat(target.value),
    });
  }

  alivePartChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      ...this.state,
      alivePercent: parseFloat(target.value),
    });
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    this.props.onChange(this.state);
  }

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
            onChange={this.widthChange}
          />
        </label>
        <br />
        <label>
          По вертикали:
          <input
            type="number"
            value={this.state.fieldHeight.toString()}
            onChange={this.heightChange}
          />
        </label>
        <br />
        <label>
          Размер клетки:
          <input
            type="number"
            value={this.state.cellSize.toString()}
            onChange={this.cellSizeChange}
          />
        </label>
        <br />
        <label>
          Задержка анимации:
          <input
            type="number"
            value={this.state.animationDelay.toString()}
            onChange={this.delayChange}
          />
        </label>
        <br />
        <label>
          Процент живых клеток:
          <input
            type="number"
            value={this.state.alivePercent.toString()}
            onChange={this.alivePartChange}
          />
        </label>
        <br />
        <input type="submit" value="Обновить" />
      </form>
    );
  }
}
