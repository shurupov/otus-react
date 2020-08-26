import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import * as React from "react";

const countries = (continentCode: string) => gql`
  query {
    continent(code: "${continentCode}") {
      code
      name
      countries {
        code
        name
        native
        capital
      }
    }
  }
`;

export function CountriesList(props: any) {
  const { loading, error, data } = useQuery(
    countries(props.match.params.continentCode)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <h2>{data.continent.name}</h2>
      <p>
        <Link to="/continents">Up to continents list</Link>
      </p>
      <table>
        <thead>
          <tr>
            <td>Country Name</td>
            <td>Country Code</td>
            <td>Native Name</td>
            <td>Capital</td>
          </tr>
        </thead>
        <tbody>
          {data.continent.countries.map(
            (c: {
              code: string;
              name: string;
              native: string;
              capital: string;
            }) => (
              <tr key={"country-" + c.code}>
                <td>
                  <Link
                    to={"/continents/" + data.continent.code + "/" + c.code}
                  >
                    {c.name}
                  </Link>
                </td>
                <td>{c.code}</td>
                <td>{c.native}</td>
                <td>{c.capital}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
