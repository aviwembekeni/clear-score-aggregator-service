import { DocumentNode } from 'graphql';

import { gql } from 'apollo-server-lambda';

const typeDefs: DocumentNode = gql`
  directive @isAuthUser on FIELD_DEFINITION | OBJECT

input recommendedCreditCardsInput {
    name: String!
    creditScore: Number!
    salary: Number!
  }

  type ResommendedCrediCardsQueryResponse {
    provider: String!
    name: String!
    apr: Number!
    cardScore: Number!
  }

  extend type Query {
    """
    ### Query recommended credit cards for  a user
    ~~~gql
    {
      recommendedCreditCards(name: "John Smith", creditScore: 500, salary: 20000) {
        ...recommendedCrediCardsResponse
      }
    }

    fragment recommendedCrediCardsResponse on ResommendedCrediCardsQueryResponse {
      provider
      name
      apr
      cardScore
    }
    ~~~
    """
    recommendedCreditCards(input: recommndedCreditCardsInput): ResommendedCrediCardsQueryResponse
    """
  }
`;

export default typeDefs;
