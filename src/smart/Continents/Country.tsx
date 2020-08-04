import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import * as React from "react";

const country = (continentCode: string, countryCode: string) => gql`
  query {
    continent(code: "${continentCode}") {
      code
      name
    }
    country(code: "${countryCode}") {
      code
      name
      native
      capital
      languages {
        code
        name
        native
      }
      states {
        code
        name
      }
    }
  }
`;

export function Country(props: any) {
  const { loading, error, data } = useQuery(
    country(props.match.params.continentCode, props.match.params.countryCode)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <h2>{data.country.name}</h2>
      <p>
        <Link to="/continents">Up to continents list</Link>
      </p>
      <p>
        <Link to={"/continents/" + props.match.params.continentCode}>
          Up to continent data countries list
        </Link>
      </p>
      <table>
        <tbody>
          <tr>
            <td>Continent Name</td>
            <td>{data.continent.name}</td>
          </tr>
          <tr>
            <td>Continent Code</td>
            <td>{data.continent.code}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table>
        <tbody>
          <tr>
            <td>Country Name</td>
            <td>{data.country.name}</td>
          </tr>
          <tr>
            <td>Country Code</td>
            <td>{data.country.code}</td>
          </tr>
          <tr>
            <td>Native Name</td>
            <td>{data.country.native}</td>
          </tr>
          <tr>
            <td>Capital</td>
            <td>{data.country.capital}</td>
          </tr>
        </tbody>
      </table>
      {data.country.languages.length === 0 ? null : (
        <div>
          <h3>Language{data.country.languages.length > 1 ? "s" : ""}</h3>
          <table>
            <thead>
              <tr>
                <td>Language Name</td>
                <td>Language Code</td>
                <td>Language Native Name</td>
              </tr>
            </thead>
            <tbody>
              {data.country.languages.map(
                (c: { code: string; name: string; native: string }) => (
                  <tr key={"language-" + c.code}>
                    <td>{c.name}</td>
                    <td>{c.code}</td>
                    <td>{c.native}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {data.country.states.length === 0 ? null : (
        <div>
          <h3>State{data.country.states.length > 1 ? "s" : ""}</h3>
          <table>
            <thead>
              <tr>
                <td>State Name</td>
                <td>State Code</td>
              </tr>
            </thead>
            <tbody>
              {data.country.states.map((c: { code: string; name: string }) => (
                <tr key={"state-" + c.code}>
                  <td>{c.name}</td>
                  <td>{c.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
