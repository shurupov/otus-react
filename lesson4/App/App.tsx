import React from "react";
import { ConwayLife } from "./ConwayLife/ConwayLife";

export class App extends React.Component {
  render() {
    const f = (x: number, y: number) => console.log(`(${x}, ${y})`);

    return (
      <>
        <ConwayLife
          cellSize={10}
          fieldWidth={30}
          fieldHeight={30}
          onClick={f}
          cellAnimationDelay={300}
        />
      </>
    );
  }
}
