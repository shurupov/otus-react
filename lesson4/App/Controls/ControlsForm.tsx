import React from "react";

interface ControlsProps {
  onChange: Function;
}

interface ControlsState {
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
      fieldWidth: 15,
      fieldHeight: 15,
      cellSize: 10,
      animationDelay: 500,
    };

    this.widthChange = this.widthChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  widthChange(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    this.setState({
      ...this.state,
      fieldWidth: parseFloat(target.value),
    });
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(this.state);
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
            type="text"
            value={this.state.fieldWidth.toString()}
            onChange={this.widthChange}
          />
        </label>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}
