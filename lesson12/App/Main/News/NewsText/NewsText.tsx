import React from "react";

export class NewsText extends React.Component<{ match: any }> {
  constructor(props: { match: any }) {
    super(props);
  }

  render() {
    return "Text " + this.props.match.params.newsid;
  }
}
