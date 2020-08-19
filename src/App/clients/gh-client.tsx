import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

import { GH_GRAPHQL_ENDPOINT, GH_TOKEN } from '../config';

export const ghClient = new ApolloClient({
  link: createHttpLink({
    uri: GH_GRAPHQL_ENDPOINT,
    headers: {
      authorization: `Bearer ${GH_TOKEN}`,
    },
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: relayStylePagination(['query']),
        },
      },
    },
  }),
});
