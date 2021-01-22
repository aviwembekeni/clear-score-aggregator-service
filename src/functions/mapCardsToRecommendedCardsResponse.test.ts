import CSCardsApiResponse from '../models/CSCardsApiResponse.model';
import RecommendedCreditCardsResponse from '../models/RecommendedCreditCardsResponse.model';
import ScoredCardsApiResponse from '../models/ScoredCardsApiResponse.model';
import { PartnerName } from '../services/CreditCardServices';
import mapCardsToRecommendedCardsResponse from './mapCardsToRecommendedCardsResponse';

describe('Testing map cards to recommended cards response function', (): void => {
  it('map ScoredCards response to RecommendedCreditCardsResponse', (): void => {
    const scoredCardsResponse: ScoredCardsApiResponse[] = [
      {
        approvalRating: 0.8,
        apr: 19.4,
        card: 'ScoredCard Builder',
      },
    ];

    const recommendedCreditCardApiResponse: RecommendedCreditCardsResponse[] = [
      {
        provider: PartnerName.ScoredCards,
        name: 'ScoredCard Builder',
        apr: 19.4,
        cardScore: 0.21256244021681373,
      },
    ];
    expect(mapCardsToRecommendedCardsResponse(scoredCardsResponse, PartnerName.ScoredCards)).toEqual(recommendedCreditCardApiResponse);
  });

  it('map CSCards response to RecommendedCreditCardsResponse', (): void => {
    const csCardsResponse: CSCardsApiResponse[] = [
      {
        apr: 21.4,
        cardName: 'SuperSaver Card',
        eligibility: 6.3,
      },
      {
        apr: 19.2,
        cardName: 'SuperSpender Card',
        eligibility: 5,
      },
    ];

    const recommendedCreditCardApiResponse: RecommendedCreditCardsResponse[] = [
      {
        provider: 'CSCards',
        name: 'SuperSaver Card',
        apr: 21.4,
        cardScore: 0.13756659970303085,
      },
      {
        provider: 'CSCards',
        name: 'SuperSpender Card',
        apr: 19.2,
        cardScore: 0.13563368055555556,
      },
    ];
    expect(mapCardsToRecommendedCardsResponse(csCardsResponse, PartnerName.CSCards)).toEqual(recommendedCreditCardApiResponse);
  });
});
