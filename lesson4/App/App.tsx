import React from "react";
import { ConwayLife } from "./ConwayLife/ConwayLife";
import { ControlsForm } from "./Controls/ControlsForm";

export class App extends React.Component {
  render() {
    const f = (x: number, y: number) => console.log(`(${x}, ${y})`);

    return (
      <>
        <div>
          <ConwayLife
            cellSize={10}
            fieldWidth={30}
            fieldHeight={30}
            onClick={f}
            animationDelay={500}
          />
        </div>
        <div>
          <ControlsForm onChange={() => true} />
        </div>
      </>
    );
  }
}
