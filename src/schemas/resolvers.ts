import {
  QueryRecommendedCreditCardsArgs,
  ResommendedCrediCardsQueryResponse,
} from '../shared/types/appia-service-types';

export default {
  Query: {
    async asset(_obj: unknown, args: QueryRecommendedCreditCardsArgs, context: any): Promise<ResommendedCrediCardsQueryResponse> {
      const { id } = args;
      const { logger, assetLoader } = context;
      const response: ResommendedCrediCardsQueryResponse = {
        status: 'success',
        timestamp: new Date().toISOString(),
        errors: [],
      };

      try {
        logger.debug(`Resolving getAsset for id: ${id}`);
        const foundAsset = await assetLoader.load(id);
        response.asset = foundAsset;
        return response;
      } catch (e) {
        logger.error(`Resolver: Exception at asset: `, e);
        response.status = 'error';
        response.errors.push({ message: e });
        return response;
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
