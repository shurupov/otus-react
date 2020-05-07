import React from "react";
import { ConwayLife } from "./ConwayLife/ConwayLife";
import { ControlsForm, ControlsState } from "./ControlsForm/ControlsForm";

const f = (x: number, y: number) => console.log(`(${x}, ${y})`);

export class App extends React.Component<{}, ControlsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cellSize: 10,
      fieldWidth: 30,
      fieldHeight: 30,
      animationDelay: 500,
      alivePercent: 30,
    };
  }

  render() {
    return (
      <>
        <div>
          <ConwayLife
            cellSize={this.state.cellSize}
            fieldWidth={this.state.fieldWidth}
            fieldHeight={this.state.fieldHeight}
            onClick={f}
            animationDelay={this.state.animationDelay}
            alivePercent={this.state.alivePercent}
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
