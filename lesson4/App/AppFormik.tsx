import { ControlsState } from "./ControlsForm/ControlsForm";
import React from "react";
import { ConwayLife } from "./ConwayLife/ConwayLife";
import { ControlsFormik } from "./ControlsForm/ControlsFormik";

export class AppFormik extends React.Component<{}, ControlsState> {
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
            alivePercent={this.state.alivePercent}
          />
        </div>
        <div>
          <ControlsFormik
            onChange={(state: ControlsState) => this.setState(state)}
          />
        </div>
      </>
    );
  }
}
