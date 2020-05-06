import React from "react";
import { ConwayLife } from "./ConwayLife/ConwayLife";
import { ControlsForm, ControlsState } from "./ControlsForm/ControlsForm";

export class App extends React.Component<{}, ControlsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cellSize: 10,
      fieldWidth: 30,
      fieldHeight: 30,
      animationDelay: 500,
      alivePart: 0.3,
    };
  }

  render() {
    const f = (x: number, y: number) => console.log(`(${x}, ${y})`);

    return (
      <>
        <div>
          <ConwayLife
            cellSize={this.state.cellSize}
            fieldWidth={this.state.fieldWidth}
            fieldHeight={this.state.fieldHeight}
            onClick={f}
            animationDelay={this.state.animationDelay}
            alivePart={this.state.alivePart}
          />
        </div>
        <div>
          <ControlsForm
            onChange={(state: ControlsState) => this.setState(state)}
          />
        </div>
      </>
    );
  }
}
