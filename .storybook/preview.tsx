import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router';

import '../src/app/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};

const queryClient = new QueryClient();

addDecorator((story) => <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>);
addDecorator((story) => <MemoryRouter>{story()}</MemoryRouter>);
addDecorator((story) => <div style={{ margin: '1rem' }}>{story()}</div>);
