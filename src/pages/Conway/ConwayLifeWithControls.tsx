import React from "react";
import { ConnectedConwayLife } from "smart/ConwayLife/ConwayLife";
import { ControlsForm } from "smart/ControlsForm/ControlsForm";

export class ConwayLifeWithControls extends React.Component {
  render() {
    return (
      <>
        <div>
          <ControlsForm />
        </div>
        <div>
          <ConnectedConwayLife />
        </div>
      </>
    );
  }
}
