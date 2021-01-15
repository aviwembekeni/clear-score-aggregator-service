import { DocumentNode } from 'graphql';

import { merge } from 'lodash';

import { gql, makeExecutableSchema } from 'apollo-server';

import legacyResolvers from './resolvers';
import typeDefs from './typeDefs';

const Query: DocumentNode = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;
const resolvers = {};
const schema = makeExecutableSchema({
  typeDefs: [Query,  typeDefs],
  resolvers: merge(
    resolvers,
    legacyResolvers,
  ),
});

export default schema;
