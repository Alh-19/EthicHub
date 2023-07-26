import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY1, QUERY2, QUERY4} from './Queries';


export const DataContext = createContext();

export function DataContextProvider({ children, clients }) {
  const { loading: loading1, error: error1, data: data1 } = useQuery(QUERY1, {
    client: clients.client, // Utiliza el cliente client1 para esta consulta
  });

  const { loading: loading2, error: error2, data: data2 } = useQuery(QUERY1, {
    client: clients.client2, // Utiliza el cliente client2 para esta consulta
  });

  const { loading: loading3, error: error3, data: data3 } = useQuery(QUERY2, {
    client: clients.client, // Utiliza el cliente client1 para esta consulta
  });

  const { loading: loading4, error: error4, data: data4 } = useQuery(QUERY2, {
    client: clients.client2, // Utiliza el cliente client2 para esta consulta
  });

  const { loading: loading5, error: error5, data: data5 } = useQuery(QUERY4, {
    client: clients.client, // Utiliza el cliente client1 para esta consulta
  });

  const { loading: loading6, error: error6, data: data6 } = useQuery(QUERY4, {
    client: clients.client2, // Utiliza el cliente client2 para esta consulta
  });

  const loading = loading1 || loading2 || loading3 || loading4 || loading5 || loading6;
  const error = error1 || error2 || error3 || error4 || error5 || error6;
  const data = {
    query1Data: data1,
    query2Data: data2,
    query3Data: data3,
    query4Data: data4,
    query5Data: data5,
    query6Data: data6,
  };

  return (
    <DataContext.Provider value={{ loading, error, data }}>
      {children}
    </DataContext.Provider>
  );
}