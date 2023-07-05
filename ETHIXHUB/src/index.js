import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { DataContextProvider } from './Data/DataContextProvider';

import { client, client2 } from './apolloClient'; // Assuming you have imported both clients here

const rootElement = document.getElementById('root');

const Root = ({ apolloClient }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </ApolloProvider>
  );
};

createRoot(rootElement).render(
  <React.Fragment>
    <Root apolloClient={client} />
    <Root apolloClient={client2} />
  </React.Fragment>
);