import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      Navigation
      <Switch>
        <Route path="/sample">
          <main>sample page</main>
        </Route>
        <Route path="/">
          <main>Home</main>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
