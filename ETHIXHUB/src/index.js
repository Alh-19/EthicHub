import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
<<<<<<< HEAD:ETHIXHUB/src/index.js
import { DataContextProvider } from './Data/DataContextProvider';

=======
import { DataContextProvider, DataContext } from './Data/DataContextProvider'; 
>>>>>>> erika:ETHICHUB8/ethichub8/src/index.js
import client from './apolloClient'; // Assuming you have created an Apollo client

const rootElement = document.getElementById('root');

<<<<<<< HEAD:ETHIXHUB/src/index.js
createRoot(rootElement).render(
  <ApolloProvider client={client}>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </ApolloProvider>
=======
createRoot (rootElement).render(
  <ApolloProvider client={client}>
  <DataContextProvider>
  <App />
  </DataContextProvider>
 </ApolloProvider>,
  document.getElementById('root')
>>>>>>> erika:ETHICHUB8/ethichub8/src/index.js
);
