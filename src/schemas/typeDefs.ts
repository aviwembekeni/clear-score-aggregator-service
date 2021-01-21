import { DocumentNode } from 'graphql';

import { gql } from 'apollo-server-lambda';

const typeDefs: DocumentNode = gql`
  input recommendedCreditCardsInput {
    name: String!
    creditScore: Int!
    salary: Int!
  }

  type RecommendedCrediCardsQueryResponse {
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

    fragment recommendedCrediCardsResponse on RecommendedCrediCardsQueryResponse {
      provider
      name
      apr
      cardScore
    }
    ~~~
    """
    recommendedCreditCards(input: recommendedCreditCardsInput): [RecommendedCrediCardsQueryResponse]
  }
`;

export default typeDefs;
