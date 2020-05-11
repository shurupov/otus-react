import React, { CSSProperties } from "react";

interface CellProps {
  alive: boolean;
  step: number;
  animated: boolean;
  size: number;
  onClick: Function;
  stepsCount: number;
}
export interface PoorCellProps {
  alive: boolean;
  step: number;
  animated: boolean;
}

export class Cell extends React.Component<CellProps> {
  private lastColor: number;
  private readonly topColorValue: number = 255;

  constructor(props: CellProps) {
    super(props);
    this.lastColor = !props.alive ? 0 : 255;
  }

  getColor(): string {
    if (this.props.animated) {
      if (!this.props.alive) {
        this.lastColor =
          this.topColorValue * (this.props.step / this.props.stepsCount);
      } else {
        this.lastColor =
          this.topColorValue * (1 - this.props.step / this.props.stepsCount);
      }
    } else {
      this.lastColor = this.props.alive ? 0 : this.topColorValue;
    }
    return `rgb(${this.lastColor},${this.lastColor},${this.lastColor})`;
  }

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
    const style: CSSProperties = {
      width: this.props.size,
      height: this.props.size,
      backgroundColor: this.getColor(),
      marginRight: 1,
      marginTop: 1,
      float: "left",
    };
    return (
      <div
        className="cell"
        onClick={() => this.props.onClick()}
        style={style}
      />
    );
  }
}
