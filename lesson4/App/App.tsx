import React from "react";
import { ConwayLife } from "./ConwayLife/ConwayLife";
import { ControlsForm, ControlsState } from "./ControlsForm/ControlsForm";

const f = (x: number, y: number) => console.log(`(${x}, ${y})`);

export class App extends React.Component<{}, ControlsState> {
  constructor(props: {}) {
    super(props);
    this.state = ControlsForm.defaultState;
  }

  render() {
    return (
      <>
        <div>
          <ConwayLife {...this.state} onClick={f} />
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
