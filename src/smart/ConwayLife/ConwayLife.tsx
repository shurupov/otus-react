/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Cell, PoorCellProps } from "./Cell/Cell";
import { ConwaySettings } from "store/store";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "store/reducer";
import { update } from "smart/ConwayLife/saga";

interface ConwayLifeProps {
  conwayField: Array<Array<PoorCellProps>>;
  conwaySettings: ConwaySettings;
  update: Function;
}

export class ConwayLife extends React.Component<ConwayLifeProps> {
  private timeoutId!: NodeJS.Timeout;

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
    this.props.update();
    this.clearTimeout();
    this.timeoutId = setTimeout(() => {
      this.tick();
    }, this.props.conwaySettings.animationDelay);
  };

  render() {
    return (
      <div
        className="conway-life"
        css={{
          clear: "both",
        }}
      >
        {this.props.conwayField.map((l: Array<PoorCellProps>, i) => (
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
                size={this.props.conwaySettings.cellSize}
                stepsCount={this.props.conwaySettings.animationStepsCount}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    conwaySettings: state.conwaySettings,
    conwayField: state.conwayField,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    update: () => {
      dispatch(update());
    },
  };
};

export const ConnectedConwayLife = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConwayLife);
