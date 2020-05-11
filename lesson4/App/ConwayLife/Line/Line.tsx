import React from "react";
import { Cell } from "./Cell/Cell";

interface LineProps {
  cells: Array<CellProps>;
  cellSize: number;
  onClick: Function;
  cellAnimationDelay: number;
}

export interface CellProps {
  alive: boolean;
  step: number;
  animated: boolean;
}

export class Line extends React.Component<LineProps> {
  render():
    | React.ReactElement
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <div
        className="line"
        style={{
          clear: "both",
        }}
      >
        {this.props.cells.map((c, j) => (
          <Cell
            key={j.toString()}
            {...c}
            size={this.props.cellSize}
            onClick={() => this.props.onClick(j)}
            stepsCount={4}
          />
        ))}
      </div>
    );
  }
}
