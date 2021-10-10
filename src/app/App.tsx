import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import type { filtersAspectRatio } from '../lib/types/image';
import NavBar from './components/NavBar/NavBar';
import About from './pages/About/About';
import Collections from './pages/Collections/Collections';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Splash from './pages/Splash/Splash';

export type lastSearch = {
  keywords: string;
  filterAspectRatio: filtersAspectRatio;
  filterColor: number;
};

export default function App(): JSX.Element {
  const queryClient = new QueryClient();
  const [lastSearch, setSearchPage] = useState<lastSearch>({
    keywords: '',
    filterAspectRatio: 'nofilter',
    filterColor: 0,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route path="/search/:query?">
            <NavBar active="search" />
            <Search lastSearchState={[lastSearch, setSearchPage]} />
          </Route>
          <Route path="/collections">
            <NavBar active="collections" />
            <Collections />
          </Route>
          <Route path="/profile">
            <NavBar active="profile" />
            <Profile />
          </Route>
          <Route path="/about">
            <NavBar active="about" />
            <About />
          </Route>
          <Route path="/">
            <NavBar />
            <Splash />
          </Route>
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
