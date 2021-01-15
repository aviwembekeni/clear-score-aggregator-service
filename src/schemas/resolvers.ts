import RecommendedCreditCardsInput from '../models/RecommendedCreditCardsInput.model';
import RecommendedCreditCardsResponse from '../models/RecommendedCreditCardsResponse.model';
import CreditCardServices from '../services/CreditCardServices';

export default {
  Query: {
    async queryCreditCardRecommended(
      _obj: unknown,
      args: RecommendedCreditCardsInput,
      _context: any,
    ): Promise<RecommendedCreditCardsResponse> {
      const creditCardService = new CreditCardServices();
      try {
        console.debug(`Resolving queryCreditCardRecommended for user: ${args.name}`);
        const recommendedCreditCards = await creditCardService.getRecommendedCreditCards(args);
        return recommendedCreditCards;
      } catch (e) {
        throw new Error(`An error occured while querying recommnded credit cards. ${e}`)
      }
    },
  },

  AppiaBaseResponse: {
    __resolveType(): null {
      return null;
    },
  },
  Prices: {
    __resolveType(): null {
      return null;
    },
  },
};
