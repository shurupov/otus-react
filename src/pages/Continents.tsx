import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "smart/Continents/apollo";
import { ContinentsList } from "smart/Continents/ContinentsList";
import { Route } from "react-router";
import { CountriesList } from "smart/Continents/CountriesList";

export class Continents extends React.Component {
  render() {
    return (
      <div>
        <h1>Continents</h1>
        <ApolloProvider client={client}>
          <Route exact path="/continents" component={ContinentsList} />
          <Route
            exact
            path="/continents/:continentCode"
            component={CountriesList}
          />
        </ApolloProvider>
      </div>
    );
  }
}
