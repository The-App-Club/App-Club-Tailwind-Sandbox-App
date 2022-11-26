import {atom} from 'recoil';
import {createClient, dedupExchange, cacheExchange, Client} from 'urql';
import {multipartFetchExchange} from '@urql/exchange-multipart-fetch';

type GraphQLClient = {
  client: Client;
};

const graphQLClientState = atom<GraphQLClient>({
  key: 'graphQLClient',
  default: {
    client: createClient({
      url: 'http://localhost:3000/api/graphql',
      exchanges: [dedupExchange, cacheExchange, multipartFetchExchange],
    }),
  },
});

export {graphQLClientState};
