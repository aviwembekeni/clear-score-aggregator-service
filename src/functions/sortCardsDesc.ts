import RecommendedCreditCardsResponse from '../models/RecommendedCreditCardsResponse.model';

export default (cards: RecommendedCreditCardsResponse[]): RecommendedCreditCardsResponse[] => {
  return cards.sort((a, b) => a.cardScore - b.cardScore);
};
