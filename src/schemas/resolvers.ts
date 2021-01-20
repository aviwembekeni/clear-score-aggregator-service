import RecommendedCreditCardsInput from '../models/RecommendedCreditCardsInput.model';
import RecommendedCreditCardsResponse from '../models/RecommendedCreditCardsResponse.model';
import CreditCardServices from '../services/CreditCardServices';

const resolvers = {
  Query: {
    helloWorld(): string {
      return 'Hello World ';
    },
    async recommendedCreditCards(_obj: unknown, args: RecommendedCreditCardsInput): Promise<RecommendedCreditCardsResponse> {
      const creditCardService = new CreditCardServices();
      try {
        console.debug(`Resolving queryCreditCardRecommended for user: ${args.name}`);
        console.log(args);
        const recommendedCreditCards = await creditCardService.getRecommendedCreditCards(args);
        return recommendedCreditCards;
      } catch (e) {
        throw new Error(`An error occured while querying recommnded credit cards. ${e}`);
      }
    },
  },
};
export default resolvers;
