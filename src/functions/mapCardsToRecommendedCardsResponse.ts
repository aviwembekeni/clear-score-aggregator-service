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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  partnerCardResponse.forEach((card: any) => {
    cards.push({
      provider: provider,
      name: provider == PartnerName.CSCards ? card.cardName : card.card,
      apr: card.apr,
      cardScore:
        provider == PartnerName.CSCards
          ? Number((standardizeDifferentScales(card.eligibility, 0.0, 10.0, 100) / card.apr ** 2).toFixed(3))
          : Number((standardizeDifferentScales(card?.approvalRating, 0.0, 1.0, 100) / card.apr ** 2).toFixed(3)),
    });
  });
  return cards;
};
