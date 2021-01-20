import axios from 'axios';

import
 RecommendedCreditCardsInput from '../models/RecommendedCreditCardsInput.model';
import RecommendedCreditCardsResponse from '../models/RecommendedCreditCardsResponse.model';
import CSCardsApiResponse from '../models/CSCardsApiResponse.model';
import ScoredCardsApiResponse from '../models/ScoredCardsApiResponse.model';

class CreditCardServices {
  public constructor() {}

  public async getRecommendedCreditCards(args: RecommendedCreditCardsInput): Promise<RecommendedCreditCardsResponse> {
    const { name, creditScore, salary } = args.input;
    try {
      console.debug(`RecommendedCreditCards-->Get: user: ${name}`);
      const results = await Promise.all([this.getCSCards(name, creditScore), this.getScoredCards(name, creditScore, salary)]);
      const csCardsResponse = results[0];
      const scoredCardsResponse = results[1];
      console.log(csCardsResponse);
      console.log('----------------------------');
      console.log(scoredCardsResponse);
      return;
    } catch (e) {
      throw new Error('Could not get recommended credit cards');
    }
  }

  private async getCSCards(name: string, creditScore: number): Promise<CSCardsApiResponse[]> {
    try {
      const csCardsResponse: CSCardsApiResponse[] = await axios.post(
        'https://app.clearscore.com/api/global/backend-tech-test/v1/cards/',
        {
          name,
          creditScore
        }
      );
      return csCardsResponse;
    } catch (e) {
      throw new Error(`Could not get cards from CSCards: ${e}`);
    }
  }

  private async getScoredCards(name: string, score: number, salary: number): Promise<ScoredCardsApiResponse[]> {
    try {
      const scoredCardsResponse: ScoredCardsApiResponse[] = await axios.post(
        'https://app.clearscore.com/api/global/backend-tech-test/v2/creditcards',
        {
          name,
          score,
          salary
        }
      );
      return scoredCardsResponse;
    } catch (e) {
      throw new Error(`Could not get cards from CSCards: ${e}`);
    }
  }
}

export default CreditCardServices;
