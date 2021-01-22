import RecommendedCreditCardsResponse from '../models/RecommendedCreditCardsResponse.model';
import sortCardDesc from './sortCardsDesc';

describe('Testing sort cards in descending order function', (): void => {
  const cards: RecommendedCreditCardsResponse[] = [
    {
      provider: 'CSCards',
      name: 'SuperSaver Card',
      apr: 21.4,
      cardScore: 0.138,
    },
    {
      provider: 'CSCards',
      name: 'SuperSpender Card',
      apr: 19.2,
      cardScore: 0.136,
    },
    {
      provider: 'ScoredCards',
      name: 'ScoredCard Builder',
      apr: 19.4,
      cardScore: 0.213,
    },
  ];

  const sortedCards: RecommendedCreditCardsResponse[] = [
    {
      provider: 'ScoredCards',
      name: 'ScoredCard Builder',
      apr: 19.4,
      cardScore: 0.213,
    },
    {
      provider: 'CSCards',
      name: 'SuperSaver Card',
      apr: 21.4,
      cardScore: 0.138,
    },
    {
      provider: 'CSCards',
      name: 'SuperSpender Card',
      apr: 19.2,
      cardScore: 0.136,
    },
  ];

  it('should bring cards in descending order, sorted by card score', (): void => {
    expect(sortCardDesc(cards)).toEqual(sortedCards);
  });
});
