import { gql } from '@apollo/client';

export const QUERY1 = gql`
  query EthixHolders {
    ethixHolders(first: 10, orderBy: id, orderDirection: asc) {
      totalAmount
      id
    }
  }
`;

export const QUERY2 = gql`
  query AnotherQuery {
    ethixHolders(first: 10, orderBy: id, orderDirection: asc) {
      totalAmount
      id
    }
  }
`;
