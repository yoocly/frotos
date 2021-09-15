import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search">
          <NavBar active="search" />
          <main>Search page</main>
        </Route>
        <Route path="/collections">
          <NavBar active="collections" />
          <main>Collections page</main>
        </Route>
        <Route path="/profile">
          <NavBar active="profile" />
          <main>Profile page</main>
        </Route>
        <Route path="/about">
          <NavBar active="about" />
          <main>About page</main>
        </Route>
        <Route path="/">
          <NavBar />
          <main>Splash Home</main>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
