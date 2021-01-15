import { GraphQLRequestContext, GraphQLRequestListener } from 'apollo-server-plugin-base';

const slowQueryThreshold = Number(process.env.SLOW_QUERY_THRESHOLD);

const SlowQueryLoggerPlugin = {
  requestDidStart(requestContext: GraphQLRequestContext): GraphQLRequestListener | void {
    // Force-Casting to InvesContext, since we know this will always be of type InvesContext
    const query = requestContext.request.query;
    const start = new Date().getTime();

    console.log('GraphQL Request: START', { query });

    return {
      willSendResponse(): void {
        const elapsed = new Date().getTime() - start;
        if (slowQueryThreshold == 0) {
          console.warn('Config error: No slowQueryThreshold specified');
        } else if (elapsed > slowQueryThreshold) {
          console.warn(`GraphQL Request: SLOW ${elapsed}ms`, { query, elapsed });
        }
        console.log('GraphQL Request: END', { query });
      },
    };
  },
};

export default SlowQueryLoggerPlugin;
