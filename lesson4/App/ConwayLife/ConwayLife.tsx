import React from "react";
import {CellProps, Line} from "./Line/Line";

interface ConwayLifeProps {
  fieldWidth: number;
  fieldHeight: number;
  cellSize: number;
  onClick: Function;
  animationDelay: number;
  alivePercent: number;
}

interface ConwayLifeState {
  cells: Array<Array<CellProps>>;
}

export class ConwayLife extends React.Component<
  ConwayLifeProps,
  ConwayLifeState
> {
  private timeoutId: NodeJS.Timeout | undefined;

  state = {
    cells: this.initField(),
  };

  initField(): Array<Array<CellProps>> {
    const cells: Array<Array<CellProps>> = [];
    for (let i = 0; i < this.props.fieldHeight; i++) {
      cells[i] = [];
      for (let j = 0; j < this.props.fieldWidth; j++) {
        cells[i][j] = {
          alive: Math.random() < this.props.alivePercent / 100,
          animated: false,
          step: 0,
        };
      }
    }
    return cells;
  }

  componentDidUpdate(prevProps: Readonly<ConwayLifeProps>): void {
    if (
      prevProps.fieldHeight !== this.props.fieldHeight ||
      prevProps.fieldWidth !== this.props.fieldWidth ||
      prevProps.alivePercent !== this.props.alivePercent
    ) {
      this.setState({
        cells: this.initField(),
      });
    }
  }

  componentDidMount(): void {
    this.tick();
  }

  componentWillUnmount(): void {
    this.clearTimeout();
  }

  private clearTimeout(): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
    }
  }

  tick = () => {
    this.setState((state) => {
      return {
        cells: this.process(state.cells),
      };
    });
    this.clearTimeout();
    this.timeoutId = setTimeout(() => {
      this.tick();
    }, this.props.animationDelay);
  };

  process = (oldField: Array<Array<CellProps>>) => {
    const newField: Array<Array<CellProps>> = [];
    for (let i = 0; i < this.props.fieldHeight; i++) {
      newField[i] = [];
      for (let j = 0; j < this.props.fieldWidth; j++) {
        const newFieldAlive: boolean = this.getNextGeneration(oldField, i, j);
        const oldFieldCell: CellProps = oldField[i][j];
        newField[i][j] = {
          alive: newFieldAlive,
          step: newFieldAlive !== oldFieldCell.alive || !oldFieldCell.animated ?  0 : oldFieldCell.step + 1,
          animated: newFieldAlive !== oldFieldCell.alive || (oldFieldCell.animated || oldFieldCell.step < 4),
        };
      }
    }
    return newField;
  };

  getNextGeneration = (
    oldField: Array<Array<CellProps>>,
    i: number,
    j: number
  ): boolean => {
    const currentCellLife = oldField[i][j].alive;
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
        if (oldField[i1][j1].alive) {
          countOfNearLives++;
        }
      }
    }

    if (currentCellLife) {
      return countOfNearLives > 1 && countOfNearLives < 4;
    } else return countOfNearLives === 3;
  };

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
        className="conway-life"
        style={{
          clear: "both",
        }}
      >
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
