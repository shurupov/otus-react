import React from "react";
import {Line} from "./Line/Line";

interface ConwayLifeProps {
    fieldWidth: number;
    fieldHeight: number,
    cellSize: number,
    onClick: Function,
    cellAnimationDelay: number
}

interface ConwayLifeState {
    cells: Array<Array<boolean>>
}

export class ConwayLife extends React.Component<ConwayLifeProps, ConwayLifeState> {

    private intervalId: NodeJS.Timeout | any;

    private readonly fieldWidth: number;
    private readonly fieldHeight: number;
    private readonly cellSize: number;

    constructor(props: ConwayLifeProps) {
        super(props);
        this.fieldWidth = props.fieldWidth;
        this.fieldHeight = props.fieldHeight;
        this.cellSize = props.cellSize;

        let cells: Array<Array<boolean>> = [];
        for (let i = 0; i < this.fieldHeight; i++) {
            cells[i] = [];
            for (let j = 0; j < this.fieldWidth; j++) {
                cells[i][j] = Math.random() > 0.7;
            }
        }
        this.state = {
            cells: cells
        };
        this.process.bind(this);
        this.tick.bind(this);
        this.getNextGeneration.bind(this);
    }

    componentDidMount(): void {
        this.intervalId = setInterval(() => { this.tick(); }, 500);
    }

    componentWillUnmount(): void {
        clearInterval(this.intervalId);
    }

    public tick() {
        this.setState((state) => {
            return {
                cells: this.process(state.cells)
            }
        });
    }

    process(oldField: Array<Array<boolean>>): Array<Array<boolean>> {
        let newField: Array<Array<boolean>> = [];
        for (let i = 0; i < this.fieldHeight; i++) {
            newField[i] = [];
            for (let j = 0; j < this.fieldWidth; j++) {
                newField[i][j] = this.getNextGeneration(oldField, i, j);
            }
        }
        return newField;
    }

    public getNextGeneration(oldField: Array<Array<boolean>>, i: number, j: number): boolean {
        let currentCellLife = oldField[i][j];
        let countOfNearLives = 0;
        for (let i1 = (i === 0 ? i : i - 1); i1 <= ((i === oldField.length - 1) ? i : i + 1); i1++) {
            for (let j1 = (j === 0 ? j : j - 1); j1 <= ((j === oldField[i1].length - 1) ? j : j + 1); j1++) {
                if (i1 === i && j1 === j) {
                    continue;
                }
                if (oldField[i1][j1]) {
                    countOfNearLives++;
                }
            }
        }

        if (currentCellLife) {
            if (countOfNearLives > 1 && countOfNearLives < 4) {
                return true;
            } else {
                return false;
            }
        } else {
            if (countOfNearLives === 3) {
                return true;
            } else {
                return false;
            }
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div className="conway-life">
            {this.state.cells.map((l, i) => <Line
                key={i.toString()}
                cells={l}
                cellSize={this.cellSize}
                onClick={(j: number) => this.props.onClick(j, i)}
                cellAnimationDelay={this.props.cellAnimationDelay}
            />)}
        </div>;
    }
}