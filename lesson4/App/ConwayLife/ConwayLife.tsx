import React from "react";
import { Line } from "./Line/Line";

interface ConwayLifeProps {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  onClick: Function;
  animationDelay: number;
}

interface ConwayLifeState {
  cells: Array<Array<boolean>>;
}

export class ConwayLife extends React.Component<
  ConwayLifeProps,
  ConwayLifeState
> {
  private intervalId: NodeJS.Timeout | undefined;

  constructor(props: ConwayLifeProps) {
    super(props);
    this.state = {
      cells: this.initField(),
    };
    this.process.bind(this);
    this.tick.bind(this);
    this.getNextGeneration.bind(this);
  }

  initField(): Array<Array<boolean>> {
    const cells: Array<Array<boolean>> = [];
    for (let i = 0; i < this.props.fieldHeight; i++) {
      cells[i] = [];
      for (let j = 0; j < this.props.fieldWidth; j++) {
        cells[i][j] = Math.random() > 0.7;
      }
    }
    return cells;
  }

  componentDidUpdate(prevProps: Readonly<ConwayLifeProps>): void {
    if (
      prevProps.fieldHeight !== this.props.fieldHeight ||
      prevProps.fieldWidth !== this.props.fieldWidth
    ) {
      this.setState({
        cells: this.initField(),
      });
    }
  }

  componentDidMount(): void {
    this.intervalId = setInterval(() => {
      this.tick();
    }, this.props.animationDelay);
  }

  componentWillUnmount(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }

  public tick() {
    this.setState((state) => {
      return {
        cells: this.process(state.cells),
      };
    });
  }

  process(oldField: Array<Array<boolean>>): Array<Array<boolean>> {
    const newField: Array<Array<boolean>> = [];
    for (let i = 0; i < this.props.fieldHeight; i++) {
      newField[i] = [];
      for (let j = 0; j < this.props.fieldWidth; j++) {
        newField[i][j] = this.getNextGeneration(oldField, i, j);
      }
    }
    return newField;
  }

  public getNextGeneration(
    oldField: Array<Array<boolean>>,
    i: number,
    j: number
  ): boolean {
    const currentCellLife = oldField[i][j];
    let countOfNearLives = 0;
    for (
      let i1 = i === 0 ? i : i - 1;
      i1 <= (i === oldField.length - 1 ? i : i + 1);
      i1++
    ) {
      for (
        let j1 = j === 0 ? j : j - 1;
        j1 <= (j === oldField[i1].length - 1 ? j : j + 1);
        j1++
      ) {
        if (i1 === i && j1 === j) {
          continue;
        }
        if (oldField[i1][j1]) {
          countOfNearLives++;
        }
      }
    }

    if (currentCellLife) {
      return countOfNearLives > 1 && countOfNearLives < 4;
    } else return countOfNearLives === 3;
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
    return (
      <div className="conway-life">
        {this.state.cells.map((l, i) => (
          <Line
            key={i.toString()}
            cells={l}
            cellSize={this.props.cellSize}
            onClick={(j: number) => this.props.onClick(j, i)}
            cellAnimationDelay={this.props.animationDelay}
          />
        ))}
      </div>
    );
  }
}
