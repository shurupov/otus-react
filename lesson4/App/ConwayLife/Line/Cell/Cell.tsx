import React, { CSSProperties } from "react";

interface CellProps {
  coloured: boolean;
  size: number;
  onClick: Function;
  animationDelay: number;
}

interface CellState {
  step: number;
  animated: boolean;
}

export class Cell extends React.Component<CellProps, CellState> {
  private lastColor: number;
  private readonly topColorValue: number;
  private readonly lastStepNumber: number;
  private timeoutId: NodeJS.Timeout | undefined;

  constructor(props: CellProps) {
    super(props);
    this.state = {
      step: 0,
      animated: true,
    };
    this.lastColor = !props.coloured ? 0 : 255;
    this.topColorValue = 255;
    this.lastStepNumber = 4;
  }

  getColor(): string {
    if (this.state.animated) {
      if (!this.props.coloured) {
        this.lastColor =
          this.topColorValue * (this.state.step / this.lastStepNumber);
      } else {
        this.lastColor =
          this.topColorValue * (1 - this.state.step / this.lastStepNumber);
      }
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

  componentDidUpdate(prevProps: Readonly<CellProps>): void {
    this.clearTimeout();
    this.timeoutId = setTimeout(() => {
      this.tick(false, prevProps);
    }, this.props.animationDelay);
  }

  private clearTimeout(): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  componentDidMount(): void {
    this.tick(true, this.props);
  }

  tick = (justMounted: boolean, prevProps: Readonly<CellProps>) => {
    if (justMounted || prevProps.coloured != this.props.coloured) {
      this.setState({
        step: 1,
        animated: true,
      });
    } else if (this.state.animated) {
      this.setState({
        step: this.state.step < this.lastStepNumber ? this.state.step + 1 : 0,
        animated: this.state.step < this.lastStepNumber,
      });
    }
  };
}
