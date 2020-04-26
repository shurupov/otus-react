import React, {CSSProperties} from "react";

interface CellProps {
    coloured: boolean,
    size: number,
    onClick: Function,
    animationDelay: number
}

interface CellState {
    step: number,
    animated: boolean
}

export class Cell extends React.Component<CellProps, CellState>{

    private lastColor: number;
    private readonly topColorValue: number;

    constructor(props: CellProps) {
        super(props);
        this.state = {
            step: 0,
            animated: true
        };
        this.lastColor = !props.coloured ? 0 : 255;
        this.tick.bind(this);

        this.topColorValue = 255;
    }

    getColor(): string {
        if (this.state.animated) {
            if (!this.props.coloured) {
                this.lastColor = 255 * (this.state.step / 4);
            } else {
                this.lastColor = 255 - 255 * (this.state.step / 4)
            }
        }
        return `rgb(${this.lastColor},${this.lastColor},${this.lastColor})`;
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        console.log(this.state);
        const style: CSSProperties = {
            width: this.props.size,
            height: this.props.size,
            backgroundColor: this.getColor(),
            marginRight: 1,
            marginTop: 1,
            float: "left"
        };
        return <div className="cell" onClick={() => this.props.onClick()} style={style}/>
    }

    componentDidUpdate(prevProps: Readonly<CellProps>, prevState: Readonly<CellState>, snapshot?: any): void {
        setTimeout(() => { this.tick(false, prevProps) }, this.props.animationDelay);
    }

    componentDidMount(): void {
        this.tick(true, this.props);
    }

    tick(justMounted: boolean, prevProps: Readonly<CellProps>) {
        if (justMounted || prevProps.coloured != this.props.coloured) {
            this.setState({
                step: 1,
                animated: true
            });
        } else if (this.state.animated) {
            this.setState({
                step: this.state.step >= 5 - 1 ? 0 : this.state.step + 1,
                animated: this.state.step < 5 - 1
            })
        }
    }
}