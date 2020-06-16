/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { ReactNode } from "react";
import { Cell, PoorCellProps } from "./Cell/Cell";
import { StoreState } from "store/store";
import { connect } from "react-redux";

interface ConwayLifeState {
  cells: Array<Array<PoorCellProps>>;
}

export class ConwayLife extends React.Component<StoreState, ConwayLifeState> {
  private timeoutId!: NodeJS.Timeout;

  state = {
    cells: [],
  };

  initField(): Array<Array<PoorCellProps>> {
    const cells: Array<Array<PoorCellProps>> = [];
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

  componentWillReceiveProps(nextProps: Readonly<StoreState>) {
    console.log("ConwayLife updated");
    if (nextProps.reinitField) {
      this.setState({ cells: this.initField() });
    }
  }

  componentDidMount(): void {
    this.setState({ cells: this.initField() });
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

  process = (oldField: Array<Array<PoorCellProps>>) => {
    const newField: Array<Array<PoorCellProps>> = [];
    for (let i = 0; i < this.props.fieldHeight; i++) {
      newField[i] = [];
      for (let j = 0; j < this.props.fieldWidth; j++) {
        const newFieldAlive: boolean = this.getNextGeneration(oldField, i, j);
        const oldFieldCell: PoorCellProps = oldField[i][j];
        newField[i][j] = {
          alive: newFieldAlive,
          step:
            newFieldAlive !== oldFieldCell.alive || !oldFieldCell.animated
              ? 0
              : oldFieldCell.step + 1,
          animated:
            newFieldAlive !== oldFieldCell.alive ||
            oldFieldCell.animated ||
            oldFieldCell.step < this.props.animationStepsCount,
        };
      }
    }
    return newField;
  };

  getNextGeneration = (
    oldField: Array<Array<PoorCellProps>>,
    i: number,
    j: number
  ): boolean => {
    const currentCellLife = oldField[i][j] && oldField[i][j].alive;
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

  render(): ReactNode {
    return (
      <div
        className="conway-life"
        css={{
          clear: "both",
        }}
      >
        {this.state.cells.map((l: Array<PoorCellProps>, i) => (
          <div
            key={"l-" + i.toString()}
            className="line"
            css={{
              clear: "both",
            }}
          >
            {l.map((c, j) => (
              <Cell
                key={"c-" + i.toString() + "-" + j.toString()}
                {...c}
                size={this.props.cellSize}
                stepsCount={this.props.animationStepsCount}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  console.log("mapStateToProps");
  return state;
};

export const ConnectedConwayLife = connect(mapStateToProps)(ConwayLife);
