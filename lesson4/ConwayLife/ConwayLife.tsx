import React from "react";
import {Line} from "./Line/Line";

interface ConwayLifeProps {
    fieldWidth: number;
    fieldHeight: number,
    cellSize: number
}

interface ConwayLifeState {
    cells: Array<Array<boolean>>
}

export class ConwayLife extends React.Component<ConwayLifeProps, ConwayLifeState> {

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
                cells[i][j] = Math.random() > 0.5;
            }
        }
        this.state = {
            cells: cells
        };
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <>
            {this.state.cells.map(l => <Line cells={l} cellSize={this.cellSize} />)}
        </>;
    }
}