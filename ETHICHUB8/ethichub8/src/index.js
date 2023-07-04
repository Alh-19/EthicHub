import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { DataContextProvider, DataContext } from './Data/DataContextProvider'; 
import client from './apolloClient'; // Assuming you have created an Apollo client

const rootElement = document.getElementById('root');

createRoot (rootElement).render(
  <ApolloProvider client={client}>
  <DataContextProvider>
  <App />
  </DataContextProvider>
 </ApolloProvider>,
  document.getElementById('root')
);

