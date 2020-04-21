import React, {CSSProperties} from "react";

interface CellProps {
    coloured: boolean,
    size: number
}

export class Cell extends React.Component<CellProps, any>{

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const style: CSSProperties = {
            width: this.props.size,
            height: this.props.size,
            backgroundColor: this.props.coloured ? "#000000" : "#ffffff",
            marginRight: 1,
            marginTop: 1,
            float: "left"
        };
        return <div style={style}/>
    }
}