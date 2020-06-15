/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { ReactNode } from "react";
import { Cell, PoorCellProps } from "./Cell/Cell";
import { store, StoreState } from "store/store";
import { Unsubscribe } from "redux";
import { initFieldPerformed } from "store/actionCreators";
import { defaultState } from "store/reducer";

interface ConwayLifeState extends StoreState {
  cells: Array<Array<PoorCellProps>>;
}

export class ConwayLife extends React.Component<{}, ConwayLifeState> {
  private timeoutId!: NodeJS.Timeout;
  private unsubscribe!: Unsubscribe;

  state = {
    ...defaultState,
    cells: [],
  };

  initField(): Array<Array<PoorCellProps>> {
    const cells: Array<Array<PoorCellProps>> = [];
    for (let i = 0; i < this.state.fieldHeight; i++) {
      cells[i] = [];
      for (let j = 0; j < this.state.fieldWidth; j++) {
        cells[i][j] = {
          alive: Math.random() < this.state.alivePercent / 100,
          animated: false,
          step: 0,
        };
      }
    }
    return cells;
  }

  componentDidMount(): void {
    this.setState({ cells: this.initField() });
    this.tick();
    this.unsubscribe = store.subscribe(() => {
      if (store.getState().reinitField) {
        this.setState(
          {
            ...store.getState(),
          },
          () => {
            this.setState({
              cells: this.initField(),
            });
          }
        );
        store.dispatch(initFieldPerformed());
      } else {
        this.setState({
          ...store.getState(),
        });
      }
    });
  }

  componentWillUnmount(): void {
    this.clearTimeout();
    this.unsubscribe();
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
    }, this.state.animationDelay);
  };

  process = (oldField: Array<Array<PoorCellProps>>) => {
    const newField: Array<Array<PoorCellProps>> = [];
    for (let i = 0; i < this.state.fieldHeight; i++) {
      newField[i] = [];
      for (let j = 0; j < this.state.fieldWidth; j++) {
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
            oldFieldCell.step < this.state.animationStepsCount,
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
                size={this.state.cellSize}
                stepsCount={this.state.animationStepsCount}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
