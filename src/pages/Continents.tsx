import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "smart/Continents/apollo";
import { ContinentsList } from "smart/Continents/ContinentsList";
import { Route } from "react-router";
import { CountriesList } from "smart/Continents/CountriesList";
import { Country } from "smart/Continents/Country";

export class Continents extends React.Component {
  render() {
    return (
      <div>
        <h1>Continents and Countries</h1>
        <ApolloProvider client={client}>
          <Route exact path="/continents" component={ContinentsList} />
          <Route
            exact
            path="/continents/:continentCode"
            component={CountriesList}
          />
          <Route
            exact
            path="/continents/:continentCode/:countryCode"
            component={Country}
          />
        </ApolloProvider>
      </div>
    );
  }
}
