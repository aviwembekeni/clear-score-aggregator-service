import { ApolloError, ApolloServer } from 'apollo-server-lambda';
import { Handler } from 'aws-lambda';
import 'source-map-support/register';
import { IResolvers } from 'graphql-tools';
import resolvers from './schemas/resolvers';
import typeDefs from './schemas/typeDefs';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers as IResolvers,
  tracing: true,
  formatError: (error): ApolloError => {
    if (error.extensions) delete error.extensions.exception;
    return error as ApolloError;
  },
  // context: async ({ event, context }): Promise<ContextOptions> => ({
  //   event,
  //   context,
  // }),
});

export const graphqlHandler: Handler = (event, context, callback): void => {
  console.debug('Creating Apollo Server...');
  const handler = apolloServer.createHandler({
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });
  console.debug('Created Apollo Server...');

  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context, callback);
};
