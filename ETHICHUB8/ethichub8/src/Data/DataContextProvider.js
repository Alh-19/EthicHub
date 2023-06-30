import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY1, QUERY2 } from './Queries';

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const { loading: loading1, error: error1, data: data1 } = useQuery(QUERY1);
  const { loading: loading2, error: error2, data: data2 } = useQuery(QUERY2);

  const loading = loading1 || loading2;
  const error = error1 || error2;
  const data = {
    query1Data: data1,
    query2Data: data2,
  };
  console.log(data1, data2)

  return (
    <DataContext.Provider value={{ loading, error, data }}>
      {children}
    </DataContext.Provider>
  );
}
