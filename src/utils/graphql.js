import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";

const API_URL = import.meta.env.VITE_API_URL;

export default new ApolloClient({
  link: new HttpLink({uri: API_URL + "/graphql"}),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
