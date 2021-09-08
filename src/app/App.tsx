import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search">
          <main>Search page</main>
        </Route>
        <Route path="/collections">
          <main>Collections page</main>
        </Route>
        <Route path="/profile">
          <main>Profile page</main>
        </Route>
        <Route path="/about">
          <main>About page</main>
        </Route>
        <Route path="/">
          <main>Splash Home</main>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
