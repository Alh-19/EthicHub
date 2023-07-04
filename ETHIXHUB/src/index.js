import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { DataContextProvider } from './Data/DataContextProvider';

import client from './apolloClient'; // Assuming you have created an Apollo client

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <ApolloProvider client={client}>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </ApolloProvider>
);
