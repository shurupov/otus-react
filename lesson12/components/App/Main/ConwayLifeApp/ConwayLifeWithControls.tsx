import React from "react";
import { ConwayLife } from "./ConwayLife/ConwayLife";
import { ControlsForm } from "./ControlsForm/ControlsForm";

export class ConwayLifeWithControls extends React.Component {
  render() {
    return (
      <>
        <div>
          <ConwayLife />
        </div>
        <div>
          <ControlsForm />
        </div>
      </>
    );
  }
}
