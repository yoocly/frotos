import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import NavBar from './components/NavBar/NavBar';
import Search from './pages/Search/Search';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search">
          <NavBar active="search" />
          <Search />
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
          <BackgroundImage>
            <NavBar />
            <main>Splash Home</main>
          </BackgroundImage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
