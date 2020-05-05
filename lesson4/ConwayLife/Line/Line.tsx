import React from "react";
import { Cell } from "./Cell/Cell";

interface LineProps {
  cells: Array<boolean>;
  cellSize: number;
  onClick: Function;
  cellAnimationDelay: number;
}

export class Line extends React.Component<LineProps, any> {
  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
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
            coloured={c}
            size={this.props.cellSize}
            onClick={() => this.props.onClick(j)}
            animationDelay={this.props.cellAnimationDelay}
          />
        ))}
      </div>
    );
  }
}
