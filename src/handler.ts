import 'source-map-support/register';
import { ApolloServer, ApolloError } from 'apollo-server-lambda';
import { Handler, APIGatewayEvent, Context } from 'aws-lambda';
// import { addSchemaLevelResolveFunction } from 'apollo-server';
import schema from './schemas/Schema';

// https://github.com/apollographql/apollo-server/issues/2156
function runApollo(event: APIGatewayEvent, lambdaContext: Context, handler: Handler): Promise<Handler> {
  return new Promise((resolve, reject) => {
    // silly callback trick needs type any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callback = (error: any, body: any): void => (error ? reject(error) : resolve(body));
    handler(event, lambdaContext, callback);
  });
}

export const graphqlHandler: Handler = async (event: APIGatewayEvent, lambdaContext: Context): Promise<Handler> => {
  // addSchemaLevelResolveFunction(schema, minimumVersionResolver);
  console.debug(`graphqlHandler: creating apolloServer with executableSchema & invesContext`);
  const apolloServer = new ApolloServer({
    schema,
    tracing: true,
    formatError: (error): ApolloError => {
      if (error.extensions) delete error.extensions.exception;
      return error as ApolloError;
    },
  });

  console.info('graphqlHandler: Creating handler');

  const handler = apolloServer.createHandler({
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  lambdaContext.callbackWaitsForEmptyEventLoop = false;

  console.info('graphqlHandler: end: returning handler');

  return await runApollo(event, lambdaContext, handler);
};
