import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { DataContextProvider, DataContext } from './Data/DataContextProvider'; 

import client from './apolloClient'; // Assuming you have created an Apollo client

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
    <DataContextProvider>
      <App />
    </DataContextProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

