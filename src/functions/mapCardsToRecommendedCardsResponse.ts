import RecommendedCreditCardsResponse from '../models/RecommendedCreditCardsResponse.model';
import CSCardsApiResponse from '../models/CSCardsApiResponse.model';
import ScoredCardsApiResponse from '../models/ScoredCardsApiResponse.model';
import { PartnerName } from '../services/CreditCardServices';
import standardizeDifferentScales from './standardizeDifferentScales';

export default (
  partnerCardResponse: CSCardsApiResponse[] | ScoredCardsApiResponse[],
  provider: string,
): RecommendedCreditCardsResponse[] => {
  const cards: RecommendedCreditCardsResponse[] = [];
  partnerCardResponse.forEach(card => {
    cards.push({
      provider: provider,
      name: provider == PartnerName.CSCards ? PartnerName.CSCards : PartnerName.ScoredCards,
      apr: card.apr,
      cardScore:
        provider == PartnerName.CSCards
          ? card.eligibility / card.apr ** 2
          : standardizeDifferentScales(card.approvalRating, 0.0, 1.0, 10.0) / card.apr ** 2,
    });
  });
  return cards;
};
