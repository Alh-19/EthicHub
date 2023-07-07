import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { useState, useEffect } from 'react';

const subgraph1Link = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/ethichub/ethichub',
});

const subgraph2Link = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/ethichub/ethichub-celo',
});

const client = new ApolloClient({
  link: ApolloLink.concat(subgraph1Link),
  cache: new InMemoryCache(),
});

const client2 = new ApolloClient({
  link: ApolloLink.concat(subgraph2Link),
  cache: new InMemoryCache(),
});

export {client, client2,  subgraph1Link, subgraph2Link};