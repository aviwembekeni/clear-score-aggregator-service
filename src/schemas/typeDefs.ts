import { DocumentNode } from 'graphql';

import { gql } from 'apollo-server-lambda';

const typeDefs: DocumentNode = gql`
  input recommendedCreditCardsInput {
    name: String!
    creditScore: Int!
    salary: Int!
  }

  type ResommendedCrediCardsQueryResponse {
    provider: String!
    name: String!
    apr: Float!
    cardScore: Float!
  }

  type Query {
    helloWorld: String!
    """
    ### Query recommended credit cards for  a user
    ~~~gql
    {
      recommendedCreditCards(
        input: { name: "John Smith", creditScore: 500, salary: 20000 }
      ) {
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
    recommendedCreditCards(input: recommendedCreditCardsInput): ResommendedCrediCardsQueryResponse
  }
`;

export default typeDefs;
