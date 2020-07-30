/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Cell, PoorCellProps } from "./Cell/Cell";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "store/reducer";
import { updateAction } from "smart/ConwayLife/saga";
import { ConwaySettings } from "smart/ConwayLife/slice";

interface ConwayLifeProps {
  conwayField: Array<Array<PoorCellProps>>;
  conwaySettings: ConwaySettings;
  update: Function;
}

export class ConwayLife extends React.Component<ConwayLifeProps> {
  private timeoutId!: number;

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

const mapStateToProps = ({ conwaySettings, conwayField }: StoreState) => ({
  conwaySettings,
  conwayField,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    update: () => {
      dispatch(updateAction());
    },
  };
};

export const ConnectedConwayLife = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConwayLife);
