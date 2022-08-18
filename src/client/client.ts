import "reflect-metadata";
import { injectable } from "inversify";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from "@apollo/client";
import LoadingCommand from "common/commands/loading-command";

export interface IClient extends ApolloClient<NormalizedCacheObject> {}

const interceptor = new ApolloLink((operation, forward) => {
  const loadingCommand = new LoadingCommand();

  return forward(operation).map(data => {
    loadingCommand.cancel();
    return data;
  });
});

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || "",
  headers: {
    authorization: process.env.REACT_APP_GRAPHQL_TOKEN || ""
  }
})

@injectable()
class Client {
  constructor() {
    Object.assign(
      this,
      new ApolloClient<NormalizedCacheObject>({
        uri: process.env.REACT_APP_GRAPHQL_URL || "",
        cache: new InMemoryCache(),
        link: from([interceptor, httpLink]),
      })
    );
  }
}

export default Client as unknown as typeof ApolloClient<NormalizedCacheObject>;
