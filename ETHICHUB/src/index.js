
// import React, { useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { ApolloProvider } from '@apollo/client';
// import App from './App';
// import { DataContextProvider } from './Data/DataContextProvider';

// import { client, client2 } from './apolloClient'; // Assuming you have created two Apollo clients

// const rootElement = document.getElementById('root');

// const Root = () => {
//   const [useClient, setUseClient] = useState(client);

//   const handleToggleClient = () => {
//     setUseClient((prevClient) => (prevClient === client ? client2 : client));
//   };

//   return (
//     <ApolloProvider client={useClient}>
//       <DataContextProvider>
//         <App />
//         <button onClick={handleToggleClient}>Toggle Client</button>
//       </DataContextProvider>
//     </ApolloProvider>
//   );
// };

// createRoot(rootElement).render(<Root />);


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