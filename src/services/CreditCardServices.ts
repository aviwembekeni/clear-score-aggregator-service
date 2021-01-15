import axios from 'axios';

import RecommendedCreditCardsInput from '../models/RecommendedCreditCardsInput.model';
import RecommendedCreditCardsResponse from '../models/RecommendedCreditCardsResponse.model';

class CreditCardServices {
  public constructor() {}

  public async getRecommendedCreditCards(args: RecommendedCreditCardsInput): Promise<RecommendedCreditCardsResponse> {
    const { name, creditScore, salary } =  args;
    try {
      console.debug(`RecommendedCreditCards-->Get: user: ${name}`);
      const recommendedCreditCards: RecommendedCreditCardsResponse = await axios.get('');
      return recommendedCreditCards;
    } catch (e) {
      throw new Error('Could not get recommended credit cards');
    }
  }
}

export default CreditCardServices;
