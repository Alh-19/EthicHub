// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { ApolloProvider } from '@apollo/client';
// import App from './App';
// import { DataContextProvider } from './Data/DataContextProvider';

// import {client, client2 } from './apolloClient'; // Assuming you have created an Apollo client

// const rootElement = document.getElementById('root');

// createRoot(rootElement).render(
//   <ApolloProvider client={client , client2}>
//     <DataContextProvider>
//       <App />
//     </DataContextProvider>
//   </ApolloProvider>
// );


import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { DataContextProvider } from './Data/DataContextProvider';

import { client, client2 } from './apolloClient'; // Assuming you have created two Apollo clients

const rootElement = document.getElementById('root');

const Root = () => {
  const [useClient, setUseClient] = useState(client);

  const handleToggleClient = () => {
    setUseClient((prevClient) => (prevClient === client ? client2 : client));
  };

  return (
    <ApolloProvider client={useClient}>
      <DataContextProvider>
        <App />
        <button onClick={handleToggleClient}>Toggle Client</button>
      </DataContextProvider>
    </ApolloProvider>
  );
};

createRoot(rootElement).render(<Root />);
