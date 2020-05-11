import { ControlsForm, ControlsState } from "./ControlsForm/ControlsForm";
import React from "react";
import { ConwayLife } from "./ConwayLife/ConwayLife";
import { ControlsFormik } from "./ControlsForm/ControlsFormik";

const f = (x: number, y: number) => console.log(`(${x}, ${y})`);

export class AppFormik extends React.Component<{}, ControlsState> {
  state = ControlsForm.defaultState;

  render() {
    return (
      <>
        <div>
          <ConwayLife {...this.state} onClick={f} />
        </div>
        <div>
          <ControlsFormik
            onSubmit={(state: ControlsState) => this.setState(state)}
          />
        </div>
      </>
    );
  }
}
