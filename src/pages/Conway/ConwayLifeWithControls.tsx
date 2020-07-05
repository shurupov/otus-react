import React from "react";
import { ConnectedConwayLife } from "smart/ConwayLife/ConwayLife";
import { ConnectedControlsForm } from "smart/ControlsForm/ControlsForm";

export class ConwayLifeWithControls extends React.Component {
  render() {
    return (
      <>
        <div>
          <ConnectedControlsForm />
        </div>
        <div>
          <ConnectedConwayLife />
        </div>
      </>
    );
  }
}
