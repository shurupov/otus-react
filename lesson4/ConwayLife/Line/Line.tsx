import React from "react";
import {Cell} from "./Cell/Cell";

interface LineProps {
    cells: Array<boolean>,
    cellSize: number
}

export class Line extends React.Component<LineProps, any> {

    private readonly cells: Array<boolean>;
    private readonly cellSize: number;

    constructor(props: LineProps) {
        super(props);
        this.cells = props.cells;
        this.cellSize = props.cellSize;
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div style={{
            clear: "both"
        }}>
            { this.cells.map(c => <Cell coloured={c} size={this.cellSize}/>) }
        </div>;
    }
}