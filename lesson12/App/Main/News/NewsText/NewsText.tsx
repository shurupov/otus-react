import React from "react";

export class NewsText extends React.Component<{ match: any }> {
  render() {
    return "Text " + this.props.match.params.newsid;
  }
}
