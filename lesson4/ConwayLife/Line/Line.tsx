import React from "react";
import {Cell} from "./Cell/Cell";

interface LineProps {
    cells: Array<boolean>,
    cellSize: number,
    onClick: Function
}

export class Line extends React.Component<LineProps, any> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div style={{
            clear: "both"
        }}>
            { this.props.cells.map((c, j) => <Cell coloured={c} size={this.props.cellSize} onClick={() => this.props.onClick(j)}/>) }
        </div>;
    }
}