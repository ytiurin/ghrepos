import React from 'react';
import ErrorBoundary from './ErrorBoundary';

import { ApolloProvider } from '@apollo/client';
import { ghClient } from './clients';

import { GHRepos } from '../GHRepos';

const App = () => (
  <ErrorBoundary>
    <ApolloProvider client={ghClient}>
      <GHRepos />
    </ApolloProvider>
  </ErrorBoundary>
);

export default App;
