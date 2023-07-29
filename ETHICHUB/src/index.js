import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { client, client2, } from './apolloClient.js';
import { DataContextProvider } from './Data/DataContextProvider.js';
import App from './App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloProvider client={client2}>
      <DataContextProvider clients={{ client, client2 }}>
        <App />
      </DataContextProvider>
    </ApolloProvider>
  </ApolloProvider>,
  document.getElementById('root')
);