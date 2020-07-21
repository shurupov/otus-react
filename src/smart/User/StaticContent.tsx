import React from "react";
import Link from "next/link";

export interface StaticContentProps {
  page: React.Component;
  props?: unknown;
}

export class StaticContent extends React.Component<StaticContentProps> {
  render() {
    const PageComponent: React.Component = this.props.page;

    return (
      <div
        css={{
          marginTop: 5,
          borderTop: "4px gray solid",
        }}
      >
        <Link href={"/"} replace={true}>
          <a>Top</a>
        </Link>
        <br />
        <Link href={"/news"}>
          <a>News</a>
        </Link>
        <br />
        <Link href={"/news/1"}>
          <a>Text 1</a>
        </Link>
        <br />
        <Link href={"/news/2"}>
          <a>Text 2</a>
        </Link>
        <br />

        <PageComponent {...this.props.props} />
      </div>
    );
  }
}
