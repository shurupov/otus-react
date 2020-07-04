import React from "react";
import { ConnectedConwayLife } from "./ConwayLife/ConwayLife";
import { ControlsForm } from "./ControlsForm/ControlsForm";
import { Provider } from "react-redux";
import { store } from "store/store";

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
