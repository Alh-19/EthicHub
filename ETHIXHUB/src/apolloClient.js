import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

const subgraph1Link = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/ethichub/ethichub',
});

const subgraph2Link = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/ethichub/ethichub-celo',
});

const client = new ApolloClient({
  link: ApolloLink.concat(subgraph1Link, subgraph2Link),
  cache: new InMemoryCache(),
});

export default client;
