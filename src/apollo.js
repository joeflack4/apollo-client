// noinspection NpmUsedModulesInstalled
import { ApolloClient} from 'apollo-client';
// noinspection NpmUsedModulesInstalled
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
// noinspection NpmUsedModulesInstalled
import { HttpLink } from 'apollo-link-http';
// noinspection NpmUsedModulesInstalled
import { ApolloLink } from 'apollo-link';
import resolvers from './resolvers';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql'
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults: {
    show_type: 'BELOW_15'
  }
});

const link = ApolloLink.from([stateLink, httpLink]);

const client = new ApolloClient({
  link,
  cache
});

export default client;
