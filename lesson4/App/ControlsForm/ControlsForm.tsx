import React from "react";

interface ControlsProps {
  onChange: Function;
}

export interface ControlsState {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  animationDelay: number;
}

export class ControlsForm extends React.Component<
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
    };

    this.widthChange = this.widthChange.bind(this);
    this.heightChange = this.heightChange.bind(this);
    this.cellSizeChange = this.cellSizeChange.bind(this);
    this.delayChange = this.delayChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onChange(this.state);
  }

  widthChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      ...this.state,
      fieldWidth: parseFloat(target.value),
    });
  }

  heightChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      ...this.state,
      fieldHeight: parseFloat(target.value),
    });
  }

  cellSizeChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      ...this.state,
      cellSize: parseFloat(target.value),
    });
  }

  delayChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      ...this.state,
      animationDelay: parseFloat(target.value),
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
        <input type="submit" value="Отправить" />
        <br />
      </form>
    );
  }
}
