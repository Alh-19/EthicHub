
import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY1 } from './Queries';


export const DataContext = createContext();

export function DataContextProvider({ children, clients }) {
  const { loading: loading1, error: error1, data: data1 } = useQuery(QUERY1, {
    client: clients.client, // Utiliza el cliente client1 para esta consulta
  });

  const { loading: loading2, error: error2, data: data2 } = useQuery(QUERY1, {
    client: clients.client2, // Utiliza el cliente client2 para esta consulta
  });

  // Resto de las consultas con los clientes correspondientes

  const loading = loading1 || loading2;
  const error = error1 || error2;
  const data = {
    query1Data: data1,
    query2Data: data2,
  };

  return (
    <DataContext.Provider value={{ loading, error, data }}>
      {children}
    </DataContext.Provider>
  );
}