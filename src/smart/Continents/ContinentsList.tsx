import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { Link } from "react-router-dom";

const CONTINENTS = gql`
  query {
    continents {
      code
      name
    }
  }
`;

export function ContinentsList() {
  const { loading, error, data } = useQuery(CONTINENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return data.continents.map((c: { code: string; name: string }) => (
    <p key={"continent-" + c.code}>
      <Link to={"/continents/" + c.code}>{c.name}</Link>
    </p>
  ));
}
